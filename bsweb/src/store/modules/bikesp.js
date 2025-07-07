import { fetchBikeSPData, fetchGeographicBikeSPData } from '../../service/bikeSPService';

const state = {
    data: [],
    dataConfig: {
        data_type: 'TRIP_COUNT'
    },
    activeDataConfig: {
        data_type: 'TRIP_COUNT',
    },
    zoom_level: 4,
    map_center: { lat: -23.550164466, lng: -46.633664132 },
    max_distance: 2000000,
    visualization: 'CHART',
}

const getters = {
    getBikespLabels(state) {
        return state.data.map(obj => obj['label']);
    },
    getBikespValues(state) {
        return state.data.map(obj => obj['value']);
    },
    isMapViewOn(state) {
        return state.visualization === 'MAP'
    },
    hasNewDataConfig(state) {
        return !(state.activeDataConfig == state.dataConfig);
    }
}

const mutations = {
    updateData(state, data) {
        state.data = data;
    },
    updateDataType(state, data) {
        state.dataConfig.data_type = data;
    },
    updateAggregation(state, data) {
        state.dataConfig.aggregation = data;
    },
    updateActiveDataConfig(state, data) {
        state.activeDataConfig = structuredClone(data)
    },
    updateFilters(state, data) {
        state.dataConfig.filters = {
            ...state.dataConfig.filters, 
            ...data
        }
    },
    changeView(state, view) {
        state.visualization = view;
    },
    updateZoomLevel(state, zoom_level) {
        state.zoom_level = Math.floor(zoom_level/2)+1;
    },
    updateMapCenter(state, newCenter) {
        state.map_center = newCenter;
    },
    updateMaxDistance(state, newDistance) {
        state.max_distance = newDistance
    } 
}

const actions = {
    async updateData({ commit, state }) {
        try {
            let data;
            if (state.visualization === 'MAP') {
                data = await fetchGeographicBikeSPData(state);
            } else {
                data = await fetchBikeSPData(state.dataConfig);
            }
            commit('updateActiveDataConfig', state.dataConfig);
            commit('updateData', data);
        } catch (error) {
            console.log("An error occurred", error);
            commit('updateData', []);
        }
    }
}

export default {
  namespaced: true, 
  getters,
  state,
  actions,
  mutations,
};