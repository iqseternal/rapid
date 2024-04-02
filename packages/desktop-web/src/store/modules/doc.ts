import { defineStore } from 'pinia';
import { reactive, watch, watchEffect, computed, ref } from 'vue';
import { setupIndexedDB, DATABASES_META2D, type TablesType } from '@/indexedDB';
import { IndexedDB } from '@rapid/libs/indexedDB';
import { isDef, isUnDef } from '@suey/pkg-utils';
import { windowClose, docOpen, docSaveAs, docSave, WindowPopup, docImport } from '@/actions';
import { EXPORTS_EXTENSIONS } from '@rapid/config/constants';

import store from '@/store';

export const DOC_STORE_NAME = 'docStore';

export const useDocStore = defineStore(DOC_STORE_NAME, () => {
  const fileName = ref<undefined | string>();
  const filePath = ref<undefined | string>();

  /** 当文件名存在,那么就表示当前正在工作区绘图 */
  const isWork = computed(() => fileName.value);

  const loadDoc = async () => {
    if (!filePath.value) return;

    const message = await docOpen(filePath.value);

    fileName.value = message.filename;
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
      const needSave = WindowPopup.confim('当前工作区还有文档,是否先保存?');
      if (needSave) await saveDoc();
    }

    fileName.value = '新建文档';
    filePath.value = void 0;
    meta2d.clear();
  }

  /** 另存为文档 */
  const saveAsDoc = () => docSaveAs(meta2d.data());

  const saveDoc = async () => {
    if (fileName.value && filePath.value) return docSave(filePath.value, meta2d.data());
    return docSaveAs(meta2d.data());
  }

  const openDoc = async () => {
    // if (isWork.value) await saveDoc();
    const message = await docOpen();

    fileName.value = message.filename;
    filePath.value = message.filePath;

    meta2d.clear();
    meta2d.open(message.data);
  }

  return {
    fileName,
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
