import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { ExtensionManager, MetadataManager, Extension } from '@rapid/extensions';
import { RdSKin } from '@/skin';

/**
 * 总线
 */
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

    'ui.layout.header.icon': ComponentType;

    'ui.layout.header.menu.before': ComponentType[];
    'ui.layout.header.menu.content': ComponentType[];
    'ui.layout.header.menu.after': ComponentType[];

    'ui.layout.header.main.content': ComponentType[];

    'ui.layout.header.controller.before': ComponentType[];

    /**
     * ui - 布局-header-控制 控件
     */
    'ui.layout.header.controller.widgets.others': ComponentType[];

    'ui.layout.header.controller.widgets.min': ComponentType;
    'ui.layout.header.controller.widgets.reduction': ComponentType;
    'ui.layout.header.controller.widgets.close': ComponentType;

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

  readonly RdSKin: typeof RdSKin;
}
