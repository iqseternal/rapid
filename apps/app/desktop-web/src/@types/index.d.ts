import type { ExposeApi } from '@rapid/desktop-preload';
import type { ReactNode } from 'react';
import type { Rapid as RA } from '../declare.d';

import type * as RPreload from 'node_modules/@rapid/desktop-preload';

declare global {
  declare namespace Rapid { export = RA; }
  /**
   * 声明 preload 线程的类型, 它向 renderer 线程暴露的 api, 以及部分扩展的类型接口
   */
  declare namespace RdPreload { export = RPreload; }

  /**
   * 扩展 Window 含有 Electron Api 声明规则
   *
   * ```tsx
   * window.electron.ipcRenderer.invoke('xxx');
   * ```
   */
  declare interface Window extends ExposeApi { }

  /**
   * 定义 `React` 组件的基本 `props`, 让 组件能够快速定义
   *
   * ```tsx
   * const Component = (props: BaseProps) => </>;
   * ```
   *
   * ```tsx
   * interface ComponentProps extends BaseProps {}
   *
   * const Component = (props: ComponentProps) => </>;
   *
   * ```
   */
  declare interface BaseProps {
    children?: ReactNode;

    className?: string;
  }
}

export {};
