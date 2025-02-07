import { useLayoutEffect, useState } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ExtractElInArray<T> = T extends (infer U)[] ? U : never;

export type ExtractVectorEntries<Entries> = {
  [Key in keyof Entries as (Entries[Key] extends (infer U)[] ? Key : never)]: Entries[Key];
}

export interface MetadataManagerInnerStore {
  update: {}
}

export class MetadataInnerZustandStoreManager {
  private readonly store = create<MetadataManagerInnerStore>()(
    immer(() => {
      return {
        update: {}
      }
    })
  )

  protected __updateStore() {
    this.store.setState({ update: {} });
  }

  /**
   * store hook, 只要元数据发生改变, 就会触发 zustand 的状态更新
   */
  protected __useStore() {
    return this.store(store => store.update);
  }

  /**
   * 添加订阅函数
   */
  protected __subscribe(listener: () => void): (() => void) {
    return this.store.subscribe(listener);
  }

  protected __setStore(setStoreFunction: () => void) {
    setStoreFunction();
    this.__updateStore();
  }
}

/**
 * 元数据, 在页面中组件的变化可能相距甚远
 * 进入到某一个页面, 可能其他大组件下的某处地方可能发生元素更改, 那么使用本 store 进行连携
 *
 * 1. 在可能变化的地方获取槽点数据, 可能是字符也有可能是其他的
 *
 * 2. 在特殊时机, 注册槽点数据, 从而响应式自动更新到子孙或者兄弟级甚远的组件进行渲染
 *
 */
export class MetadataManager<MetadataEntries extends {}> extends MetadataInnerZustandStoreManager {
  private readonly metadataMap = new Map<string | number | symbol, any>();

  /**
   * 定义 store 元数据
   */
  public defineMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]) {
    super.__setStore(() => {
      this.metadataMap.set(metadataKey, metadata);
    })
  }

  /**
   * 定义多个元数据组合的容器型元数据列表
   */
  public defineMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>) {
    if (!this.hasMetadata(metadataKey)) {
      this.defineMetadata(metadataKey, [metadata] as MetadataEntries[MetadataKey]);
      return;
    }

    const vector = this.metadataMap.get(metadataKey)!;
    if (!Array.isArray(vector)) {
      throw new Error(`defineMetadataInVector: current metadata value is not an array`);
    }

    // 已经注册
    if (vector.some(v => v === metadata)) return;

    vector.push(metadata);
    this.defineMetadata(metadataKey, vector as MetadataEntries[MetadataKey]);
    super.__updateStore();
  }

  /**
   * 获取定义的元数据
   */
  public getMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): MetadataEntries[MetadataKey] | null {
    return (this.metadataMap.get(metadataKey)) ?? null;
  }

  /**
   * 删除定义的元数据
   */
  public delMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): void {
    super.__setStore(() => {
      this.metadataMap.delete(metadataKey);
    })
  }

  public delMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>): void {
    if (!this.hasMetadata(metadataKey)) return;

    const vector = this.metadataMap.get(metadataKey)!;
    if (!Array.isArray(vector)) {
      throw new Error(`delMetadataInVector: current metadata value is not an array`);
    }

    if (vector.length === 0) {
      this.delMetadata(metadataKey);
      return;
    }

    const fVector = vector.filter(v => v !== metadata);
    if (fVector.length === 0) {
      this.delMetadata(metadataKey);
      return;
    }

    this.defineMetadata(metadataKey, fVector as MetadataEntries[MetadataKey]);
  }

  /**
   * 组件 hook, 观察元数据变化
   */
  public useMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): MetadataEntries[MetadataKey] | null {
    const [_, setState] = useState({});

    const [normalState] = useState(() => ({
      isMounted: false,
      data: this.getMetadata(metadataKey),
      __unsubscribe: void 0 as ((() => void) | undefined)
    }))

    const [syncState] = useState(() => ({
      needSync: false
    }))

    if (!normalState.__unsubscribe) {
      normalState.__unsubscribe = super.__subscribe(() => {
        const data = this.getMetadata(metadataKey);
        if (data !== normalState.data) {
          normalState.data = data;

          if (!normalState.isMounted) {
            // 标记需要同步
            syncState.needSync = true;
            return;
          }

          // 刷新组件 (在组件挂载时才 setState)
          setState({});
        }
      })
    }

    useLayoutEffect(() => {
      normalState.isMounted = true;

      // 同步, 因为元数据得注册可能过早, 在当前组件都还没挂载时就已经注册
      if (syncState.needSync) setState({});

      return () => {
        normalState.isMounted = false;
        if (normalState.__unsubscribe) normalState.__unsubscribe();
        normalState.__unsubscribe = void 0;
      }
    }, []);

    return normalState.data;
  }

  /**
   * 查看是否定义了元数据
   */
  public hasMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): boolean {
    return this.metadataMap.has(metadataKey);
  }
}
