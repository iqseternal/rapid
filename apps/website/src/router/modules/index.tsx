
import { Outlet } from 'react-router-dom';
import { receptionMenuRoute, receptionRoute } from './reception';
import { dashLoginRoute, dashRoute } from './dashboard';
import { notFoundRoute, notRoleRoute } from './basic';
import { makeRoute } from '@rapid/libs-web';

export * from './dashboard';

export * from './reception';

export const rootRoute = makeRoute({
  path: '/',
  name: 'Root',
  redirect: receptionRoute.meta.fullPath,
  component: <Outlet />,
  children: [

    notRoleRoute, notFoundRoute,

    receptionRoute,

    dashLoginRoute, dashRoute
  ]
});
