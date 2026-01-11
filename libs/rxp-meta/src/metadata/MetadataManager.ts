import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { ExtractSingleEntries, ExtractVectorEntries, ExtractElInArray } from './declare';
import { InnerZustandStoreManager } from '../base/InnerZustandStoreManager';

/**
 * 元数据, 在页面中组件的变化可能相距甚远
 * 进入到某一个页面, 可能其他大组件下的某处地方可能发生元素更改, 那么使用本 store 进行连携
 *
 * 1. 在可能变化的地方获取槽点数据, 可能是字符也有可能是其他的
 *
 * 2. 在特殊时机, 注册槽点数据, 从而响应式自动更新到子孙或者兄弟级甚远的组件进行渲染
 *
 */
export class MetadataManager<MetadataEntries extends Record<string, any>> extends InnerZustandStoreManager {
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
    this.metadataMap.set(metadataKey, metadata);
    super.updateStore();

    return () => {
      this.delMetadata(metadataKey);
    }
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
   * 获取元数据列表中最新注册的元数据
   */
  public getMetadataLatestInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null {
    return (this.metadataMap.get(metadataKey) ?? [])[this.metadataMap.get(metadataKey)?.length - 1] ?? null;
  }

  /**
   * 获取元数据列表中最旧注册的元数据
   */
  public getMetadataOldestInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null {
    return (this.metadataMap.get(metadataKey) ?? [])[0] ?? null;
  }

  /**
   * 删除定义的元数据
   * @example
   * metadata.delMetadata('example-key');
   */
  public delMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): void {
    if (!this.hasMetadata(metadataKey)) return;

    this.metadataMap.delete(metadataKey);
    super.updateStore();
  }

  /**
   * 语义化方法, 作用与 defineMetadata 一致. 但是在此基础上排除了数据值类型
   * @description 意为: 定义覆盖式的元数据
   */
  public defineMetadataInSingle<MetadataKey extends keyof ExtractSingleEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]) {
    this.metadataMap.set(metadataKey, metadata);
    super.updateStore();

    return () => {
      this.delMetadata(metadataKey);
    }
  }

  /**
   * 定义多个元数据组合的容器型元数据列表, 顾名思义, 也就是某个元数据的定义是数组时使用, 能够自动从数组中添加单个该元数据, 而不是全部覆盖
   * @example
   * metadata.defineMetadataInVector('example-key', 1);
   * metadata.defineMetadataInVector('example-key', 'a');
   * metadata.defineMetadataInVector('example-key', {});
   * metadata.defineMetadataInVector('example-key', () => { return (<div />) });
   */
  public defineMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>): (() => void) {
    let hasThisMetadata = false;

    if (this.hasMetadata(metadataKey)) {
      const vector = this.metadataMap.get(metadataKey);
      if (!Array.isArray(vector)) throw new Error(`defineMetadataInVector: current metadata value is not an array`);

      const newVector = vector.filter(v => {
        const isThisMetadata = (v === metadata);
        if (isThisMetadata) hasThisMetadata = true;
        return !isThisMetadata;
      });

      if (!hasThisMetadata) {
        newVector.push(metadata);

        this.metadataMap.set(metadataKey, newVector);
        super.updateStore();
      }
    } else {
      this.metadataMap.set(metadataKey, [metadata] as MetadataEntries[MetadataKey]);
      super.updateStore();
    }

    return () => this.delMetadataInVector(metadataKey, metadata);
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

    let hasThisMetadata = false;

    const vector = this.metadataMap.get(metadataKey) ?? [];
    if (!Array.isArray(vector)) throw new Error(`delMetadataInVector: current metadata value is not an array`);

    if (vector.length === 0) {
      this.metadataMap.delete(metadataKey);
      super.updateStore();
      return;
    }

    const fVector = vector.filter(v => {
      const isThisMetadata = (v === metadata);
      if (isThisMetadata) hasThisMetadata = true;
      return !isThisMetadata;
    });

    if (hasThisMetadata) {
      if (fVector.length === 0) {
        this.metadataMap.delete(metadataKey);
        super.updateStore();
        return;
      }

      this.metadataMap.set(metadataKey, fVector);
      super.updateStore();
    }
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

    const normalState = useRef({
      isMounted: false as boolean,
      data: this.getMetadata(metadataKey),
      unsubscribe: void 0 as ((() => void) | undefined),
      needSync: false as boolean
    })

    /**
     * refreshComponent
     * @description 用于更新 state, 让视图进行刷新, 但是由于 setState 需要组件已经挂载, 所以有额外的挂载判断
     * @description 改更新是有 20ms 延迟的
     */
    const refreshComponent = useCallback(() => {
      if (!normalState.current.isMounted) {
        // 标记需要同步
        normalState.current.needSync = true;
        return;
      }
      // 刷新组件 (在组件挂载时才 setState)
      setState(() => ({}));
    }, []);

    if (!normalState.current.isMounted || !normalState.current.unsubscribe) {
      if (normalState.current.unsubscribe) normalState.current.unsubscribe();

      normalState.current.data = this.getMetadata(metadataKey);
      normalState.current.unsubscribe = super.subscribe(() => {
        const data = this.getMetadata(metadataKey);
        if (data !== normalState.current.data) {
          normalState.current.data = data;
          normalState.current.needSync = false;
          refreshComponent();
        }
      })
    }

    useEffect(() => {
      normalState.current.isMounted = true;

      // 因为元数据的注册时间可能不恰当(在组件创建时, 但组件未挂载), 在当前组件都还没挂载时就已经注册
      // 所以在组件挂载后, 需要进行一次同步
      if (normalState.current.needSync) refreshComponent();

      return () => {
        normalState.current.isMounted = false;

        if (normalState.current.unsubscribe) normalState.current.unsubscribe();
        normalState.current.unsubscribe = void 0;
      }
    }, []);

    return normalState.current.data;
  }

  /**
   * 使用最先注册的元数据
   */
  public useOldestMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null {
    const metadata = this.useMetadata(metadataKey);
    if (metadata && Array.isArray(metadata)) return metadata[0] ?? null;
    return null;
  }

  /**
   * 使用最后一次注册的元数据
   */
  public useLatestMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey): ExtractElInArray<MetadataEntries[MetadataKey]> | null {
    const metadata = this.useMetadata(metadataKey);
    if (metadata && Array.isArray(metadata)) return metadata[metadata.length - 1] ?? null;
    return null;
  }

  /**
   * 获取到所有定义的元数据
   */
  public useAllMetadata() {
    super.useStoreValueToRerenderComponent();
    return this.metadataMap;
  }

  /**
   * 查看是否定义了元数据
   */
  public hasMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): boolean {
    return this.metadataMap.has(metadataKey);
  }

  /**
   * 在组件中注册元数据, 跟随当前组件生命周期, 组件卸载时自动删除
   */
  public useFollowMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]) {
    useEffect(() => {
      const destroy = this.defineMetadata(metadataKey, metadata);

      return destroy;
    }, [metadataKey, metadata]);
  }

  /**
   * 在组件中注册元数据, 跟随当前组件生命周期, 组件卸载时自动删除
   */
  public useFollowMetadataInVector<MetadataKey extends keyof ExtractVectorEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: ExtractElInArray<MetadataEntries[MetadataKey]>) {
    useEffect(() => {
      const destroy = this.defineMetadataInVector(metadataKey, metadata);
      return destroy;
    }, [metadataKey, metadata]);
  }

  /**
   * 在组件中注册元数据, 跟随当前组件生命周期, 组件卸载时自动删除
   */
  public useFollowMetadataInSingle<MetadataKey extends keyof ExtractSingleEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]) {
    useEffect(() => {
      const destroy = this.defineMetadataInSingle(metadataKey, metadata);
      return destroy;
    }, [metadataKey, metadata]);
  }
}
