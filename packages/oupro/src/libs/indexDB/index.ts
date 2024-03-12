import { print, printError, printInfo } from '@suey/printer';
import type { IndexedDbDatabase, IndexedDBOptions, IndexedDBTransaction } from './index.d';

class IndexDB<DatabasesConstruct> {
  #db: IndexedDbDatabase | undefined;
  public get db() {
    if (!this.#db) {
      printError('使用db对象请先调用 connection 连接完成');
      return null as unknown as IDBDatabase;
    }
    return this.#db;
  }
  public set db(db: IDBDatabase) { this.#db = db; }

  constructor(public readonly dbOptions: IndexedDBOptions<DatabasesConstruct>) {}

  connection(upgrade?: (db: IDBDatabase) => void | Promise<void>) {
    return new Promise<void>((re, rj) => {
      const request = window.indexedDB.open(this.dbOptions.dbName, this.dbOptions.dbVersion);

      const resolve = () => { this.db = request.result;re(); }
      const reject = () => { this.db = request.result;rj(); }

      request.onerror = () => reject();
      request.onupgradeneeded = async e => {
        upgrade && await upgrade(request.result);
        request.onsuccess = () => resolve();
      };
    });
  }

  transition<
    Name extends Exclude<keyof DatabasesConstruct, number | symbol>,
    TableConstruct extends DatabasesConstruct[Name],
    Args extends Parameters<IDBDatabase['transaction']>
  >(storeNames: Name | Name[], mode?: Args[1], options?: Args[2]): IndexedDBTransaction<Name, TableConstruct> {
    return this.db.transaction(storeNames, mode, options);
  }
}

const DATABASES = {
  DATA: {
    GENERATOR_KEY: 'GENERATOR_KEY',
    NAME: 'NAME',
    AGE: 1
  },
  USER: {

  }
};

;(async () => {
  const indexedDB = new IndexDB<typeof DATABASES>({
    dbName: 'stt',
    dbVersion: 1,
    dbDatabase: DATABASES
  });

  await indexedDB.connection(db => {
    for (const key in indexedDB.dbOptions.dbDatabase) {
      const store = db.createObjectStore(key, { keyPath: 'GENERATOR_KEY', autoIncrement: true });

      store.createIndex('NAME', 'NAME', { unique: false });
      store.createIndex('AGE', 'AGE', { unique: false });
    }
  });

  const store = indexedDB.transition('DATA', 'readwrite').objectStore('DATA');

  store.put({
    GENERATOR_KEY: 's',
    NAME: 'suey',
    AGE: 1
  });

})();
