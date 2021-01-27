import Cookie from 'cookie_js';
import { loginApi } from '@/api/login.js'
import { setToken, setUserName, getUserName, removeToken, removeUserName } from '@/utils/token.js'

const state = {
  isCollapse: false || Cookie.get('isCollapse') ? JSON.parse(Cookie.get('isCollapse')) : false,
  token: '',
  username: '' || getUserName('username')
};
const mutations = {
  SET_ISCOLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, val) {
    state.token = val;
  },
  SET_USERNAME(state, val) {
    state.username = val;
  },
  REMOVE_TOKEN(state) {
    state.token = '';
  },
  REMOVE_USERNAME(state) {
    state.username = '';
  }
};
const actions = {
  login(content, requestData) {
    return new Promise((resolve, reject) => {
      loginApi(requestData).then(res => {
        // 数据token与username
        let data = res.data.data;
        let username = data.username;
        let token = data.token;
        // 存在store的state里
        content.commit('SET_TOKEN', token);
        content.commit('SET_USERNAME', username);
        // 存在cookie里
        setToken(token);
        setUserName(username);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  },
  exit(content) {
    return new Promise ((resolve, reject) => {
      // 清除cookie里面的token和username
      removeToken();
      removeUserName('username');
      // 清除state里面的token和username
      content.commit('REMOVE_TOKEN');
      content.commit('REMOVE_USERNAME');
      resolve();
    })
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
