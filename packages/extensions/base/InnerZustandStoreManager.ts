
import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface InnerStore {
  update: {}
}

export type InnerStoreListener = () => void;
export type InnerStoreDestroyListener = () => void;

export class InnerZustandStoreManager {
  private readonly store = create<InnerStore>()(
    immer(() => {
      return {
        update: {}
      }
    })
  )

  private readonly listeners = new Set<InnerStoreListener>();
  private unsubscribe = () => {};

  public constructor() {
    this.unsubscribe = this.store.subscribe(() => {
      this.listeners.forEach(listener => listener());
    })
  }

  /**
   * 更新当前的 store, 会导致状态库的组件更新触发
   */
  protected updateStore() {
    this.store.setState({ update: {} });
  }

  /**
   * store hook, 只要元数据发生改变, 就会触发 zustand 的状态更新
   */
  protected useStore() {
    return this.store(store => store.update);
  }

  /**
   * 添加订阅函数
   */
  protected subscribe(listener: InnerStoreListener): InnerStoreDestroyListener {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    }
  }

  /**
   * set Store, 在一个会触发状态库组件更新的回调函数中进行操作
   */
  protected setStore(setStoreFunction: () => void) {
    setStoreFunction();
    this.updateStore();
  }

  protected destroy() {
    this.unsubscribe();
  }
}
