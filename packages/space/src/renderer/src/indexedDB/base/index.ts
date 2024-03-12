import { IndexedDB } from '@rapid/libs/indexedDB';
import type { TablesType } from '#constants/indexDB';
import { DATABASES_META2D, TABLES } from '#constants/indexDB';
import type { IndexedDbDatabase } from '@rapid/libs/indexedDB';

let indexedDB: IndexedDB<TablesType> | undefined = void 0;

/**
 * 为当前项目建立一个indexedDB对象
 * @returns
 */
export async function setupIndexedDB() {
  if (indexedDB) return Promise.resolve(indexedDB);

  indexedDB = new IndexedDB<TablesType>({
    dbName: DATABASES_META2D.DATABASES_NAME,
    dbVersion: DATABASES_META2D.DATABASES_VERSION
  });

  return new Promise<IndexedDB<TablesType>>((resolve, reject) => {
    if (!indexedDB) return reject(null);

    indexedDB.connection((db) => {
      const documentStore = db.createObjectStore(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT, {
        keyPath: TABLES.TABLE_DOCUMENT.META_2D_DOC_NAME
      });

      documentStore.createIndex(TABLES.TABLE_DOCUMENT.CREAT_AT, TABLES.TABLE_DOCUMENT.CREAT_AT, { unique: false });
      documentStore.createIndex(TABLES.TABLE_DOCUMENT.EDIT_AT, TABLES.TABLE_DOCUMENT.EDIT_AT, { unique: false });
      documentStore.createIndex(TABLES.TABLE_DOCUMENT.META_2D_DOC_NAME, TABLES.TABLE_DOCUMENT.META_2D_DOC_NAME, { unique: false });
      documentStore.createIndex(TABLES.TABLE_DOCUMENT.META_2D_DATA, TABLES.TABLE_DOCUMENT.META_2D_DATA, { unique: false });
    })
      .then(() => resolve(indexedDB as IndexedDB<TablesType>))
      .catch(() => reject(null))
  })
}

/**
 * 建立一个objectStore
 * @param tableName
 * @param mode
 * @returns
 */
export async function setupObjectStore<T extends keyof typeof DATABASES_META2D.TABLES_NAMES, Mode extends Parameters<IndexedDbDatabase['transaction']>>(tableName: T, mode?: Mode[1]) {
  const indexedDB = await setupIndexedDB();

  const objectStore = indexedDB.transaction(tableName, mode).objectStore(tableName);

  return objectStore;
}
