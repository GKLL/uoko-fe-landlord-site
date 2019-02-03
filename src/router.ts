import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import ReportTopic from './views/ReportTopic.vue';
import { firstUpperCase } from '@/utils/utils';

Vue.use(Router);

const componentsList = [
  'businessOpa',
  'mainFlow',
  'reportTopic'
];

const loadView = (view: string) => {
  return () => import(/* webpackChunkName: "view-[request]" */ `./views/${view}.vue`);
};

const createRouters = (list: any) => {
  const routers = [];
  for (const item of list) {
    routers.push({
      path: `/${item}`,
      name: `${item}`,
      component: loadView(firstUpperCase(`${item}`))
    });
  }

  return routers;
};

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'index', component: ReportTopic },
    { path: '/home', name: 'home', component: ReportTopic },
    ...createRouters(componentsList)
  ]
});
