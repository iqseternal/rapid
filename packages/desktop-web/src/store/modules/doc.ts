import { defineStore } from 'pinia';
import { reactive, watch, watchEffect, computed, ref } from 'vue';
import { setupIndexedDB, DATABASES_META2D, type TablesType } from '@/indexedDB';
import { IndexedDB } from '@rapid/libs/indexedDB';
import { isDef, isUnDef } from '@suey/pkg-utils';
import { windowClose, docOpen, docSaveAs, docSave, WindowPopup, docImport } from '@/actions';
import { EXPORTS_EXTENSIONS } from '@rapid/config/constants';
import { getMeta2dData } from '@meta/actions';
import { useRoute } from 'vue-router';
import { workbenchesRoute } from '@pages/index/router/modules';

import store from '@/store';
import { useDataState, useDataStateHook } from '@meta/useProps';

const { dataState } = useDataStateHook();

export const DOC_STORE_NAME = 'docStore';

export const useDocStore = defineStore(DOC_STORE_NAME, () => {
  const route = useRoute();

  const filePath = ref<undefined | string>();

  /** 当文件名存在,那么就表示当前正在工作区绘图 */
  const isWork = computed(() => {

    return route.path === workbenchesRoute.meta.fullpath;
  });

  const loadDoc = async () => {
    if (!filePath.value) {

      createDoc();

      return;
    }

    const message = await docOpen(filePath.value);

    filePath.value = message.filePath;
    meta2d.clear();
    meta2d.open(message.data);
  }

  const importDoc = async () => {
    if (isWork.value) {
      const needSave = WindowPopup.confim('当前工作区还有文档,是否先保存?');
      if (needSave) await saveDoc();
    }

    const data = await docImport(EXPORTS_EXTENSIONS.JSON);


    filePath.value = '导入文档';
    filePath.value = void 0;

    meta2d.clear();
    meta2d.open(data);
  }

  const createDoc = async () => {
    if (isWork.value) {
      // const needSave = WindowPopup.confim('当前工作区还有文档,是否先保存?');
      // if (needSave) await saveDoc();
    }

    filePath.value = void 0;

    if (window.meta2d) meta2d.clear();
  }

  /** 另存为文档 */
  const saveAsDoc = async () => {
    if (window.meta2d && isWork.value) {
      return docSaveAs(getMeta2dData());
    }

    return Promise.reject();
  }

  const saveDoc = async () => {
    if (window.meta2d && isWork.value) {
      if (filePath.value) return docSave(filePath.value, getMeta2dData());
      return saveAsDoc();
    }

    return Promise.reject();
  }

  const openDoc = async () => {
    // if (isWork.value) await saveDoc();
    const message = await docOpen();

    filePath.value = message.filePath;

    if (window.meta2d) {
      meta2d.clear();
      meta2d.open(message.data);
    }
  }

  return {
    filePath,
    isWork,

    loadDoc, createDoc, saveDoc, openDoc, saveAsDoc, importDoc
  }
}, {
  persist: {
    key: DOC_STORE_NAME,
    storage: sessionStorage
  }
});

export function useDocStoreHook() {
  return useDocStore(store);
}
