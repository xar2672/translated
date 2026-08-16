import { fetchBikeSPData, fetchGeographicBikeSPData } from '../../service/bikeSPService';
import { toRaw } from 'vue';
import isEqual from 'lodash/isEqual';

const ORIGINAL_STATE = () => {
    return {
        data: [],
        dataConfig: {
            aggregation: '',
            data_type: 'TOTAL_TRIPS',
            activeLayers: [],
            filters: {}
        },
        activeDataConfig: {
            aggregation: '',
            data_type: 'TOTAL_TRIPS',
            activeLayers: [],
            filters: {}
        },
        zoomLevel: 8,
        mapCenter: { lat: -23.550164466, lng: -46.633664132 },
        maxDistance: 2000000,
        visualization: 'CHART',
        dirty: false,
    };
};
const state = ORIGINAL_STATE();

const getters = {
    getBikespLabels(state) {
        return state.data.map(obj => obj['label']);
    },
    getBikespValues(state) {
        return state.data.map(obj => obj['value']);
    },
    isMapViewOn(state) {
        return state.visualization === 'MAP';
    },
    hasNewDataConfig(state) {
        return JSON.stringify(state.activeDataConfig) !== JSON.stringify(state.dataConfig);
    }
};

const mutations = {
    cleanState(state) {
        Object.assign(state, ORIGINAL_STATE());
    },
    updateActiveLayers(state, layer) {
        state.dataConfig.activeLayers = [
            ...state.dataConfig.activeLayers,
            ...layer
        ];
    },
    updateData(state, data) {
        state.data = Object.freeze(data);
    },
    updateDataType(state, data) {
        state.dataConfig.data_type = data;
    },
    updateAggregation(state, data) {
        state.dataConfig.aggregation = data;
    },
    updateActiveDataConfig(state, data) {
        state.activeDataConfig = structuredClone(toRaw(data));
    },
    updateFilters(state, data) {
        state.dataConfig.filters = {
            ...state.dataConfig.filters, 
            ...data
        };
    },
    
    updateZoomLevel(state, zoom_level) {
        state.zoomLevel = zoom_level;
    },
    updateMapCenter(state, newCenter) {
        state.mapCenter = newCenter;
    },
    updateMaxDistance(state, newDistance) {
        state.maxDistance = newDistance;
    },

    changeViewMode(state, view) {
        Object.assign(state, ORIGINAL_STATE());
        
        if (state.dataConfig) {
            state.dataConfig.data_type = 'TOTAL_TRIPS';
            state.activeDataConfig.data_type = 'TOTAL_TRIPS';
        }
        state.visualization = view;
    }

};

const actions = {

    async applyFilters({ commit, dispatch, state }) {
        commit('updateActiveDataConfig', state.dataConfig);
        await dispatch('updateData');
    },
    async updateData({ commit, dispatch, state }) {
        try {
            let apiPayload, data;
            const activeConfig = state.activeDataConfig;
            if (state.visualization === 'MAP') {
                apiPayload = {
                    dataType: activeConfig.data_type,
                    zoomLevel: state.zoomLevel,
                    mapCenter: toRaw(state.mapCenter),
                    maxDistance: state.maxDistance,
                    filters: activeConfig.filters
                };
                data = await fetchGeographicBikeSPData(apiPayload);
            } else {
                apiPayload = {
                    dataType: activeConfig.data_type,
                    aggregation: activeConfig.aggregation,
                    filters: activeConfig.filters
                };
                data = await fetchBikeSPData(apiPayload);
            };
            
            commit('updateData', data);
            
            if (activeConfig.activeLayers) {
                activeConfig.activeLayers.forEach(({key, value}) => {
                    dispatch('setActiveLayer', {
                        layer_key: key,
                        mapkey: "main",
                        value,
                    }, { root: true });
                });
            }
        } catch (error) {
            console.log("An error occurred", error);
            commit('updateData', []);
        }
    },

    changeView({ commit }, view) {
        commit('changeViewMode', view);
    }

};

export default {
  namespaced: true, 
  getters,
  state,
  actions,
  mutations,
};