import { Suspense } from 'react';
import { Routes } from 'react-router-dom';
import { loginRoute, registerRoute, notFoundRoute, notRoleRoute, workspaceRoute } from './modules';
import { makeRoute, createRoutesChildren } from '@rapid/libs-web/router';
import { reserveRoutes } from './retrieve';

import * as presetRoutes from './modules';

import RootLayout from '@/layout/RootLayout';

const rootRoute = makeRoute({
  name: 'Root',
  path: '/', redirect: 'login',
  component: <RootLayout />,
  children: [
    loginRoute, registerRoute,
    notFoundRoute, notRoleRoute,
    workspaceRoute
  ]
});

reserveRoutes(presetRoutes);

export default function RouterContext() {
  return <Suspense
    fallback={<>
      <div>正在加载组件 ....</div>
      <div>当然, 你可能在出错的时候才有可能看到此页面....</div>
    </>}
  >
    <Routes>
      {createRoutesChildren([rootRoute])}
    </Routes>
  </Suspense>
}
