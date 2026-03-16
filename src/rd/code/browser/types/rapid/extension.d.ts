import type { ComponentType } from 'react';
import type { RdCssVariablePayloadSheet } from '@/skin';
import type { Extension } from '@suey/rxp-meta';

// ==================================================================================================
// ===== WHY TO THIS
// ===== 对已有的类型进行别名定义 - 如果不别名定义会导致 Rapid 域中具有重复的标识符, 会导致 tsup 解析声明出现冲突错误
// ==================================================================================================
interface RdExtension extends Extension<never> {
  meta?: {
    extension_id: number;
    extension_name: string;
    extension_uuid: string;
    extension_version_id: number;
    script_hash: string;
  }
}

declare global {

  /**
   * 扩展相关的类型定义
   */
  export namespace Rapid.Extend {
    /**
     * 扩展的元数据
     */
    export namespace Metadata {

      /**
       * 注册元数据的入口映射关系
       */
      export interface MetadataEntries {
        /**
         * 功能 - 主题 - 变量 - 转换
         */
        'functional.theme.variables.transformer': ((variables: RdCssVariablePayloadSheet) => void)[];

        /**
         * 功能 - meta2d - 注册
         */
        'functional.meta2d.lifecycle.registered': ((meta2d: import('@meta2d/core').Meta2d) => void)[];

        /**
         * 功能 - meta2d - 卸载
         */
        'functional.meta2d.lifecycle.unregistered': ((meta2d: import('@meta2d/core').Meta2d) => void)[];

        // =====================================================================================================
        // =====================================================================================================
        // =====================================================================================================

        /**
         * ui-header 图标展示
         */
        'ui.layout.header.icon': ComponentType[];

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
        'ui.layout.header.controller.widgets.min': ComponentType[];

        /**
         * ui-header还原控件
         */
        'ui.layout.header.controller.widgets.reduction': ComponentType[];

        /**
         * ui-header关闭控件
         */
        'ui.layout.header.controller.widgets.close': ComponentType[];

        /**
         * ui-header控件后插槽
         */
        'ui.layout.header.controller.after': ComponentType[];

        /**
         * ui-navigation 导航条
         */
        'ui.layout.navigation.bar.content': ComponentType[];
      }
    }

    /**
     * 扩展的上下文
     */
    export interface ExtensionContext {

    }

    /**
     * 扩展
     */
    export interface Extension extends RdExtension { }
  }
}

export { };
