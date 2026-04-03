import { debounce } from 'lodash';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { toWaitPromise } from '@suey/pkg-utils';

export type RxpInnerStoreListener = () => void;

export type RxpInnerStoreDestroyListener = () => void;

/**
 * rxp 内部 store 管理机制
 */
export class RxpInnerStore {

  private readonly store = {
    value: {},
    listeners: new Set<RxpInnerStoreListener>(),
    /**
     * 是否活跃
     */
    live: true,
  };

  /**
   * 触发副作用
   */
  private triggerEffects = async () => {
    if (!this.store.live) return;

    this.store.listeners.forEach(listener => {
      if (typeof listener === 'function') listener();
    });
  };

  /**
   * 更新当前 store
   */
  public async update() {
    if (!this.store.live) return;

    this.store.value = {};
    this.triggerEffects();
  }

  /**
   * 删除某个订阅
   */
  public unsubscribe(listener: RxpInnerStoreListener) {
    if (!this.store.live) return false;
    if (typeof listener !== 'function') return false;

    return this.store.listeners.delete(listener);
  }

  /**
   * 添加订阅，当 store 被更新的时候触发副作用
   */
  public subscribe(listener: RxpInnerStoreListener): RxpInnerStoreDestroyListener {
    if (!this.store.live) return () => {};
    if (typeof listener !== 'function') return () => {};

    this.store.listeners.add(listener);
    return () => this.unsubscribe(listener);
  }

  /**
   * 销毁此个 store 管理, 被销毁后，后续的副作用操作将失效
   */
  public destroy() {
    this.store.listeners.clear();
    this.store.live = false;
  }

  /**
   * 重启当前 store
   */
  public revive() {
    this.store.live = true;
  }

  /**
   * 获得当前的订阅总数
   */
  public getListenerCount(): number {
    return this.store.listeners.size;
  }

  /**
   * 以 react 的 hook 方式，添加订阅，当 store 发生更新的时候，触发当前组件的刷新
   */
  public useValueToRenderReactComponent() {
    const [_, setState] = useState({});

    const destroySubscribe = useRef<RxpInnerStoreDestroyListener>();

    const refresh = useCallback(
      () => setState(() => ({})),
      []
    );

    useLayoutEffect(() => {
      destroySubscribe.current = this.subscribe(refresh);

      return () => {
        if (destroySubscribe.current) destroySubscribe.current();
        destroySubscribe.current = void 0;
      }
    }, []);

    return [this.store.value] as const;
  }
}
