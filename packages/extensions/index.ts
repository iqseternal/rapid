import type { ReactNode, PropsWithChildren, PropsWithRef } from 'react';

export interface ExtensionContext {

}

export interface Extension {
  /**
   * 插件的唯一标识 name
   */
  name: string;
  /**
   * 插件被注册
   */
  onRegistered?: () => void;
  /**
   * 插件被激活, 被使用的状态
   */
  onActivate?: () => void;
  /**
   * 插件更新
   */
  onUpdated?: () => void;
  /**
   * 插件被禁用
   */
  onDisabled?: () => void;
  /**
   * 插件被卸载
   */
  onUnregistered?: () => void;
  /**
   * 插件的视图渲染函数, 在不同的注册点可能具有不同的使用方式
   */
  render?: (props: PropsWithChildren) => ReactNode;
}

export const rapid = {


  extension: {

    registerCommand() {


    },


    registerPoint(point: string, callback: () => void) {


    }

  }
}

export const createExtensionFactory = (factory: (context: ExtensionContext) => Extension) => {

}
