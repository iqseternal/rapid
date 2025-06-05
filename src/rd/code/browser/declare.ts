import type { ComponentType } from 'react';
import type { Extension, ExtensionManager, MetadataManager } from '@suey/rxp-meta';
import type { RdSKin } from '@/skin';
import type { Emitter, Invoker, InvokerHandler, InvokerKey } from '@rapid/libs-web';
import type { useUserStore, useTldrawStore, useThemeStore, useDocStore } from './features';
import type { AxiosResponse } from '@suey/pkg-utils';
import type { RApiBasicResponse, RApiFailResponse, RApiSuccessResponse } from 'rd/base/common/api';
import type { Thread } from 'rd/base/browser/service/Thread';
import type { UseExtensionHeartbeatVoucher } from '@/api/extension';
import type { Meta2d } from '@meta2d/core';

export namespace Thread {

  export type MainThreadEntries = {
    'rxc:extension-changed': (data: number[]) => void;
  }

  export type ExtensionThreadEntries = {
    /**
     * 启动线程任务、开启插件的心跳检查
     */
    'rxc-thread-start-extension-heartbeat': () => void;

    /**
     * 终止线程任务、关闭插件的心跳检查
     */
    'rxc-thread-terminate-extension-heartbeat': () => void;

    /**
     * 向线程中同步插件的信息
     */
    'rxc-thread-sync-extensions-info': (voucher: UseExtensionHeartbeatVoucher[]) => void;
  }
}

export namespace Bus {
  export type BusEmitterEntries = {
    /**
     * 启动任务 - rxc 插件心跳检查
     */
    'task:start-rxc-extension-heartbeat': () => void;

    /**
     * 终止任务 - rxc 插件心跳检查
     */
    'task:terminate-rxc-extension-heartbeat': () => void;
  }

  export type BusInvokerEntries = {
    /**
     * api-err 分发器
     */
    'r-api-err-distributor': (response: AxiosResponse<RApiSuccessResponse, RApiFailResponse>) => Promise<RApiBasicResponse>;

    /**
     * rx-api-err: 资源访问没有权限
     */
    'r-api-err:unauthorized-resource': (response: AxiosResponse<RApiSuccessResponse, RApiFailResponse>) => Promise<RApiBasicResponse>;

    /**
     * rx-api-err: 用户凭证访问没有权限
     */
    'r-api-err:unauthorized-credential': (response: AxiosResponse<RApiSuccessResponse, RApiFailResponse>) => Promise<RApiBasicResponse>;

    /**
     * invoker: 获取 store access_token
     */
    'data-getter:from-store:access-token': () => Promise<string | null>;

    /**
     * invoker: 获取 store refresh_token
     */
    'data-getter:from-store:refresh-token': () => Promise<string | null>;
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

    /**
     * ui-navigation 导航条
     */
    'ui.layout.navigation.bar.content': ComponentType[];
  }
}

export interface RExtensionContext {

}

export interface RExtension extends Extension<never> {
  meta?: {
    extension_id: number;
    extension_name: string;
    extension_uuid: string;
    extension_version_id: number;
    script_hash: string;
  }
}

export declare interface RApp {
  /**
   * 插件管理器
   */
  readonly extension: ExtensionManager<RExtension>;

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
  readonly emitter: Emitter<Bus.BusEmitterEntries>;

  /**
   * 带有函数返回值的事件总线功能
   */
  readonly invoker: Invoker<Bus.BusInvokerEntries>;

  /**
   * 全局的状态管理
   */
  readonly stores: {

    readonly useUserStore: typeof useUserStore;

    readonly useTldrawStore: typeof useTldrawStore;

    readonly useThemeStore: typeof useThemeStore;

    readonly useDocStore: typeof useDocStore;
  }

  /**
   * 全局的线程管理
   */
  readonly threads: {
    /**
     * 插件的线程化版本管理
     */
    readonly rxcThread: Thread<Thread.ExtensionThreadEntries, Thread.MainThreadEntries>;

  }

  meta2d?: Meta2d;
}
