import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'cookie_js'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isCollapse: false || JSON.parse(Cookie.get('isCollapse'))
    },
    mutations: {
        SET_ISCOLLAPSE(state) {
            state.isCollapse = !state.isCollapse;
            Cookie.set('isCollapse', JSON.stringify(state.isCollapse));
        }
    },
    actions: {},
    modules: {}
})