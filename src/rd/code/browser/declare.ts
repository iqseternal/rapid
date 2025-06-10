import type { ComponentType } from 'react';
import type { Emitter, Invoker, InvokerHandler, InvokerKey } from '@rapid/libs-web';
import type { useUserStore, useThemeStore, useDocStore } from './features';
import type { AxiosResponse } from '@suey/pkg-utils';
import type { RApiBasicResponse, RApiFailResponse, RApiSuccessResponse } from 'rd/base/common/api';
import type { Thread, ThreadHandler } from 'rd/base/browser/service/Thread';
import type { UseExtensionHeartbeatVoucher } from '@/api/extension';
import type { Meta2d } from '@meta2d/core';
import type { CssVariablesDeclaration, Skin } from 'rd/base/browser/service/Skin';
import type { RdCssVariablePayloadSheet } from './skin';
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

type RdCssVariablesDeclaration = import('rd/base/browser/service/Skin').CssVariablesDeclaration<RdCssVariablePayloadSheet>;
type RdCssVars = import('rd/base/browser/service/Skin').CssVars<RdCssVariablePayloadSheet>;
type RdThread<TThreadEntries extends Record<string, ThreadHandler>, SThreadEntries extends Record<string, ThreadHandler> = {}> = import('rd/base/browser/service/Thread').Thread<TThreadEntries, SThreadEntries>;

// ==================================================================================================

declare global {
  interface Window {
    readonly rApp: Rapid.RApp;

    readonly cssVars: Rapid.SKin.CssVars;
  }

  /**
   * 全局的 RApp 实例
   */
  const rApp: Rapid.RApp;

  /**
   * 全局的皮肤变量
   */
  const cssVars: Rapid.SKin.CssVars;

  /**
   * 应用程序的命名空间 - 此命名空间将为其他扩展环境提供编写 TS 地基础
   * 其中 RApp 为全局对象实例 - 为其他扩展环境提供功能性编写基础
   */
  export namespace Rapid {
    /**
     * Web worker 线程相关的类型定义
     */
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

    /**
     * 事件总线相关的类型定义
     */
    export namespace Bus {
      /**
       * 事件总线 Emitter 的入口映射关系
       */
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

      /**
       * 事件总线 Invoker 的入口映射关系
       */
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

    /**
     * 皮肤相关的类型定义
     */
    export namespace SKin {
      /**
       * 当前定义地 payload sheet
       */
      export type CssVariablePayloadSheet = RdCssVariablePayloadSheet;

      /**
       * 皮肤变量声明
       */
      export type CssVariablesDeclaration = RdCssVariablesDeclaration;

      /**
       * 皮肤变量
       */
      export type CssVars = RdCssVars;
    }

    /**
     * 扩展相关的类型定义
     */
    export namespace Extend {
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
          'functional.theme.variables.transformer': ((variables: CssVariablesDeclaration<RdCssVariablePayloadSheet>) => CssVariablesDeclaration<RdCssVariablePayloadSheet>)[];

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

    /**
     * RApp
     */
    export interface RApp {
      /**
       * 插件管理器
       */
      readonly extension: import('@suey/rxp-meta').ExtensionManager<Extend.Extension>;

      /**
       * 元数据管理器
       */
      readonly metadata: import('@suey/rxp-meta').MetadataManager<Extend.Metadata.MetadataEntries>;

      /**
       * 事件总线
       */
      readonly emitter: Emitter<Bus.BusEmitterEntries>;

      /**
       * 带有函数返回值的事件总线功能
       */
      readonly invoker: Invoker<Bus.BusInvokerEntries>;

      /**
       * 全局的线程管理
       */
      readonly threads: {
        /**
         * 插件的线程化版本管理
         */
        readonly rxcThread: RdThread<Thread.ExtensionThreadEntries, Thread.MainThreadEntries>;

      }

      meta2d?: Meta2d;

      /**
       * 全局的状态管理
       */
      readonly stores: {

        readonly useUserStore: typeof useUserStore;

        readonly useThemeStore: typeof useThemeStore;

        readonly useDocStore: typeof useDocStore;
      }

      /**
       * 皮肤
       */
      readonly skin: Skin<RdCssVariablePayloadSheet>;

      readonly libs: {
        readonly injectReadonlyVariable: typeof import('@rapid/libs').injectReadonlyVariable;
        readonly createSallowProxy: typeof import('@rapid/libs').createSallowProxy;

        readonly apiGet: typeof import('@rapid/libs').apiGet;
        readonly apiPost: typeof import('@rapid/libs').apiPost;
        readonly apiPut: typeof import('@rapid/libs').apiPut;
        readonly apiDelete: typeof import('@rapid/libs').apiDelete;
        readonly request: typeof import('@rapid/libs').request;
        readonly createApiRequest: typeof import('@rapid/libs').createApiRequest;
        readonly createRequest: typeof import('@rapid/libs').createRequest;

        readonly aesEncrypt: typeof import('@rapid/libs').aesEncrypt;
        readonly aesDecrypt: typeof import('@rapid/libs').aesDecrypt;
        readonly aesEncryptAlgorithm: typeof import('@rapid/libs').aesEncryptAlgorithm;
        readonly aesDecryptAlgorithm: typeof import('@rapid/libs').aesDecryptAlgorithm;
        readonly AES_DEFAULT_KEY: typeof import('@rapid/libs').AES_DEFAULT_KEY;
        readonly jose: typeof import('@rapid/libs').jose;
        readonly cryptoTs: typeof import('@rapid/libs').cryptoTs;
        readonly jsr: typeof import('@rapid/libs').jsr;

        readonly toNil: typeof import('@rapid/libs').toNil;
        readonly toNils: typeof import('@rapid/libs').toNils;
        readonly toWaitPromise: typeof import('@rapid/libs').toWaitPromise;

        readonly Ansi: typeof import('@rapid/libs').Ansi;

        readonly classnames: typeof import('@rapid/libs-web').classnames;

        readonly isReactClassComponent: typeof import('@rapid/libs-web').isReactClassComponent;
        readonly isReactComponent: typeof import('@rapid/libs-web').isReactComponent;
        readonly isReactForwardFC: typeof import('@rapid/libs-web').isReactForwardFC;
        readonly isReactMemoFC: typeof import('@rapid/libs-web').isReactMemoFC;
        readonly isReactFC: typeof import('@rapid/libs-web').isReactFC;
        readonly isReactLazyFC: typeof import('@rapid/libs-web').isReactLazyFC;

        readonly Skin: typeof Skin;

        readonly Emitter: typeof Emitter;
        readonly Invoker: typeof Invoker;

        readonly ExtensionManager: typeof import('@suey/rxp-meta').ExtensionManager;
        readonly MetadataManager: typeof import('@suey/rxp-meta').MetadataManager;
      }
    }
  }
}
