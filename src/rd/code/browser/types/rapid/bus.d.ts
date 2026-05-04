import type { AxiosResponse } from '@suey/pkg-utils';
import type { RApiBasicResponse, RApiFailResponse, RApiSuccessResponse } from 'rd/base/base/api';

declare global {

  /**
   * 事件总线相关的类型定义
   */
  export namespace Rapid.Bus {
    /**
     * 事件总线 Emitter 的入口映射关系
     */
    export type BusEmitterEntries = {
      'react-app-first-rendered': void;
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
}

export {};
