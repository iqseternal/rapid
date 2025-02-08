import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/**
 * 从数组中提取出元素的类型
 * @example
 * type A = number[];
 * type B = ExtractElInArray<A>; // number
 */
type ExtractElInArray<T> = T extends (infer U)[] ? U : never;

/**
 * 提取列表的 entries, 在 interface {} 中, 只有值为数组类型 U[], 时会被保留, 否则不在此类型中
 * @example
 * type A = {
 *    name: string;
 *    age: number;
 *    friends: any[];
 * }
 *
 * type B = ExtractVectorEntries<A>; // { friends: any[]; }
 */
type ExtractVectorEntries<Entries> = {
  [Key in keyof Entries as (Entries[Key] extends (infer U)[] ? Key : never)]: Entries[Key];
}

interface MetadataManagerInnerStore {
  update: {}
}

class MetadataInnerZustandStoreManager {
  private readonly store = create<MetadataManagerInnerStore>()(
    immer(() => {
      return {
        update: {}
      }
    })
  )

  /**
   * 更新当前的 store, 会导致状态库的组件更新触发
   */
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

  /**
   * set Store, 在一个会触发状态库组件更新的回调函数中进行操作
   */
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
   * 定义 store 元数据, 元数据可以是任何东西
   * @example
   * metadata.defineMetadata('example-key', 1);
   * metadata.defineMetadata('example-key', 'a');
   * metadata.defineMetadata('example-key', {});
   * metadata.defineMetadata('example-key', () => { return (<div />) });
   */
  public defineMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]) {
    super.__setStore(() => {
      this.metadataMap.set(metadataKey, metadata);
    })
  }

  /**
   * 获取定义的元数据
   * @example
   * metadata.getMetadata('example-key');
   */
  public getMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): MetadataEntries[MetadataKey] | null {
    return (this.metadataMap.get(metadataKey)) ?? null;
  }

  /**
   * 删除定义的元数据
   * @example
   * metadata.delMetadata('example-key');
   */
  public delMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): void {
    super.__setStore(() => {
      this.metadataMap.delete(metadataKey);
    })
  }

  /**
   * 定义多个元数据组合的容器型元数据列表, 顾名思义, 也就是某个元数据的定义是数组时使用, 能够自动从数组中添加单个该元数据, 而不是全部覆盖
   * @example
   * metadata.defineMetadataInVector('example-key', 1);
   * metadata.defineMetadataInVector('example-key', 'a');
   * metadata.defineMetadataInVector('example-key', {});
   * metadata.defineMetadataInVector('example-key', () => { return (<div />) });
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
   * 在一组元数据集合列表中删除具体的某一个, 通常与 `defineMetadataInVector` 配套使用
   * @example
   * const data = {};
   * metadata.defineMetadataInVector('example-key', data);
   *
   * metadata.delMetadataInVector('example-key', data);
   */
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
   * @description 返回数据是注册的元数据, 如果是非 react 组件, 而是普通数据, 所以外部要监听使用变化时应当加入 effect 副作用列表
   * @example
   * const Fc = () => {
   *   const data = metadata.useMetadata('example-key');
   *   useEffect(() => {
   *     // use data
   *     // some code...
   *     return () => {
   *        // clear data use.
   *        // some code...
   *     }
   *   }, [data]);
   *   return (<div />)
   * }
   *
   * @description 使用的元数据也有可能是 react 组件
   * @example
   * const Fc = () => {
   *   const Component = metadata.useMetadata('example-key');
   *
   *   return (
   *    <div>
   *      {Component && (<Component />)}
   *    </div>
   *   )
   * }
   *
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

    /**
     * updateState
     * @description 用于更新 state, 让视图进行刷新, 但是由于 setState 需要组件已经挂载, 所以有额外的挂载判断
     * @description 改更新是有 20ms 延迟的
     */
    const updateState = useMemo(() => {
      const timeout = 20;
      let timer: number | undefined | NodeJS.Timeout = void 0;

      return () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (!normalState.isMounted) {
            // 标记需要同步
            syncState.needSync = true;
            return;
          }

          // 刷新组件 (在组件挂载时才 setState)
          setState({});
        }, timeout);
      }
    }, []);

    if (!normalState.__unsubscribe) {
      normalState.__unsubscribe = super.__subscribe(() => {
        const data = this.getMetadata(metadataKey);
        if (data !== normalState.data) {
          normalState.data = data;
          updateState();
        }
      })
    }

    useLayoutEffect(() => {
      normalState.isMounted = true;

      // 同步, 因为元数据得注册可能过早, 在当前组件都还没挂载时就已经注册
      if (syncState.needSync) updateState();

      return () => {
        normalState.isMounted = false;
        if (normalState.__unsubscribe) normalState.__unsubscribe();
        normalState.__unsubscribe = void 0;
      }
    }, []);

    return normalState.data;
  }

  /**
   * 获取到所有定义的元数据
   */
  public useAllMetadata() {
    super.__useStore();
    return this.metadataMap;
  }

  /**
   * 查看是否定义了元数据
   */
  public hasMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): boolean {
    return this.metadataMap.has(metadataKey);
  }
}
