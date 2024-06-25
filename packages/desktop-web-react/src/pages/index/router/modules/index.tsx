import { lazy } from 'react';
import { makeRoute } from '../utils';

import Redirect from '@rapid/libs/components/Redirect';
import ReceptionLayout from '@pages/index/layout';

import Home from '@/pages/index/views/home';

export const rootRoute = makeRoute({
  path: '/', name: 'R', component: <Redirect path='/' to='/index' element={<ReceptionLayout />} />,
  meta: { title: '' },
  children: [
    {
      path: 'index', name: 'ReceptionHome',
      meta: { title: '首页' },
      component: lazy(() => import('@pages/index/views/home'))
    }
  ]
});
