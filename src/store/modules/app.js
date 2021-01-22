import Cookie from 'cookie_js';

const state = {
  isCollapse: false || Cookie.get('isCollapse') ? JSON.parse(Cookie.get('isCollapse')) : false,
};
const mutations = {
  SET_ISCOLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
  },
};
const actions = {
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      loginApi(requestData)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
