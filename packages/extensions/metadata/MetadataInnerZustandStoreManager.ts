import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { MetadataStoreChangedEffect, MetadataStoreChangedPayload } from './declare';

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

  private readonly metadataChangeEffects = new Set<MetadataStoreChangedEffect>();

  protected __noticeMetadataStoreChangeEffects(payload: MetadataStoreChangedPayload) {
    this.metadataChangeEffects.forEach(effect => effect(payload));
  }

  public subscribeMetadataStoreChanged(effect: MetadataStoreChangedEffect) {
    this.metadataChangeEffects.add(effect);

    return () => {
      this.metadataChangeEffects.delete(effect);
    }
  }

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
