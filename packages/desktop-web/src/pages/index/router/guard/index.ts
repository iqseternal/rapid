import type { Router } from 'vue-router';
import { loginRoute, spaceRoutes } from '../modules';
import { useUserStore } from '@/store/modules/user';
import { isBooleanObject } from 'util/types';

import { useDisableRouterBackHook } from '@/hooks';

export default function asyncGuard(router: Router): Router {
  useDisableRouterBackHook(router);

  router.beforeEach((to, from, next) => {
    if (!window.electron) window.location.href = 'https://www.oupro.cn';
    if (!window.electron.ipcRenderer) window.location.href = 'https://www.oupro.cn';




    return next();
  });

  /** 做页面恢复 */
  router.afterEach((to, from) => {


  });

  return router;
}



