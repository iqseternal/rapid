import type { Router } from 'vue-router';
import { loginRoute, spaceRoutes, notFoundRoute } from '../modules';
import { useUserStore } from '@/store/modules/user';
import { isBooleanObject } from 'util/types';
import { useDisableRouterBackHook } from '@/hooks';

export default function asyncGuard(router: Router): Router {
  useDisableRouterBackHook(router);

  router.beforeEach((to, from, next) => {
    if (to.path !== notFoundRoute.path) {
      if (!window.electron || !window.electron.ipcRenderer) return next({ name: notFoundRoute.name });
    }


    return next();
  });

  /** 做页面恢复 */
  router.afterEach((to, from) => {

  });

  return router;
}



