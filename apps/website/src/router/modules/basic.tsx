import { makeRoute } from '@rapid/libs-web';
import { lazy } from 'react';

export const notFoundRoute = makeRoute({
  name: 'NotFound',
  path: '*',
  component: lazy(() => import('@/pages/NotFound'))
});
