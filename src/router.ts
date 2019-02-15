import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import Home from './views/Home.vue';
import { firstUpperCase } from '@/utils/utils';

Vue.use(Router);

// const componentsList = [
//   'home',
//   'bind',
//   'entrust',
//   'houseList',
//   'businessOpa',
//   'mainFlow',
//   'reportTopic'
// ];
let router!: any;
const componentsList = [
  {
    path: 'home',
    title: '星空业主服务号'
  },
  {
    path: 'bind',
    title: '登录'
  },
  {
    path: 'entrust',
    title: '委托房源'
  },
  {
    path: 'houseList',
    title: '我的房源列表'
  }
];

const loadView = (view: string) => {
  return () => import(/* webpackChunkName: "view-[request]" */ `./views/${view}.vue`);
};

const createRouters = (list: any) => {
  const routers = [];
  for (const item of list) {
    routers.push({
      path: `/${item.path}`,
      name: `${item.path}`,
      meta: `${item.title}`,
      component: loadView(firstUpperCase(`${item.path}`))
    });
  }

  return routers;
};

router = new Router({
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'index', component: Home, meta: '星空业主服务号' },
    { path: '/home', name: 'index', component: Home,  meta: '星空业主服务号' },
    ...createRouters(componentsList)
  ]
});

router.beforeEach((to: any, from: any, next: any) => {
  /* 路由发生变化修改页面title */
  if (to.meta) {
    document.title = to.meta;
  }
  next();
});

export default router;

