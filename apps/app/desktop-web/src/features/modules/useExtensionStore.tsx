import { RegisterPoints } from '../../libs/extensions/RegisterPoints';
import { produce } from 'immer';
import type { ReactNode } from 'react';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { bus } from '../../libs/events';

export interface Extension {
  /**
   * 插件的唯一标识 name
   */
  name: string;
  /**
   * 插件被注册
   */
  onRegistered(): void;
  /**
   * 插件被激活, 被使用的状态
   */
  onActivate(): void;
  /**
   * 插件更新
   */
  onUpdated(): void;
  /**
   * 插件被禁用
   */
  onDisabled(): void;
  /**
   * 插件被卸载
   */
  onUnregistered(): void;
  /**
   * 插件的视图渲染函数, 在不同的注册点可能具有不同的使用方式
   */
  render(): ReactNode;
}

export interface ExtensionStore {
  registerPointPlugins: Map<RegisterPoints, Extension[]>;
}

export const useExtensionStore = create<ExtensionStore>()(persist(immer((set, get, store) => ({

  registerPointPlugins: new Map()

})), {
  name: 'themeStore',
  storage: createJSONStorage(() => window.sessionStorage)
}));


export const registerExtension = () => {

}


export const initPlugins = (...plugins: Extension[]) => {


}
