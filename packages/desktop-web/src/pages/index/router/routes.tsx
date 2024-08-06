import { makeRoute } from './utils';
import { loginRoute, registerRoute, notFoundRoute, notRoleRoute, workbenchesRoute } from './modules';
import RootLayout from '../layout/RootLayout';

export * from './modules';

export const rootRoute = makeRoute({
  name: 'Root',
  path: '/', redirect: 'login',
  component: <RootLayout />,
  children: [
    loginRoute, registerRoute,
    notFoundRoute, notRoleRoute,
    workbenchesRoute
  ]
});

export const routes = [rootRoute];
