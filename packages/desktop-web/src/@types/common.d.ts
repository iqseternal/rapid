import type { ReactNode } from 'react';

declare global {
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
