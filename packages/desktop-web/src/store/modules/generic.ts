import { defineStore } from 'pinia';
import { reactive } from 'vue';

import store from '@/store';

export const GENERIC_STORE_NAME = 'GenericStore';

/**
 * 通用配置
 */
export const useGenericStore = defineStore(GENERIC_STORE_NAME, () => {

  /** 外观配置 */
  const appearance = reactive({
    showLeftSideBar: true


  })

  /** 对外观变量进行设置 */
  const appearanceSetter = {
    setLeftSideBarShow: (show = true) => appearance.showLeftSideBar = show,
    setLeftSideBarHidden: () => appearanceSetter.setLeftSideBarShow(false)
  }

  return {
    appearance, appearanceSetter

  }

}, {
  persist: {
    key: GENERIC_STORE_NAME,
    storage: localStorage
  }
})

export function cleaerGenericStore() {
  localStorage.removeItem(GENERIC_STORE_NAME);
}

export function useGenericStoreHook() {
  return useGenericStore(store);
}
