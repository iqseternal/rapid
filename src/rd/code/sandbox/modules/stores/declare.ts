/**
 * 应用的 store 类型
 */
export interface IpcStore<StoreSheet extends Record<string | number, any>> {
  /**
   * 获取应用的 store
   */
  getStore: () => Promise<StoreSheet>;

  /**
   *
   */
  get: <Key extends keyof StoreSheet>(key: Key, defaultValue?: StoreSheet[Key]) => Promise<StoreSheet[Key]>;

  /**
   *
   */
  set: <Key extends keyof StoreSheet>(key: Key, value: StoreSheet[Key]) => Promise<void>;

  /**
   *
   */
  delete: <Key extends keyof StoreSheet>(key: Key) => Promise<void>;

  /**
   *
   */
  has: <Key extends keyof StoreSheet>(key: Key) => Promise<boolean>;

  /**
   *
   */
  reset: <Key extends keyof StoreSheet>(...keys: Key[]) => Promise<void>;

  /**
   *
   */
  clear: () => Promise<void>;
}
