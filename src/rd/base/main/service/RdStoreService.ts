import ElectronStore from 'electron-store';
import Pako from 'pako';

/**
 * 创建 AppStore 实例的配置选项
 */
export interface RdStoreServiceOptions<StoreType extends Record<string, any>> extends Omit<ElectronStore.Options<StoreType>, 'serialize' | 'deserialize'> {

}

/**
 * store 存储服务
 */
export class RdStoreService {
  private static readonly storeMap = new Map<string, any>();

  /**
   * 获取一个存储服务实例, 该实例映射到各个 electron-store
   */
  public static getInstance<StoreType extends Record<string, any>>(storeKey: string, options: RdStoreServiceOptions<StoreType>): ElectronStore<StoreType> {
    if (RdStoreService.storeMap.has(storeKey)) return RdStoreService.storeMap.get(storeKey) as ElectronStore<StoreType>;

    const newStore = new ElectronStore<StoreType>({
      ...options,

      serialize: (value) => {
        // 压缩数据
        const data = Pako.deflate(JSON.stringify(value));

        // 转为二进制字符串
        return Buffer.from(data).toString('binary');
      },
      deserialize: (text: string) => {
        if (text.trim() === '') return {};

        // 转换二进制字符串为 Uint8Array
        const compressed = Uint8Array.from(Buffer.from(text, 'binary'));

        try {
          // 解压数据
          const decompressed = Pako.inflate(compressed, { to: 'string' });

          // 转为 JSON
          return JSON.parse(decompressed);
        } catch {
          return {};
        }
      }
    });

    RdStoreService.storeMap.set(storeKey, newStore);

    return newStore;
  }
}

