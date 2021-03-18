import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from '@vue/composition-api';
import App from './App.vue';
import router from './router';
import store from './store';
import './icons/index.js';
import './router/defend.js';
import  globalMethods from "@/utils/globalMethods.js";
// 全局注入
Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.use(globalMethods);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
