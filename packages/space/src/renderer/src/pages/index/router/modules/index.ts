import type { RouteRecordRaw } from 'vue-router';
import { terminalSvg, dashboardSvg, settingSvg } from '@renderer/assets';
import { View, makeRoute, toRoutes } from '@libs/router';
import { spaceRoutes } from './space';

export const loginRoute = makeRoute({
  name: 'Login',
  path: '/login',
  component: () => import('@pages/index/views/login/index.vue')
} as const);

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/',
  redirect: loginRoute.meta.fullpath
} as const);

export * from './space';

export const routes = [
  rootRoute,
  loginRoute,
  spaceRoutes
] as const;

export default routes;
