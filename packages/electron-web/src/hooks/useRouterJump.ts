import { isString } from '@suey/pkg-utils';
import { onActivated, onBeforeMount, onBeforeUnmount, onDeactivated, ref } from 'vue';
import type { RouteLocationNormalized, NavigationGuardNext, Router } from 'vue-router';
import { useRoute } from 'vue-router';

const backBlackList = new Set<string>();

/**
 * 组件使用禁止当前组件所处位置进行回退路由
 *
 * 此函数生效的前提为 useDisableRouterBackHook 已经为 router 调用过
 */
export const useDisableRouterBack = () => {
  const route = useRoute();
  const isEnabled = ref(false);

  const addDisableUrl = (url: string) => backBlackList.add(url);
  const removeDisableUrl = (url: string) => backBlackList.delete(url);

  const enable = () => {
    if (isEnabled.value) return;
    addDisableUrl(route.fullPath);
    isEnabled.value = true;
  }
  const disable = () => {
    if (!isEnabled.value) return;
    removeDisableUrl(route.fullPath);
    isEnabled.value = false;
  }

  onBeforeMount(enable);
  onActivated(enable);

  onBeforeUnmount(disable);
  onDeactivated(disable);
}

/**
 * 禁止 router 返回, 这个函数需要在入口为 router 执行一次
 * @param router
 */
export const useDisableRouterBackHook = (router: Router) => {
  const isDisabledBack = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (backBlackList.has(from.fullPath)) {
      const forwardUrl = router.options.history.state.forward;
      // 当前在回退标签页导航
      if (isString(forwardUrl) && backBlackList.has(forwardUrl)) return true;
    }

    return false;
  }

  router.beforeEach((to, from, next) => {
    if (isDisabledBack(to, from)) return next(false);
    next();
  });

  router.afterEach((to, from) => {

  });
}
