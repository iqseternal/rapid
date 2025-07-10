import type { ComponentType } from 'react';
import type { AxiosResponse } from '@suey/pkg-utils';
import type { RApiBasicResponse, RApiFailResponse, RApiSuccessResponse } from 'rd/base/common/api';
import type { ThreadHandler } from 'rd/base/browser/service/Thread';
import type { UseExtensionHeartbeatVoucher } from '@/api/extension';
import type { RdCssVariablePayloadSheet } from './skin';
import type { Extension } from '@suey/rxp-meta';

import type * as RdSandbox from 'rd/code/sandbox';

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
          'functional.theme.variables.transformer': ((variables: RdCssVariablePayloadSheet) => void)[];

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
     * 应用程序的命名空间 - 此命名空间将为其他扩展环境提供编写 TS 地基础
     */
    export namespace Types {
      /**
       * 获取一个 Promise then函数的类型
       */
      export type PromiseThenCallback<Pr extends Promise<unknown>> = Parameters<Pr['then']>[0];
      /**
       * 获取一个 Promise then函数回调参数 res 的类型
       */
      export type PromiseResolvedType<Pr extends Promise<unknown>> = Parameters<Exclude<PromiseThenCallback<Pr>, null | undefined>>[0];
      /**
       * 获取一个 Promise数据 then函数回调参数 res 数组的类型
       */
      export type PromiseArrayResolvedType<PrArr extends readonly Promise<unknown>[]> = {
        readonly [Index in keyof PrArr]: PromiseResolvedType<PrArr[Index]>;
      };
      /**
       * 获取一个 Promise catch函数回调参数 res 的类型
       */
      export type PromiseCatchCallback<Pr extends Promise<unknown>> = Parameters<Pr['catch']>[0];
      /**
       * 获取一个 Promise catch函数回调参数 reason 的类型
       */
      export type PromiseCatchReasonType<Pr extends Promise<unknown>> = Parameters<Exclude<PromiseCatchCallback<Pr>, null | undefined>>[0];
      /**
       * 获取一个 Promise数据 then函数回调参数 reason 数组的类型
       */
      export type PromiseArrayCatchReasonType<PrArr extends readonly Promise<unknown>[]> = {
        readonly [Index in keyof PrArr]: PromiseCatchReasonType<PrArr[Index]>;
      };
      /**
       * 判断这个类型是否是一个 never 类型, 如果是返回第一个泛型参数, 否则返回第二个
       * @example
       *
       * type C = never;
       *
       * type TResult = IsNever<C, true, false>; // true
       *
       */
      export type IsNever<T, SuccessReturnType, FailReturnType> = T extends never ? SuccessReturnType : FailReturnType;
      /**
       * 判断这个类型是否是一个 any 类型, 如果是返回第一个泛型参数, 否则返回第二个
       *
       * @example
       * type c = any;
       * type TResult = IsAny<C, true, false>; // true
       *
       * type d = true;
       * type TResult2 = IsAny<d, true, false>; // false
       */
      export type IsAny<T, SuccessReturnType, FailReturnType> = IsNever<T, 'yes', 'no'> extends 'no' ? FailReturnType : SuccessReturnType;
      /**
       * 判断这个类型是否是一个 unknown 类型, 如果是返回第一个泛型参数, 否则返回第二个
       *
       * @example
       * type c = unknown;
       * type TResult = IsUnknown<C, true, false>; // true
       *
       * type d = true;
       * type TResult2 = IsUnknown<d, true, false>; // false
       */
      export type IsUnknown<T, SuccessReturnType, FailReturnType> = unknown extends T ? (T extends unknown ? SuccessReturnType : FailReturnType) : FailReturnType;
    }

    /**
     * RApp
     */
    export interface RApp {
      meta2d?: import('@meta2d/core').Meta2d;

      readonly Antd: typeof import('antd');
      readonly spring: typeof import('@react-spring/web');
      readonly transitionGroup: typeof import('react-transition-group');
      readonly moment: typeof import('moment');

      readonly ipcActions: RdSandbox.IpcActions;
      readonly electron: RdSandbox.ElectronAPI;
      readonly printer: RdSandbox.PrinterServer;

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
      readonly emitter: import('@rapid/libs').Emitter<Rapid.Bus.BusEmitterEntries>;

      /**
       * 带有函数返回值的事件总线功能
       */
      readonly invoker: import('@rapid/libs').Invoker<Bus.BusInvokerEntries>;

      /**
       * 全局的线程管理
       */
      readonly threads: {
        /**
         * 插件的线程化版本管理
         */
        readonly rxcThread: RdThread<Rapid.Thread.ExtensionThreadEntries, Rapid.Thread.MainThreadEntries>;
      }

      /**
       * 全局的状态管理
       */
      readonly stores: {
        readonly useUserStore: typeof import('@/features').useUserStore;
        readonly useThemeStore: typeof import('@/features').useThemeStore;
        readonly useDocStore: typeof import('@/features').useDocStore;
      }

      /**
       * 皮肤
       */
      readonly skin: {
        readonly skin: import('rd/base/browser/service/Skin').Skin<RdCssVariablePayloadSheet>;
        readonly makeRdCssVarPayload: typeof import('rd/base/browser/service/Skin').makeRdCssVarPayload;
        readonly mrcvp: typeof import('rd/base/browser/service/Skin').mrcvp;
        readonly Skin: typeof import('rd/base/browser/service/Skin').Skin;
      };

      /**
       * 国际化
       */
      readonly i18n: {
        readonly i18n: typeof import('@/i18n').default;
        readonly useTranslation: typeof import('react-i18next').useTranslation;
      }

      /**
       * 内置常量
       */
      readonly constants: {
        readonly Timestamp: typeof import('rd/base/common/constants').Timestamp;
      }

      /**
       * 提供可以公用的组件
       */
      readonly components: {
        /**
         * 文本溢出隐藏省略的组件, 当文本长度超出容器的时候, 自动展示省略号
         */
        readonly Ellipsis: typeof import('@rapid/libs-web').Ellipsis;

        /**
         * antd 与 自定义 icon 的结合组件
         */
        readonly IconFont: typeof import('@/components/IconFont').default;

        /**
         * 通用的 widget - 控件, 用于展示一个图标, 附带功能提示信息 作为系统功能图标
         */
        readonly Widget: typeof import('@/components/Widget').default;

        /**
         * 展示 -空-
         */
        readonly Empty: typeof import('@/components/Empty').default;
      }

      /**
       * 部分 service 能力
       */
      readonly services: {
        readonly Skin: typeof import('rd/base/browser/service/Skin').Skin;

        readonly Emitter: typeof import('@rapid/libs').Emitter;
        readonly Invoker: typeof import('@rapid/libs').Invoker;

        readonly ExtensionManager: typeof import('@suey/rxp-meta').ExtensionManager;
        readonly MetadataManager: typeof import('@suey/rxp-meta').MetadataManager;
      }

      /**
       * 提供基础 API-Service
       */
      readonly libs: {
        readonly injectReadonlyVariable: typeof import('@rapid/libs').injectReadonlyVariable;
        readonly createSallowProxy: typeof import('@rapid/libs').createSallowProxy;

        readonly rApiGet: typeof import('rd/base/common/api').rApiGet;
        readonly rApiPost: typeof import('rd/base/common/api').rApiPost;
        readonly rApiPut: typeof import('rd/base/common/api').rApiPut;
        readonly rApiDelete: typeof import('rd/base/common/api').rApiDelete;
        readonly rRequest: typeof import('rd/base/common/api').rRequest;
        readonly rApiPatch: typeof import('rd/base/common/api').rApiPatch;
        readonly rCreateApi: typeof import('rd/base/common/api').rCreateApi;

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

        readonly defineCompleteType: typeof import('@suey/pkg-utils').defineCompleteType;
        readonly defineRawType: typeof import('@suey/pkg-utils').defineRawType;
      }
    }
  }
}
