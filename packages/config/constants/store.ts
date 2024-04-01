/**
 * ==========================================
 * STORE key常量以及 Ipc 类型编写
 * ==========================================
 */

export class APP_STORE_KEYS {
  public static readonly WINDOW_CUSTOM_SIZE = 'WINDOW_SIZE'; // 用户调整的窗口大小
}

export interface StoreKeyMap {
  [APP_STORE_KEYS.WINDOW_CUSTOM_SIZE]: {
    width: number;
    height: number;
  };
}
