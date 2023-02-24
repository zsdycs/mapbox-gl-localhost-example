import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export const constantRoutes = [
  {
    path: '/',
    redirect: '/test'
  },
  {
    path: '/test',
    component: () => import('@/views/test/index'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () => new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
});

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
