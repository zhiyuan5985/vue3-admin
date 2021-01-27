import router from './index';
import store from '@/store/index'
import { getToken, removeToken, removeUserName } from '@/utils/token.js';
const whiteRouter = ['/login']; // 白名单,为了防止死循环，凡是白名单里的，被指向后不会再重复跳转
// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 路由动态添加，分配菜单，每个角色分配不同的菜单
    if (to.path === '/login') {
      // 清除cookie里面的username与token
      removeToken();
      removeUserName('username');
      // 清除vuex里面的username与token
      store.commit('app/REMOVE_TOKEN');
      store.commit('app/REMOVE_USERNAME');
    } 
    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      // to指向白名单中的路由
      next(); // 结束循环
    } else {
      next('/login'); // 没有token，回到登录页
    }
  }
});
