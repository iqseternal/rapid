import { CustomSingleInstanceService } from './SingleInstanceService';
import { ConvertService } from './ConvertService';

import ElectronStore from 'electron-store';

/**
 * 创建 AppStore 实例的配置选项
 */
export interface AppStoreOptions {
  fileName: string,
  fileExtension: string;
}

/** store 存储服务 */
export class AppStore extends CustomSingleInstanceService {
  private static readonly storeMap = new Map<string, any>();

  /** 获取一个存储服务实例, 该实例映射到各个 electron-store */
  public static override getInstance<StoreType extends {}>(storeKey: string, options: AppStoreOptions): ElectronStore<StoreType> {
    if (AppStore.storeMap.has(storeKey)) return AppStore.storeMap.get(storeKey) as ElectronStore<StoreType>;

    const { fileName, fileExtension } = options;

    const newStore = new ElectronStore<StoreType>({
      name: fileName,
      fileExtension,
      /**
       * 序列化
       * 1. 将 value 转为 uint8Array
       *
       */
      serialize: (value) => {
        const uInt8Array = ConvertService.toUint8Array(value);
        return new ConvertService(Buffer.from(uInt8Array).toJSON().data).toString();
      },
      /**
       * 反序列化
       */
      deserialize: (text: string) => {
        const uInt8Array = ConvertService.toJson<number[], string>(text);
        return new ConvertService(Uint8Array.from(uInt8Array)).toJson<StoreType>();
      }
    });

    AppStore.storeMap.set(storeKey, newStore);

    return newStore;
  }
}

