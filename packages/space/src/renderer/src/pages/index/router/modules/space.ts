import type { RouteRecordRaw } from 'vue-router';
import { terminalSvg, dashboardSvg, settingSvg } from '@renderer/assets';
import { View, makeRoute, toRoutes } from '@libs/router';

export const spaceRoutes = makeRoute({
  name: 'Space',
  path: '/space',
  component: () => import('@renderer/pages/index/layout/index.vue'),
  redirect: 'workbenches',
  children: [
    {
      name: 'Workbenches',
      path: 'workbenches',
      meta: { svg: dashboardSvg, title: '工作台' },
      component: () => import('@pages/index/views/workbenches/index.vue'),
    },
    {
      name: 'Dashboard',
      path: 'dashboard',
      meta: { svg: dashboardSvg },
      component: () => import('@pages/index/views/dashboard/index.vue'),
    },
    {
      name: 'Profile',
      path: 'profile',
      meta: { icon: 'ProfileOutlined' },
      component: () => import('@pages/index/views/profile/index.vue'),
    }
  ]
});
