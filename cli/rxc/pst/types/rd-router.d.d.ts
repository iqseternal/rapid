import * as iconInstance from '@ant-design/icons';

type IconRealKey = Exclude<keyof typeof iconInstance, 'createFromIconfontCN' | 'default' | 'IconProvider' | 'setTwoToneColor' | 'getTwoToneColor'>;
type IconCustomKey = `icon-${string}`;
type IconKey = IconRealKey | IconCustomKey;

declare module '@rapid/libs-web' {

  export interface RouteMeta {
    /**
     * title 作为标识当前路由的作用, 并且作为菜单时作为 title 展示
     */
    title: string;

    /**
     * window 的标签页标题
     */
    windowTitle?: string;

    /**
     * 附带 icon, 因为这可能会被作为菜单渲染
     */
    icon?: IconKey;

    /**
   * 是否在菜单中隐藏
   */
    hiddenInMenu?: boolean;
  }
}
