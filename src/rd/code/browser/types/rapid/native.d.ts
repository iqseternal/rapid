import type { ComponentType } from 'react';
import type { AxiosResponse } from '@suey/pkg-utils';
import type { RApiBasicResponse, RApiFailResponse, RApiSuccessResponse } from 'rd/base/common/api';
import type { ThreadHandler } from 'rd/base/browser/service/Thread';
import type { UseExtensionHeartbeatVoucher } from '@/api/extension';
import type { RdCssVariablePayloadSheet } from '@/skin';
import type { Extension } from '@suey/rxp-meta';

import type * as RdSandbox from 'rd/code/sandbox';

declare global {
  export namespace Rapid {

    /**
     * 系统提供的原生 api 能力
     */
    export interface Native {
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
      readonly extension: import('@suey/rxp-meta').ExtensionManager<Rapid.Extend.Extension>;

      /**
       * 元数据管理器
       */
      readonly metadata: import('@suey/rxp-meta').MetadataManager<Rapid.Extend.Metadata.MetadataEntries>;

      /**
       * 事件总线
       */
      readonly emitter: import('@rapid/bus').Emitter<Rapid.Bus.BusEmitterEntries>;

      /**
       * 带有函数返回值的事件总线功能
       */
      readonly invoker: import('@rapid/bus').Invoker<Bus.BusInvokerEntries>;

      /**
       * 全局的线程管理
       */
      readonly threads: {
        /**
         * 插件的线程化版本管理
         */
        // readonly rxcThread: RdThread<Rapid.Thread.ExtensionThreadEntries, Rapid.Thread.MainThreadEntries>;
      }

      /**
       * 全局的状态管理
       */
      readonly stores: RdSandbox.ExposeApi['stores'] & Omit<{
        readonly features: {
          readonly useUserStore: typeof import('@/features').useUserStore;
          readonly useThemeStore: typeof import('@/features').useThemeStore;
          readonly useDocStore: typeof import('@/features').useDocStore;
        }
      }, keyof RdSandbox.ExposeApi['stores']>;

      /**
       * 皮肤
       */
      readonly skin: {
        readonly skin: import('rd/base/browser/service/Skin').Skin<RdCssVariablePayloadSheet>;
        readonly makeCssVarPayload: typeof import('rd/base/browser/service/Skin').makeCssVarPayload;
        readonly mrvp: typeof import('rd/base/browser/service/Skin').mrvp;
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

        readonly Emitter: typeof import('@rapid/bus').Emitter;
        readonly Invoker: typeof import('@rapid/bus').Invoker;

        readonly ExtensionManager: typeof import('@suey/rxp-meta').ExtensionManager;
        readonly MetadataManager: typeof import('@suey/rxp-meta').MetadataManager;
      }

      /**
       * 提供基础 API-Service
       */
      readonly libs: {
        readonly injectReadonlyVariable: typeof import('@rapid/libs').injectReadonlyVariable;

        readonly reactive: typeof import('@vue/reactivity').reactive;
        readonly watch: typeof import('@vue/reactivity').watch;
        readonly effect: typeof import('@vue/reactivity').effect;
        readonly computed: typeof import('@vue/reactivity').computed;
        readonly ref: typeof import('@vue/reactivity').ref;
        readonly shallowRef: typeof import('@vue/reactivity').shallowRef;
        readonly reactiveReadArray: typeof import('@vue/reactivity').reactiveReadArray;
        readonly readonly: typeof import('@vue/reactivity').readonly;
        readonly shallowReactive: typeof import('@vue/reactivity').shallowReactive;
        readonly shallowReadonly: typeof import('@vue/reactivity').shallowReadonly;
        readonly toRaw: typeof import('@vue/reactivity').toRaw;
        readonly toReactive: typeof import('@vue/reactivity').toReactive;
        readonly toReadonly: typeof import('@vue/reactivity').toReadonly;
        readonly toRef: typeof import('@vue/reactivity').toRef;
        readonly toRefs: typeof import('@vue/reactivity').toRefs;
        readonly toValue: typeof import('@vue/reactivity').toValue;
        readonly unref: typeof import('@vue/reactivity').unref;
        readonly isRef: typeof import('@vue/reactivity').isRef;
        readonly isReactive: typeof import('@vue/reactivity').isReactive;
        readonly isReadonly: typeof import('@vue/reactivity').isReadonly;
        readonly isShallow: typeof import('@vue/reactivity').isShallow;
        readonly isProxy: typeof import('@vue/reactivity').isProxy;

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

export {};
