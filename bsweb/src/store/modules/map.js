import tiles from '../helpers/tiles';
import { markRaw } from 'vue';

const state = {
  maps: {
    // sharedCenter: { lat: -23.550164466, lng: -46.633664132 },
    sharedZoom: 12,
    /* This object contains info about maps being plotted in the application. Each map object contains a 'properties' object
    and a 'show' object. Default map's has 'mapkey' = main */
    main: {
      properties: {
        zoom: 12,
        // center: [-23.550164466, -46.633664132],
        center: { lat: -23.550164466, lng: -46.633664132 },
        tile_layers: tiles,
      },
      show: {
        /* this object stores keys to access data user wants to show */
        layers: {
          geojson: {},
          polyline: {},
          decorators: {},
        },
        flows: {
          polyline: {},
        },
        zones: false,
        grid: true,
        attractors: true,
        emitters: false,
      },
    },
    second: {
      properties: {
        zoom: 12,
        // center: [-23.550164466, -46.633664132],
        center: { lat: -23.550164466, lng: -46.633664132 },
        tile_layers: tiles,
      },
      show: {
        /* this object stores keys to access data user wants to show */
        layers: {
          geojson: {},
          polyline: {},
          decorators: {},
        },
        flows: {
          polyline: {},
        },
        zones: false,
        grid: true,
        attractors: true,
        emitters: false,
      },
    },
  },
  developer_mode: false,
  secondMapIsActive: false,
  mapControl: 'independent', // { independent, same }
};

const getters = {
  developer_mode: (state) => state.developer_mode,
  sharedControls: (state) => state.maps.sharedControls,
  centerMain: (state) => state.maps.main.properties.center,
  centerSecond: (state) => state.maps.second.properties.center,
  zoomMain: (state) => state.maps.main.properties.zoom,
  zoomSecond: (state) => state.maps.second.properties.zoom,
  secondMapIsActive: (state) => state.secondMapIsActive,
  mapControl: (state) => state.mapControl,
};

const actions = {
  addToMap: (context, data) => {
    context.commit('addToMap', data);
  },
  removeFromMap: (context, data) => {
    context.commit('removeFromMap', data);
  },
  resetMapResource: (context, data) => {
    context.commit('resetMapResource', data);
  },
  toggleDeveloperMode: ({ commit }) => { 
    commit('toggleDeveloperMode');
  },
  updateCenter: ({ commit }, { mapkey, center }) => { 
    commit('updateCenter', { mapkey, center });
  },
  updateZoom: ({ commit }, { mapkey, zoom }) => { 
    commit('updateZoom', { mapkey, zoom });
  },
  toggleSecondMap: ({ commit }) => { 
    commit('toggleSecondMap');
  },
  changeMapControl: ({ commit }, value) => { 
    commit('changeMapControl', value);
  },
};

const mutations = {
  addToMap: (state, { mapkey, category, type, key, options }) => {
    state.maps[mapkey].show[category][type][key] = markRaw(options);
  },
  removeFromMap: (state, { mapkey, category, type, key }) => {
    delete state.maps[mapkey].show[category][type][key]; 
  },
  resetMapResource: (state, { mapkey, category, type }) => {
    state.maps[mapkey].show[category][type] = {}; 
  },
  hideZones: (state, mapkey) => {
    state.maps[mapkey].show.zones = false; 
  },
  hideGrid: (state, mapkey) => {
    state.maps[mapkey].show.grid = false; 
  },
  showZones: (state, mapkey) => {
    state.maps[mapkey].show.zones = true; 
  },
  showGrid: (state, mapkey) => {
    state.maps[mapkey].show.grid = true; 
  },
  changeHeatmapVisibility: (state, { which, visible, mapkey }) => {
    state.maps[mapkey].show[which] = visible; 
  },
  toggleDeveloperMode: (state) => {
    state.developer_mode = !state.developer_mode; 
  },
  updateCenter: (state, { mapkey, center }) => {
    if (state.mapControl === 'same') {
      if (mapkey === 'main') {
        state.maps.second.properties.center = center; 
      } else {
        state.maps.main.properties.center = center; 
      }
    }
  },
  updateZoom: (state, { mapkey, zoom }) => {
    if (state.mapControl == 'same') {
      if (mapkey === 'main') {
        state.maps.second.properties.zoom = zoom; 
      } else {
        state.maps.main.properties.zoom = zoom; 
      }
    }
  },
  toggleSecondMap: (state) => {
    state.secondMapIsActive = !state.secondMapIsActive; 
  },
  changeMapControl: (state, value) => {
    state.mapControl = value; 
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};