import axios from 'axios';

const api_url = process.env.VUE_APP_API_URL;

const state = {
  layers: [],
};

const getters = {
  uploadedLayers: () => state.layers,
};

const actions = {
  shapefileToGeoJson: async ({ commit }, { formData, props, fileType }) => {
    let method = '';
    if (fileType === 'shp')
      method = 'shapefile_to_geojson';
    else if (fileType === 'kmz')
      method = 'kmz_to_geojson';
    else if (fileType === 'zip')
      method = 'shapefile_zip_to_geojson';

    const response = await axios.post(`${api_url}/${method}`, formData);
    if (response.status === 200) {
      commit('saveGeoJson', {
        ...props,
        geometry: response.data,
        isActive: { main: true, second: true },
      });
    } else {
      // eslint-disable-next-line no-console
      console.error('Error while uploading shapefile');
    }
  },
  loadSavedLayers: ({ commit }) => {
    const customLayers = JSON.parse(localStorage.getItem('geojson'));
    commit('loadSavedLayers', customLayers);
  },
  toggleCustomLayer: ({ commit }, data) => {
    commit('toggleCustomLayer', data);
    commit('saveCustomLayerLocalStorage');
  },
  removeCustomLayer: ({ commit }, index) => {
    commit('removeCustomLayer', index);
    commit('saveCustomLayerLocalStorage');
  },
  editCustomLayer: ({ commit }, { index, name, style }) => {
    commit('editCustomLayer', { index, name, style });
    commit('saveCustomLayerLocalStorage');
  },
};

const mutations = {
  saveGeoJson: (state, geojson) => {
    const newLayers = [...state.layers, geojson];
    localStorage.setItem('geojson', JSON.stringify(newLayers));
    state.layers = newLayers; 
  },
  loadSavedLayers: (state, customLayers) => {
    state.layers = customLayers || []; 
  },
  toggleCustomLayer: (state, { index, mapkey, value }) => {
    state.layers[index].isActive[mapkey] = value; 
  },
  removeCustomLayer: (state, index) => {
    state.layers.splice(index, 1);
  },
  editCustomLayer: (state, { index, name, style }) => {
    state.layers[index].name = name; 
    state.layers[index].style = style; 
  },
  saveCustomLayerLocalStorage: (state) => {
    localStorage.setItem('geojson', JSON.stringify(state.layers));
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};