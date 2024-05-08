import type { RouteRecordRaw } from 'vue-router';
import { terminalSvg, dashboardSvg, settingSvg } from '@/assets';
import { View, makeRoute } from '@libs/router';
import { spaceRoutes } from './space';

export const loginRoute = makeRoute({
  name: 'Login',
  path: '/login',
  component: () => import('@pages/index/views/login/index.vue')
} as const);

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/',
  redirect: spaceRoutes.path
} as const);

export const notFoundRoute = makeRoute({
  name: 'NotFound',
  path: '/404',
  component: () => import('@pages/index/views/dynamics/index.vue')
} as const);

export * from './space';

export const routes = [
  rootRoute,
  notFoundRoute,
  loginRoute,

  spaceRoutes
] as const;

export default routes;
