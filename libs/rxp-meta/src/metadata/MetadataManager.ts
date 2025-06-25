import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import type { ExtractSingleEntries, ExtractVectorEntries, ExtractElInArray, MetadataStoreChangeListener, MetadataStoreListenerPayload } from './declare';
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
  private readonly metadataChangeListeners = new Set<MetadataStoreChangeListener>();

  /**
   * 触发元数据更改监听函数
   */
  protected triggerMetadataChangeListeners(payload: MetadataStoreListenerPayload) {
    this.metadataChangeListeners.forEach(listener => listener(payload));
  }

  /**
   * 订阅元数据更改
   */
  public subscribeMetadataStoreChanged(listener: MetadataStoreChangeListener) {
    this.metadataChangeListeners.add(listener);

    return () => {
      this.metadataChangeListeners.delete(listener);
    }
  }

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
    this.triggerMetadataChangeListeners({
      action: 'Define',
      type: 'All',
      metadataKey: metadataKey,
      metadata: metadata
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
    if (!this.hasMetadata(metadataKey)) return;

    this.metadataMap.delete(metadataKey);
    super.updateStore();
    this.triggerMetadataChangeListeners({
      action: 'Remove',
      type: 'All',
      metadataKey: metadataKey,
      metadata: this.metadataMap.get(metadataKey)
    })
  }

  /**
   * 语义化方法, 作用与 defineMetadata 一致. 但是在此基础上排除了数据值类型
   * @description 意为: 定义覆盖式的元数据
   */
  public defineMetadataInSingle<MetadataKey extends keyof ExtractSingleEntries<MetadataEntries>>(metadataKey: MetadataKey, metadata: MetadataEntries[MetadataKey]) {
    this.metadataMap.set(metadataKey, metadata);
    super.updateStore();
    this.triggerMetadataChangeListeners({
      action: 'Define',
      type: 'Single',
      metadataKey: metadataKey,
      metadata: metadata
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
      this.metadataMap.set(metadataKey, [metadata] as MetadataEntries[MetadataKey]);
      super.updateStore();
      this.triggerMetadataChangeListeners({
        action: 'Define',
        type: 'Vector',
        metadataKey: metadataKey,
        metadata: [metadata] as MetadataEntries[MetadataKey]
      })
      return;
    }

    const vector = this.metadataMap.get(metadataKey);
    if (!Array.isArray(vector)) throw new Error(`defineMetadataInVector: current metadata value is not an array`);

    const newVector = vector.filter(v => v !== metadata);
    newVector.push(metadata);

    this.metadataMap.set(metadataKey, newVector);
    super.updateStore();
    this.triggerMetadataChangeListeners({
      action: 'Define',
      type: 'Vector',
      metadataKey: metadataKey,
      metadata: newVector
    })
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

    const vector = this.metadataMap.get(metadataKey);
    if (!Array.isArray(vector)) throw new Error(`delMetadataInVector: current metadata value is not an array`);
    if (vector.length === 0) {
      this.metadataMap.delete(metadataKey);
      return;
    }

    const fVector = vector.filter(v => v !== metadata);
    if (fVector.length === 0) {
      this.metadataMap.delete(metadataKey);
      super.updateStore();
      this.triggerMetadataChangeListeners({
        action: 'Remove',
        type: 'Vector',
        metadataKey: metadataKey,
        metadata: [] as MetadataEntries[MetadataKey]
      })
      return;
    }

    this.metadataMap.set(metadataKey, fVector);
    super.updateStore();
    this.triggerMetadataChangeListeners({
      action: 'Remove',
      type: 'Vector',
      metadataKey: metadataKey,
      metadata: fVector as MetadataEntries[MetadataKey]
    })
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
      unsubscribe: void 0 as ((() => void) | undefined)
    }))

    const [syncState] = useState(() => ({
      needSync: false
    }))

    /**
     * updateState
     * @description 用于更新 state, 让视图进行刷新, 但是由于 setState 需要组件已经挂载, 所以有额外的挂载判断
     * @description 改更新是有 20ms 延迟的
     */
    const updateState = useCallback(() => {
      if (!normalState.isMounted) {
        // 标记需要同步
        syncState.needSync = true;
        return;
      }
      // 刷新组件 (在组件挂载时才 setState)
      setState({});
    }, []);

    if (!normalState.unsubscribe) {
      normalState.unsubscribe = super.subscribe(() => {
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
        if (normalState.unsubscribe) normalState.unsubscribe();
        normalState.unsubscribe = void 0;
      }
    }, []);

    return normalState.data;
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
    super.useStoreValue();
    return this.metadataMap;
  }

  /**
   * 查看是否定义了元数据
   */
  public hasMetadata<MetadataKey extends keyof MetadataEntries>(metadataKey: MetadataKey): boolean {
    return this.metadataMap.has(metadataKey);
  }
}
