import { lazy } from 'react';
import { makeRoute } from '@rapid/libs-web/router';
import type { CompleteRouteConfig } from '@rapid/libs-web/router';
import { ticketRoute, notFoundRoute, notRoleRoute } from './basic';

import { workbenchesRoute } from './workbenches';

import RootLayoutWrapper from '@/layout/RootLayout';
import WorkspaceLayoutWrapper from '@/layout/WorkspaceLayout';

export * from './basic';
export * from './workbenches';

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/',
  redirect: workbenchesRoute.meta.fullPath,
  component: <RootLayoutWrapper />,
  children: [
    ticketRoute,
    notFoundRoute,
    notRoleRoute,

    workbenchesRoute,
  ]
});
