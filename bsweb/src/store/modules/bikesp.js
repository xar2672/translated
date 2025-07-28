import { fetchBikeSPData, fetchGeographicBikeSPData } from '../../service/bikeSPService';
import isEqual from 'lodash/isEqual';

const state = {
    data: [],
    dataConfig: {
        data_type: 'TRIP_COUNT',
        activeLayers: [],
    },
    activeDataConfig: {
        data_type: 'TRIP_COUNT',
        activeLayers: [],
    },
    zoomLevel: 8,
    mapCenter: { lat: -23.550164466, lng: -46.633664132 },
    maxDistance: 2000000,
    visualization: 'CHART',
    dirty: false,
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
        return !isEqual(state.activeDataConfig, state.dataConfig);
    }
}

const mutations = {
    updateActiveLayers(state, layer) {
        state.dataConfig.activeLayers = [
            ...state.dataConfig.activeLayers,
            ...layer
        ]
    },
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
        state.zoomLevel = zoom_level;
    },
    updateMapCenter(state, newCenter) {
        state.mapCenter = newCenter;
    },
    updateMaxDistance(state, newDistance) {
        state.maxDistance = newDistance
    } 
}

const actions = {
    async updateData({ commit, dispatch, state }) {
        try {
            let data;
            if (state.visualization === 'MAP') {
                data = await fetchGeographicBikeSPData(state);
            } else {
                data = await fetchBikeSPData(state.dataConfig);
            }
            commit('updateActiveDataConfig', state.dataConfig);
            commit('updateData', data);
            state.activeDataConfig.activeLayers.forEach(({name, value}) => {
                dispatch('setActiveLayer', {
                    layer_key: name,
                    mapkey: "main",
                    value,
                }, { root: true });
            });
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