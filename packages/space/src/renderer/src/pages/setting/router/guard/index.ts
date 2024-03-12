import type { Router } from 'vue-router';

export default function asyncGuard(router: Router): Router {
  router.beforeEach((to, from, next) => {



    next()
    return
  });

  /** 做页面恢复 */
  router.afterEach((to, from) => {


  });

  return router;
}



