import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

/**
 * 内部的 store, 用于更新状态来通知更新 UI
 */
export interface InnerStore {
  /**
   * 对应的更新数据
   */
  update: {}
}

/**
 * 监听 store 的触发回调函数
 */
export type InnerStoreListener = () => void;

/**
 * 销毁 store 的触发回调函数
 */
export type InnerStoreDestroyListener = () => void;

/**
 * 内部 store manager
 */
export abstract class InnerZustandStoreManager {
  /**
   * zustand
   */
  private readonly store = create<InnerStore>()(
    immer(() => {
      return {
        update: {}
      }
    })
  );

  private readonly listeners = new Set<InnerStoreListener>();
  private readonly unsubscribe = this.store.subscribe(() => {
    this.listeners.forEach(listener => listener());
  });

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

  protected destroy() {
    this.unsubscribe();
  }
}
