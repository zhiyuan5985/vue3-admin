const state = {
  id: "" || sessionStorage.getItem('infoId'),
  title: "" || sessionStorage.getItem('infoTitle')
};
const getters = {
  infoId: state => state.id,
  infoTitle: state => state.title
}
const mutations = {
  SET_ID(state, val) {
    state.id = val;
    // html5存储
    sessionStorage.setItem('infoId', val);
  },
  SET_TITLE(state, val) {
    state.title = val;
    sessionStorage.setItem('infoTitle', val);
  }
};
const actions = {
  
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
