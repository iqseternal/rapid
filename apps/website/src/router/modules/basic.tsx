import { Suspense, lazy, useLayoutEffect, useTransition } from 'react';
import { createRoutesChildren, makeRoute } from '@rapid/libs-web/router';


export const notFoundRoute = makeRoute({ path: '*', name: 'NotFound', component: lazy(() => import('@components/NotFound')) });

export const notRoleRoute = makeRoute({ path: '/403', name: 'NotRole', component: lazy(() => import('@components/NotRole')) });

