import { lazy } from 'react';
import { makeRoute } from '../utils';

import Redirect from '@rapid/libs-web/components/Redirect';
import ReceptionLayout from '@/layout/ReceptionLayout';

import Home from '@views/reception/home';
import Download from '@views/reception/download';

export const receptionRoutes = makeRoute({
  path: '/reception', name: 'Reception', component: <Redirect from='/reception' to='/reception/index' element={<ReceptionLayout />} />,
  meta: { title: '' },
  children: [
    {
      path: 'index', name: 'ReceptionHome', component: lazy(() => import('@views/reception/home')),
      meta: { title: '首页' },
      children: [
        {
          path: 'pre', name: 'P', component: <>1</>,
          meta: { title: '我也不知道' }
        },
        {
          path: 'pre2', name: 'P2', component: <>1</>,
          meta: { title: '我也不知道' }
        }
      ]
    },
    {
      path: 'download', name: 'ReceptionDownload', component: lazy(() => import('@views/reception/download')),
      meta: { title: '下载', windowTitle: 'OUPRO - 下载 SPACE' }
    }
  ]
});

export const receptionMenuRoutes = receptionRoutes;
