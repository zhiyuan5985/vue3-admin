import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '@/views/Login/index';
import Console from '@/views/Console/index';
import Layout from '@/views/Layout/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    meta: {
      name: '主页',
    },
    hidden: true,
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      name: '登录',
    },
    component: Login,
  },
  /**
   * 控制台
   */
  {
    path: '/console',
    name: 'Console',
    meta: {
      name: '控制台',
      icon: 'yibiao',
    },
    redirect: 'index',
    component: Layout,
    children: [
      {
        path: '/index',
        name: 'Index',
        meta: {
          name: '首页',
        },
        component: Console,
      },
    ],
  },
  /**
   * 信息管理
   */
  {
    path: '/info',
    name: 'Info',
    meta: {
      name: '信息管理',
      icon: 'info',
    },
    component: Layout,
    children: [
      {
        path: '/infoIndex',
        name: 'infoIndex',
        meta: {
          name: '信息列表',
        },
        component: () => import('../views/Info/index.vue'),
      },
      {
        path: '/infoCategory',
        name: 'infoCategory',
        meta: {
          name: '信息分类',
        },
        component: () => import('../views/Info/Category.vue'),
      },
      {
        path: '/infoDetail ',
        name: 'InfoDetail',
        meta: {
          name: '信息详情',
        },
        hidden: true,
        component: () => import('../views/Info/InfoDetail.vue'),
      },
    ],
  },
  /**
   * 用户管理
   */
  {
    path: '/user',
    name: 'User',
    meta: {
      name: '用户管理',
      icon: 'user',
    },
    component: Layout,
    children: [
      {
        path: '/userIndex',
        name: 'UserIndex',
        meta: {
          name: '用户列表',
        },
        component: () => import('../views/User/index.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

export default router;
