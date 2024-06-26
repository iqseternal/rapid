import type { RouteRecordRaw } from 'vue-router';
import { terminalSvg, dashboardSvg, settingSvg } from '@/assets';
import { View, makeRoute } from '@libs/router';

export const spaceRoutes = makeRoute({
  name: 'Rapid',
  path: '/rapid',
  component: () => import('@pages/index/layout/index.vue'),
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

export const [workbenchesRoute] = spaceRoutes.children;
