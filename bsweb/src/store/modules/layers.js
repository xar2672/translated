import axios from 'axios';
import * as options from '../helpers/option_helpers';
import * as style from '../helpers/style_layers';

const api_url = process.env.VUE_APP_API_URL;

const ORIGINAL_STATE = () => {
  return {
    features: [], // used by <l-geo-json>
    main: {
      grid: {},
      bikelaneRange: [0, 1], // min and max years selected for bikelanes
    },
    second: {
      grid: {},
      bikelaneRange: [0, 1], // min and max years selected for bikelanes
    },
    activeLayers: {
      cptm_lines: { main: false, second: false },
      cptm_stations: { main: false, second: false },
      sp_accidents: { main: false, second: false },
      subway_lines: { main: false, second: false },
      subway_stations: { main: false, second: false },
      sp_bikelane_ciclovia: { main: false, second: false },
      sp_bikelane_ciclofaixa: { main: false, second: false },
      sp_bikelane_ciclorrota: { main: false, second: false },
    },
    data: [],
    bikelanes: [],
    zones: {},
    mirrorControl: false,
    hideSecondMapControl: false,
    bikelaneYears: [], // list of all years available for bikelanes
  };
};
const state = ORIGINAL_STATE();

const getters = {
  layers: (state) => state.data,
  bikelaneLayers: (state) => state.bikelanes,
  activeLayers: (state) => state.activeLayers,
  activeLayersCount: (state) => {
    let count = 0;
    for (let key in state.activeLayers) {
      count += state.activeLayers[key].main ? 1 : 0;
      count += state.activeLayers[key].second ? 1 : 0;
    }
    return count;
  },
  mirrorLayerControl: (state) => state.mirrorControl,
  hideSecondMapLayerControl: (state) => state.hideSecondMapControl,
  bikelaneYears: (state) => state.bikelaneYears,
};

const actions = {
  addLayer: ({ commit }, resource) => {
    commit('addLayer', resource);
  },
  addBikelaneLayer: ({ commit }, data) => {
    commit('addBikelaneLayer', data);
  },
  setActiveLayer: ({ commit, getters }, data) => {
    commit('setActiveLayer', { ...data, bothMaps: getters.mirrorLayerControl.value });
  },
  fetchCPTM_lines: async ({ commit }) => { 
    return await axios.get(`${api_url}/load_railway_lines_data`)
      .then(response => {
        const resource = {
          geometry: JSON.parse(response.data),
          style: style.railway,
          options: options.railway_line,
          key: 'cptm_lines',
        };
        commit('addLayer', resource);
      });
  },
  fetchCPTM_stations: async ({ commit }) => { 
    return await axios.get(`${api_url}/load_railway_stations_data`)
      .then(response => {
        const resource = {
          geometry: JSON.parse(response.data),
          style: style.railway,
          options: options.railway_station,
          key: 'cptm_stations',
        };
        commit('addLayer', resource);
      });
  },
  fetchSubway_lines: async ({ commit }) => {
    return await axios.get(`${api_url}/load_metro_lines_data`)
      .then(response => {
        const resource = {
          geometry: JSON.parse(response.data),
          style: style.subway,
          options: options.subway_line,
          key: 'subway_lines',
        };
        commit('addLayer', resource);
      });
  },
  fetchSubway_stations: async ({ commit }) => {
    return await axios.get(`${api_url}/load_metro_stations_data`)
      .then(response => {
        const resource = {
          key: 'subway_stations',
          geometry: JSON.parse(response.data),
          style: style.subway,
          options: options.subway_station,
        };
        commit('addLayer', resource);
      });
  },
  fetchBikelane: async ({ commit }) => {
    return await axios.get(`${api_url}/load_bikelane_data`)
      .then(response => {
        const { years, ...bikelanes } = response.data;
        commit('setBikelaneYears', years);

        const range = [Math.min(...years), Math.max(...years)];
        commit('setBikelaneRange', { range, mapkey: 'main' });
        commit('setBikelaneRange', { range, mapkey: 'second' });

        for (const bikelane in bikelanes) {
          const resource = {
            key: bikelane,
            style: style.bikelane,
            options: options.bikeLane,
            data: [],
          };
          for (let year in bikelanes[bikelane]) {
            const yearData = {
              geometry: JSON.parse(bikelanes[bikelane][year]),
              year,
            };
            resource.data.push(yearData);
          }
          commit('addBikelaneLayer', resource);
        }
      });
  },
  fetchAccidents: async ({ commit }) => { 
    return await axios.get(`${api_url}/load_accidents`)
      .then(response => {
        const resource = {
          geometry: JSON.parse(response.data),
          style: style.accidents,
          options: options.accidents,
          key: 'sp_accidents',
        };
        commit('addLayer', resource);
      });
  },
  fetchZones: async ({ commit }) => { 
    return await axios.get(`${api_url}/load_zones`)
      .then(response => {
        let zones = JSON.parse(response.data);
        commit('loadZones', zones);
        return zones;
      })
      .catch(err => {
        return err;
      });
  },
  fetchGrid: async ({ commit, rootState }, mapkey) => { 
    const gridSize = rootState.filters[mapkey].filters.gridSize;
    const gridOffset = rootState.filters[mapkey].filters.gridOffset;
    return await axios.post(`${api_url}/grid_layer`, { gridSize, gridOffset })
      .then(res => {
        commit('loadGrid', { layer: res.data, mapkey });
        return res.data;
      })
      .catch(err => {
        return err;
      });
  },
  toggleMirrorLayerControl: ({ commit }) => { 
    commit('toggleMirrorLayerControl');
  },
  setHideSecondMapLayerControl: ({ commit }, value) => { 
    commit('setHideSecondMapLayerControl', value);
  },
  copySelectedLayersTo: ({ commit }, mapkey) => {
    commit('copySelectedLayersTo', mapkey);
  },
  setBikelaneRange: ({ commit }, value) => { 
    commit('setBikelaneRange', value);
  },
};

const mutations = {
  cleanState: (state) => {
    Object.assign(state, ORIGINAL_STATE());
  },
  addLayer: (state, resource) => {
    state.data = [...state.data, resource];
  },
  addBikelaneLayer: (state, resource) => {
    state.bikelanes = [...state.bikelanes, resource];
  },
  setActiveLayer: (state, { layer_key, mapkey, bothMaps, value }) => {
    if (bothMaps) {
      state.activeLayers = {
        ...state.activeLayers,
        [layer_key]: {
          main: value,
          second: value
        }
      };
    } else {
      state.activeLayers = {
        ...state.activeLayers,
        [layer_key]: {
          ...state.activeLayers[layer_key],
          [mapkey]: value
        }
      };
    }
  },
  loadZones: (state, layer) => {
    state.zones = {
      geometry: layer,
      style: style.zones
    };
  },
  loadGrid: (state, { layer, mapkey }) => {
    state[mapkey] = {
      ...state[mapkey],
      grid: {
        geometry: layer,
        style: style.grid
      }
    };
  },
  toggleMirrorLayerControl: (state) => {
    state.mirrorControl = !state.mirrorControl;
  },
  setHideSecondMapLayerControl: (state, value) => {
    state.hideSecondMapControl = value;
  },
  copySelectedLayersTo: (state, mapkey) => {
    const mapkeyFrom = mapkey === 'main' ? 'second' : 'main';
    state[mapkey].activeLayersKeys = [...state[mapkeyFrom].activeLayersKeys] || [];
  },
  setBikelaneYears: (state, arr) => {
    state.bikelaneYears = arr;
  },
  setBikelaneRange: (state, { range, mapkey }) => {
    state[mapkey] = {
      ...state[mapkey],
      bikelaneRange: [...range]
    };
  },
  setDefaultBikelaneLayers: (state, value) => {
    state.main.bikelaneLayers = value;
    state.second.bikelaneLayers = value;
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};