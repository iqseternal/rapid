import { SingleInstanceService, CustomSingleInstanceService } from './SingleInstanceService';
import { ConvertService } from './ConvertService';
import { EXTENSIONS } from '@rapid/config/constants';
import type { StoreKeyMap } from '@rapid/config/constants';
import { USER_CONFIG, APP_CONFIG } from '@rapid/config/electron-main';
import ElectronStore from 'electron-store';

/** store 的标志 */
export enum APP_STORE_KEYS {
  APP_CONFIG = 'APP_CONFIG',
  USER_CONFIG = 'USER_CONFIG',

  APP_STORE = 'APP_STORE'
}

/** 枚举到 store 类型 */
export interface StoreKeyToMap {
  [APP_STORE_KEYS.APP_CONFIG]: typeof APP_CONFIG;
  [APP_STORE_KEYS.USER_CONFIG]: typeof USER_CONFIG;
  [APP_STORE_KEYS.APP_STORE]: StoreKeyMap;
}

/** 存储 name */
export const STORE_STORAGE_NAME = {
  [APP_STORE_KEYS.APP_CONFIG]: APP_STORE_KEYS.APP_CONFIG,
  [APP_STORE_KEYS.USER_CONFIG]: APP_STORE_KEYS.USER_CONFIG,
  [APP_STORE_KEYS.APP_STORE]: APP_STORE_KEYS.APP_STORE
}

/** store 存储服务 */
export class AppStore extends CustomSingleInstanceService {
  private static readonly storeMap = new Map<APP_STORE_KEYS, ElectronStore<any>>;

  /** 获取一个存储服务实例, 该实例映射到各个 electron-store */
  static override getInstance<StoreKey extends APP_STORE_KEYS>(storeKey: StoreKey): ElectronStore<StoreKeyToMap[StoreKey]> {
    if (AppStore.storeMap.has(storeKey)) return AppStore.storeMap.get(storeKey) as unknown as ElectronStore<StoreKeyToMap[StoreKey]>;

    const store = new ElectronStore<StoreKeyToMap[StoreKey]>({
      name: storeKey,
      fileExtension: EXTENSIONS.STORE.EXTENSION,
      serialize: (value) => {
        const uInt8Array = ConvertService.toUint8Array(value);
        return new ConvertService(Buffer.from(uInt8Array).toJSON().data).toString();
      },
      deserialize: (text: string) => {
        const uInt8Array = JSON.parse(text);
        return new ConvertService(Uint8Array.from(uInt8Array)).toJson<StoreKeyToMap[StoreKey]>();
      }
    });

    AppStore.storeMap.set(storeKey, store as any);

    return store;
  }
}

