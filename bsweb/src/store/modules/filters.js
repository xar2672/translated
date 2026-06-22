import axios from 'axios';
import { nextTick } from 'vue';
import selectors, { copySelector } from '../helpers/default_selectors';

const api_url = process.env.VUE_APP_API_URL;
const default_grid_size = 20;

const ORIGINAL_STATE = {
  selectors,
  main: {
    activeFilters: [],
    filters: {
      ut: '',
      params: {},
      baseLayer: 'grid',
      gridSize: default_grid_size,
      gridOffset: {
        west: -0.15,
        east: 0.23,
        north: 0.19,
        south: -0.46,
      },
    },
    gridEditMode: false,
  },
  second: {
    activeFilters: [],
    filters: {
      ut: '',
      params: {},
      baseLayer: 'grid',
      gridSize: default_grid_size,
      gridOffset: {
        west: -0.15,
        east: 0.23,
        north: 0.19,
        south: -0.46,
      },
    },
    gridEditMode: false,
  },
  chartList: [
    '@/assets/tmp_charts/agechart.png',
    '@/assets/tmp_charts/triplengths.png',
  ],
  loading_filters: false,
  flows_not_found: false,
  mirrorControl: false,
  hideSecondMapControl: false,
  freezeUpdates: false,
};
const state = {...ORIGINAL_STATE};

const getters = {
  activeFilters: state => state.main.activeFilters,
  filters: state => state.main.filters,
  gridSize: state => state.main.filters.gridSize,
  gridOffset: state => state.main.filters.gridOffset,

  activeFilters2: state => state.second.activeFilters,
  filters2: state => state.second.filters,
  gridSize2: state => state.second.filters.gridSize,
  gridOffset2: state => state.second.filters.gridOffset,

  loading_filters: state => state.loading_filters,
  flowsNotFound: state => state.flows_not_found,
  gridEditMode: state => state.gridEditMode,
  activeFiltersCount: state =>
    state.main.activeFilters.length + state.second.activeFilters.length,
  mirrorFilterControl: state => state.mirrorControl,
  hideSecondMapFilterControl: state => state.hideSecondMapControl,
  selectors: state => state.selectors,
};

const actions = {
  addFilter: ({ commit }, filter) => {
    commit('addFilter', filter);
  },
  removeFilter: ({ commit }, data) => {
    commit('removeActiveFilter', data);
  },
  addActiveFilter: ({ commit, getters }, data) => {
    commit('addActiveFilter', { ...data, bothMaps: getters.mirrorFilterControl });
  },
  removeActiveFilter: ({ commit, dispatch, getters }, data) => {
    const { mapkey } = data;
    const bothMaps = getters.mirrorFilterControl;
    commit('removeActiveFilter', { ...data, bothMaps });
    dispatch('resetMapResource', { mapkey, category: 'flows', type: 'polyline' });
    dispatch('filterData', mapkey);
  },
  filterData: async ({ commit, dispatch, getters }, mapkey) => {
    commit('loading_filters', true);
    let filters = mapkey === 'main' ? getters.filters : getters.filters2;
    const year = getters['flows/odYear'][mapkey];

    return await axios
      .post(`${api_url}/filter_data`, { ...filters, year })
      .then(res => res.data)
      .then(response => {
        const flows = response.flows;
        const tiers = Object.keys(flows);
        const flows_props = response.flow_props;

        const limits = [];
        for (let i = 0; i < 4; i++) {
          limits.push({
            min: flows_props.min[i],
            max: flows_props.top[i],
            flowsPercentage: flows_props.flows_perc[i],
            flowsCount: flows_props.flow_counts[i],
          });
        }
        dispatch('flows/setLimits', { limits, mapkey }, { root: true });

        if (tiers.length > 0) {
          tiers.forEach(tier => {
            dispatch('flows/addTripsPerTier', { tier, count: flows[tier].length, mapkey }, { root: true });
            dispatch('flows/addFlows', { tier, flows: flows[tier], mapkey }, { root: true });
          });
          commit('setFlowsNotFound', false);
        } else {
          commit('setFlowsNotFound', true);
          dispatch('flows/resetFlows', mapkey, { root: true });
        }
      })
      .then(() => commit('loading_filters', false));
  },
  updateFilterParams: ({ commit, dispatch, getters, state }, { filter, mapkey }) => {
    if (state.freezeUpdates) return;
    const bothMaps = getters.mirrorFilterControl;
    commit('updateFilterParams', { filter, mapkey, bothMaps });
    if (bothMaps) {
      dispatch('resetMapResource', { mapkey: 'main', category: 'flows', type: 'polyline' });
      dispatch('resetMapResource', { mapkey: 'second', category: 'flows', type: 'polyline' });
      dispatch('filterData', 'main');
      dispatch('filterData', 'second');
    } else {
      dispatch('resetMapResource', { mapkey, category: 'flows', type: 'polyline' });
      dispatch('filterData', mapkey);
    }
  },
  updateOD: ({ commit }, data) => {
    commit('updateOD', data);
  },
  updateGridSize({ commit }, { gridSize, mapkey }) {
    commit('updateGridSize', { gridSize: Number(gridSize), mapkey });
  },
  setToken: ({ commit }, value) => {
    commit('setToken', value);
  },
  updateGridOffset({ commit, getters }, { key, value, mapkey }) {
    const gridOffset = mapkey === 'main' ? getters.gridOffset : getters.gridOffset2;
    if (gridOffset[key] !== value) {
      const newGridOffset = { ...gridOffset, [key]: value };
      commit('updateGridOffset', { gridOffset: newGridOffset, mapkey });
    }
  },
  setGridEditModeOn({ commit, dispatch }, mapkey) {
    dispatch('flows/resetFlows', mapkey, { root: true });
    commit('setGridEditMode', { value: true, mapkey });
  },
  setGridEditModeOff({ commit }, mapkey) {
    commit('setGridEditMode', { value: false, mapkey });
  },
  toggleMirrorFilterControl: ({ commit }) => {
    commit('toggleMirrorFilterControl');
  },
  setHideSecondMapFilterControl: ({ commit }, value) => {
    commit('setHideSecondMapFilterControl', value);
  },
  freezeUpdates: ({ commit }) => {
    commit('freezeUpdates');
  },
  unfreezeUpdates: ({ commit }) => {
    commit('unfreezeUpdates');
  },
  copySelectedFiltersTo: ({ commit, dispatch }, mapkey) => {
    commit('freezeUpdates');
    commit('copySelectedFiltersTo', mapkey);
    nextTick(() => {
      commit('unfreezeUpdates');
      dispatch('filterData', mapkey);
    });
  },
};

const mutations = {
  addActiveFilter: (state, { filter, mapkey, bothMaps }) => {
    if (bothMaps) {
      state.main.activeFilters.push(filter);
      state.second.activeFilters.push(filter);
    } else {
      state[mapkey].activeFilters.push(filter);
    }
  },
  setToken: (state, token) => {
    state.filters.ut = token;
  },
  removeActiveFilter: (state, { filter, mapkey }) => {
    state[mapkey].activeFilters = state[mapkey].activeFilters.filter(
      activeFilter => filter.id !== activeFilter.id
    );
    delete state[mapkey].filters.params[filter.id];
  },
  addAttractors: (state, { attractors }) => {
    state.heatmaps = state.heatmaps || {};
    state.heatmaps.attractors = attractors;
  },
  addEmitters: (state, { emitters }) => {
    state.heatmaps = state.heatmaps || {};
    state.heatmaps.emitters = emitters;
  },
  addCharts: (state, { charts }) => {
    state.charts = charts;
  },
  updateFilterParams: (state, { filter: { id, params }, mapkey, bothMaps }) => {
    if (bothMaps) {
      state.main.filters.params[id] = params;
      state.second.filters.params[id] = params;
      const mapkey2 = mapkey === 'main' ? 'second' : 'main';
      state.selectors[mapkey2][id] = state.selectors[mapkey][id];
    } else {
      state[mapkey].filters.params[id] = params;
    }
  },
  updateOD: (state, { value, mapkey }) => {
    state[mapkey].filters.baseLayer = value;
  },
  updateGridSize: (state, { gridSize, mapkey }) => {
    state[mapkey].filters.gridSize = gridSize;
  },
  updateGridOffset: (state, { gridOffset, mapkey }) => {
    state[mapkey].filters.gridOffset = gridOffset;
  },
  loading_filters: (state, value) => {
    state.loading_filters = value;
  },
  setFlowsNotFound: (state, value) => {
    state.flows_not_found = value;
  },
  setGridEditMode: (state, { value, mapkey }) => {
    state[mapkey].gridEditMode = value;
  },
  toggleMirrorFilterControl: state => {
    state.mirrorControl = !state.mirrorControl;
  },
  setHideSecondMapFilterControl: (state, value) => {
    state.hideSecondMapControl = value;
  },
  freezeUpdates: state => {
    state.freezeUpdates = true;
  },
  unfreezeUpdates: state => {
    state.freezeUpdates = false;
  },
  copySelectedFiltersTo: (state, mapkey) => {
    const mapkeyFrom = mapkey === 'main' ? 'second' : 'main';
    const selectorsCopy = copySelector(state.selectors[mapkeyFrom]);
    state.selectors[mapkey] = selectorsCopy;
    state[mapkey].filters.params = state[mapkeyFrom].filters.params;
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
