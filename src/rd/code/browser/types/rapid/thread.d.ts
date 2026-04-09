import type { UseExtensionHeartbeatVoucher } from '@/api/extension';

declare global {

  export namespace Rapid.Thread {


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
}

export { };
