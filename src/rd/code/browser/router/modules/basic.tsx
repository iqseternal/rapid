import { lazy } from 'react';
import { makeRoute } from '@rapid/libs-web/router';

export const notFoundRoute = makeRoute({
  name: 'NotFound',
  path: '*',
  component: lazy(() => import('@/pages/NotFound'))
});

export const notRoleRoute = makeRoute({
  name: 'NotRole',
  path: '/403',
  component: lazy(() => import('@/pages/NotRole'))
});

export const ticketRoute = makeRoute({
  name: 'TicketRoute',
  path: '/ticket',
  component: lazy(() => import('@/pages/Ticket'))
})
