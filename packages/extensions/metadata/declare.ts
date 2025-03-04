
/**
 * 从数组中提取出元素的类型
 * @example
 * type A = number[];
 * type B = ExtractElInArray<A>; // number
 */
export type ExtractElInArray<T> = T extends (infer U)[] ? U : never;

/**
 * 提取列表的 entries, 在 interface {} 中, 只有值为数组类型 U[], 时会被保留, 否则不在此类型中
 * @example
 * type A = {
 *    name: string;
 *    age: number;w
 *    friends: any[];
 * }
 *
 * type B = ExtractVectorEntries<A>; // { friends: any[]; }
 */
export type ExtractVectorEntries<Entries> = {
  [Key in keyof Entries as (Entries[Key] extends (infer U)[] ? Key : never)]: Entries[Key];
}

/**
 * 提取列表的 entries, 在 interface {} 中, 只有值不为数组类型 U[], 时会被保留, 否则不在此类型中
 * @description 与上一个 `ExtractVectorEntries` 相反
 * @example
 * type A = {
 *    name: string;
 *    age: number;
 *    friends: any[];
 * }
 *
 * type B = ExtractSingleEntries<A>; // { name: string;age: number; }
 */
export type ExtractSingleEntries<Entries> = {
  [Key in keyof Entries as Entries[Key] extends unknown[] ? never : Key]: Entries[Key];
}

export type MetadataAction =
  | 'Define'
  | 'Remove'
;

export type MetadataType =
  | 'Vector'
  | 'Single'
  | 'All'
;

export interface MetadataStoreListenerPayload {
  action: MetadataAction;

  type: MetadataType;

  metadataKey: number | string | symbol;

  metadata: unknown;
}

export type MetadataStoreChangeListener = (payload: MetadataStoreListenerPayload) => void;
