const state = {
  open: [],
  data: {
    editLayerIndex: null,
  },
};

const getters = {
  activeModal: () => (state.open.length > 0 ? state.open[0] : null),
  allOpen: () => state.open,
  editLayerIndex: () => state.data.editLayerIndex,
};

const actions = {
  open: ({ commit }, name) => commit('open', name),
  close: ({ commit }, name) => commit('close', name),
  setEditLayerIndex: ({ commit }, index) => commit('setEditLayerIndex', index), 
  cleanEditLayerIndex: ({ commit }) => commit('cleanEditLayerIndex'),
};

const mutations = {
  open: (state, name) => {
    state.open.unshift(name);
  },
  close: (state, name) => (state.open = state.open.filter(e => e !== name)),
  setEditLayerIndex: (state, index) => {
    state.data.editLayerIndex = index;
  },
  cleanEditLayerIndex: (state) => {
    state.data.editLayerIndex = null;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};