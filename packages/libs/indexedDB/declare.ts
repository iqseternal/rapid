


export interface IndexedDBOptions<T> {
  dbName: string;
  dbVersion: number;
}

export type IndexedDbDatabase = IDBDatabase;

export type IndexedDBObjectStore<TableConstruct> = Omit<IDBObjectStore, 'add'> & {
  add(value: TableConstruct, key?: IDBValidKey): IDBRequest<IDBValidKey>;
};

export type IndexedDBTransaction<Name, TableConstruct> = Omit<IDBTransaction, 'objectStore'> & {
  objectStore(name: Name): IndexedDBObjectStore<TableConstruct>;
};


