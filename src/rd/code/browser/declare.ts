import type { ComponentType } from 'react';
import type { ExtensionManager, MetadataManager } from '@rapid/extensions';
import { RdSKin } from '@/skin';
import { Bus } from '@rapid/libs-web';
import { useUserStore, useTldrawStore, useThemeStore, useDocStore } from './features';

// 总线
export namespace Bus {
  export type BusEvent = {

    'test': never;


  }
}

export namespace Metadata {

  /**
   * 注册元数据的入口映射关系
   */
  export interface MetadataEntries {
    /**
     * 功能 - 主题 - 变量 - 转换
     */
    'functional.theme.variables.transformer': ((variables: RdSKin.CssVariablesDeclaration) => RdSKin.CssVariablesDeclaration)[];

    /**
     * ui-header 图标展示
     */
    'ui.layout.header.icon': ComponentType;

    /**
     * ui-header-menu 菜单前展示
     */
    'ui.layout.header.menu.before': ComponentType[];

    /**
     * ui-header-menu 菜单展示
     */
    'ui.layout.header.menu.content': ComponentType[];

    /**
     * ui-header-menu 菜单后展示
     */
    'ui.layout.header.menu.after': ComponentType[];

    /**
     * ui-header 中间的核心展示
     */
    'ui.layout.header.main.content': ComponentType[];

    /**
     * ui-header控件前插槽
     */
    'ui.layout.header.controller.before': ComponentType[];

    /**
     * ui - 布局-header-控制 控件
     */
    'ui.layout.header.controller.widgets.others': ComponentType[];

    /**
     * ui-header最小化控件
     */
    'ui.layout.header.controller.widgets.min': ComponentType;

    /**
     * ui-header还原控件
     */
    'ui.layout.header.controller.widgets.reduction': ComponentType;

    /**
     * ui-header关闭控件
     */
    'ui.layout.header.controller.widgets.close': ComponentType;

    /**
     * ui-header控件后插槽
     */
    'ui.layout.header.controller.after': ComponentType[];
  }
}

export declare interface RApp {
  /**
   * 插件管理器
   */
  readonly extension: ExtensionManager;

  /**
   * 元数据管理器
   */
  readonly metadata: MetadataManager<Metadata.MetadataEntries>;

  /**
   * 主题
   */
  readonly RdSKin: typeof RdSKin;

  /**
   * 事件总线
   */
  readonly bus: Bus<Bus.BusEvent>;

  /**
   * 全局的状态管理
   */
  readonly stores: {

    readonly useUserStore: typeof useUserStore;

    readonly useTldrawStore: typeof useTldrawStore;

    readonly useThemeStore: typeof useThemeStore;

    readonly useDocStore: typeof useDocStore;
  }
}
