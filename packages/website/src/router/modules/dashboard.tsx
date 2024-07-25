import { makeRoute } from '../utils';

import Redirect from '@rapid/libs-web/components/Redirect';
import DashLayout from '@/layout/DosLayout';

import Home from '@views/dashboard/home';

export const dashLoginRoute = makeRoute({
  path: '/dosLogin', name: 'DosLogin',
  component: <></>
})

export const dashRoutes = makeRoute({
  path: '/dashboard', name: 'Dashboard', component: <Redirect from='/dashboard' to='/dashboard/home' element={DashLayout} />,
  meta: { title: '' },
  children: [
    {
      path: 'home', name: 'DashboardHome', component: Home,
      meta: { title: '首页', windowTitle: 'OUPRO - 下载 SPACE' }
    }
  ]
});
