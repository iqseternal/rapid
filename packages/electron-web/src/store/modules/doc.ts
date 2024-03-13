import { defineStore } from 'pinia';
import { reactive, watch, watchEffect, computed, ref } from 'vue';
import { setupIndexedDB, DATABASES_META2D, type TablesType } from '@/indexedDB';
import { IndexedDB } from '@rapid/libs/indexedDB';
import { windowClose } from '@/actions';
import { isDef, isUnDef } from '@suey/pkg-utils';

import store from '@/store';

export const DOC_STORE_NAME = 'docStore';

export const useDocStore = defineStore(DOC_STORE_NAME, () => {
  let indexedDB = void 0 as unknown as IndexedDB<TablesType>;

  const currentId = ref<number | undefined>(void 0);
  const isWork = computed(() => isDef(currentId.value));

  const setDocId = (id: number | undefined) => {
    currentId.value = id;
  }


  const initIndexedFn = <Args extends unknown[], R>(fn: (...args: Args) => R) => {
    return async (...args: Args): Promise<R> => {
      if (!indexedDB) {
        const indexed = await setupIndexedDB();
        if (!indexed) {
          windowClose();
          throw new Error();
        }
        indexedDB = indexed;
      }
      return fn(...args);
    }
  }

  const createDoc = initIndexedFn(() => {
    const objectStore = indexedDB.transaction(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT, 'readwrite').objectStore(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT);

    const data = {
      id: 2
    }

    const promi = objectStore.create(data);

    return promi as Promise<typeof data>;
  })
  const deleteDoc = initIndexedFn(() => {

  })
  const putDocData = initIndexedFn((id: number) => {

  })

  return {
    currentId,
    isWork,

    setDocId,

    createDoc, deleteDoc, putDocData
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
