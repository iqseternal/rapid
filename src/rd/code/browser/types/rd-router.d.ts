import type { IconKey } from '../components/IconFont';

import '@rapid/libs-web';

declare module '@rapid/libs-web' {

  export interface RouteMeta {
    /**
     * title 作为标识当前路由的作用, 并且作为菜单时作为 title 展示
     */
    readonly title: string;

    /**
     * window 的标签页标题
     */
    readonly windowTitle?: string;

    /**
     * 附带 icon, 因为这可能会被作为菜单渲染
     */
    readonly icon?: IconKey;

    /**
     * 是否在菜单中隐藏
     */
    readonly hiddenInMenu?: boolean;
  }
}

