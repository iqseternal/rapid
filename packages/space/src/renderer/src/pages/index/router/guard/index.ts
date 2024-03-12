import type { Router } from 'vue-router';
import { loginRoute, spaceRoutes } from '../modules';
import { useUserStore } from '@renderer/store/modules/user';
import { isBooleanObject } from 'util/types';

import { useDisableRouterBackHook } from '@renderer/hooks';

export default function asyncGuard(router: Router): Router {
  useDisableRouterBackHook(router);

  router.beforeEach((to, from, next) => {




    return next();
  });

  /** 做页面恢复 */
  router.afterEach((to, from) => {


  });

  return router;
}



