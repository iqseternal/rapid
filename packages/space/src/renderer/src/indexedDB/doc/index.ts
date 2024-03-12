import { DATABASES_META2D } from '#constants/indexDB';
import { setupIndexedDB, setupObjectStore } from '../base';

/**
 * 建立一个文档 objectStore
 * @returns
 */
export async function docObjectStore() {
  return setupObjectStore(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT);
}

/**
 * 获得文档的所有list
 * @param filter
 * @returns
 */
export async function getDocsAllList<T>(filter: (e: T, index: number, arr: T[]) => boolean = () => true) {
  const objectStore = await docObjectStore();
  const res = await objectStore.getAll<T>();

  return res.filter((e, index, arr) => filter(e, index, arr));
}

