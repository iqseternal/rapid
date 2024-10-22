import type { ExposeApi } from '@rapid/desktop-preload';
import type { ReactNode } from 'react';
import type { Rapid as RA } from '../declare.d';

declare global {
  declare namespace Rapid {
    export = RA;
  }

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
