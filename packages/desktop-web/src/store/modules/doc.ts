import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { docOpen, docSaveAs, docSave, WindowPopup, docImport } from '@/actions';
import { EXPORTS_EXTENSIONS } from '@rapid/config/constants';
import { getMeta2dData } from '@meta/actions';
import { useRoute } from 'vue-router';
import { workbenchesRoute } from '@pages/index/router/modules';

import { useDataStateHook } from '@meta/useProps';
import { useGlobalStatusStateHook } from '@/state/modules';
import { useMetaStateHook } from '@meta/useMetaState';
import store from '@/store';

const { metaState } = useMetaStateHook();
const { dataState } = useDataStateHook();
const { globalStatusState, widthLoadingLife } = useGlobalStatusStateHook();

export const DOC_STORE_NAME = 'docStore';

export const useDocStore = defineStore(DOC_STORE_NAME, () => {
  const route = useRoute();

  const filePath = ref<undefined | string>();

  /** 当文件名存在,那么就表示当前正在工作区绘图 */
  const isWork = computed(() => {
    return metaState.isSetup && route.path === workbenchesRoute.meta.fullpath;
  });

  const loadDoc = async () => {
    if (!filePath.value) return createDoc();
    const message = await docOpen(filePath.value);

    filePath.value = message.filePath;
    meta2d.clear();
    meta2d.open(message.data.data);
    meta2d.setOptions(message.data.options);
  }

  const importDoc = async () => {
    if (isWork.value) {
      const needSave = WindowPopup.confirm('当前工作区还有文档,是否先保存?');
      if (needSave) await saveDoc();
    }

    const message = await docImport(EXPORTS_EXTENSIONS.JSON);


    filePath.value = '导入文档';
    filePath.value = void 0;

    meta2d.clear();
    meta2d.open(message.data);
    meta2d.setOptions(message.options);
  }

  const createDoc = async () => {
    if (isWork.value) {
      // const needSave = WindowPopup.confirm('当前工作区还有文档,是否先保存?');
      // if (needSave) await saveDoc();
    }

    filePath.value = void 0;

    if (window.meta2d) meta2d.clear();
  }

  /** 另存为文档 */
  const saveAsDoc = async () => {
    if (window.meta2d && isWork.value) {
      return docSaveAs({
        data: getMeta2dData(),
        options: meta2d.getOptions()
      });
    }

    return Promise.reject();
  }

  const saveDoc = async () => {
    if (window.meta2d && isWork.value) {
      if (filePath.value) return docSave(filePath.value, {
        data: getMeta2dData(),
        options: meta2d.getOptions()
      });

      return saveAsDoc();
    }

    return Promise.reject();
  }

  const openDoc = async () => {
    // if (isWork.value) await saveDoc();
    const message = await docOpen();

    filePath.value = message.filePath;
    meta2d.clear();
    meta2d.open(message.data.data);
    meta2d.setOptions(message.data.options);
  }

  return {
    filePath,
    isWork,

    loadDoc: widthLoadingLife(loadDoc),
    createDoc: widthLoadingLife(createDoc),
    saveDoc: widthLoadingLife(saveDoc),
    openDoc: widthLoadingLife(openDoc),
    saveAsDoc: widthLoadingLife(saveAsDoc),
    importDoc: widthLoadingLife(importDoc)
  }
}, {
  persist: {
    key: DOC_STORE_NAME,
    storage: sessionStorage
  }
});

export function clearDocStore() {
  sessionStorage.removeItem(DOC_STORE_NAME);
}

export function useDocStoreHook() {
  return useDocStore(store);
}
