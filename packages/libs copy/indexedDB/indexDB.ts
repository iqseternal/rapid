/**
 * 复写 indexedDB 的 Api，使其变成 promise 并且附带创建的表类型
 */

import { print, printError, printInfo } from '@suey/printer';
import type { IndexedDbDatabase, IndexedDBOptions, IndexedDBObjectStore } from './declare';

export class IndexedDB<DatabasesConstruct> {
  #db: IndexedDbDatabase | undefined;

  public get db() { return this.#db as unknown as IndexedDbDatabase; }
  public set db(db: IndexedDbDatabase) { this.#db = db; }

  constructor(public readonly dbOptions: IndexedDBOptions<DatabasesConstruct>) {}

  connection(upgrade?: (db: IndexedDbDatabase) => void | Promise<void>) {
    return new Promise<void>((re, rj) => {
      const request = window.indexedDB.open(this.dbOptions.dbName, this.dbOptions.dbVersion);

      const resolve = () => { this.db = request.result;re(); }
      const reject = () => { this.db = request.result;rj(); }

      request.onerror = () => reject();
      request.onupgradeneeded = async e => {
        upgrade && await upgrade(request.result);

      };

      request.onsuccess = () => resolve();
    });
  }

  transaction<
    Name extends Exclude<keyof DatabasesConstruct, number | symbol>,
    TableConstruct extends DatabasesConstruct[Name],
    Args extends Parameters<IndexedDbDatabase['transaction']>
  >(storeNames: Name | Name[], mode?: Args[1], options?: Args[2]): IndexedDBTransaction<Name, TableConstruct> {
    return new IndexedDBTransaction(this.db.transaction(storeNames, mode, options));
  }
}

export class IndexedDBTransaction<Name extends string, TableConstruct> {
  constructor(
    private readonly transaction: IDBTransaction
  ) {}

  objectStore(name: Name) {
    return new IndexedDBTable(this.transaction.objectStore(name));
  }
}

export class IndexedDBTable {
  constructor(
    private readonly objectStore: IDBObjectStore
  ) {}

  getAll<T>(...args: Parameters<typeof this.objectStore.getAll>) {
    return new Promise<T[]>((resolve, reject) => {
      const request = this.objectStore.getAll(...args);

      request.onsuccess = () => {
        resolve(request.result);
      }

      request.onerror = () => {
        reject([]);
      }
    })
  }

  create(...args: Parameters<typeof this.objectStore.add>) {
    return new Promise((resolve, reject) => {
      const request = this.objectStore.add(...args);

      request.onsuccess = () => {
        resolve(request.result);
      }

      request.onerror = () => {
        reject([])
      }
    })
  }
}
