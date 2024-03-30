import { ipcMain } from 'electron';
import type { IpcMainInvokeEvent } from 'electron';
import { IS_DEV } from '@rapid/config/constants';
import { Printer } from '../core';
import type { SetupOptions, DescendantClass } from '../core';

import { IPC_META_CONTROLLER, IPC_META_HANDLER, IPC_EMITTER_TYPE } from './decorator';

export abstract class FrameworkIpcHandler {
  public abstract readonly id: string;
}

/**
 * ipc 局部的服务类
 */
export abstract class FrameworkIpcHandlerServer<EventConvertArg> {
  /**
   * 通过转换参数的方式，让第一个事件 e, 能够转换为自己想要的参数类型
   * @param type
   * @param e
   * @param args
   * @returns
   */
  abstract convertArgs(type: IPC_EMITTER_TYPE, e: IpcMainInvokeEvent, ...args: unknown[]): [EventConvertArg, ...unknown[]];

  /**
   * 默认是将类示例 id 与方法名作为ipc传递信号
   * @param handlerServerId
   * @param propertyName
   * @returns
   */
  syntheticChannel(handlerServerId: string, propertyName: string): string {
    return handlerServerId + '/' + propertyName;
  }
}

class IpcHandlerServer<EventConvertArg> extends FrameworkIpcHandlerServer<EventConvertArg> {
  convertArgs(type: IPC_EMITTER_TYPE, e: IpcMainInvokeEvent, ...args: unknown[]): [EventConvertArg, ...unknown[]] {
    return [e as any, ...args];
  }
}

export interface SetupIpcMainHandlerOptions<
  T extends DescendantClass<FrameworkIpcHandlerServer<any>>,
  U extends DescendantClass<FrameworkIpcHandler>
> extends SetupOptions<T, U> {

}

/**
 * 返回目标是否是一个 FrameworkIpcHandler
 * @param target
 * @returns
 */
export const isIpcMainHandler = (target: any): target is typeof FrameworkIpcHandler => target instanceof FrameworkIpcHandler;

const runtimeContext = {
  server: new IpcHandlerServer()
}

/**
 * 设置 ipc 运行的上下文，注册 ipc 事件
 * @param options
 * @returns
 */
export const setupIpcMainHandler = async <
  T extends DescendantClass<FrameworkIpcHandlerServer<any>>,
  U extends DescendantClass<FrameworkIpcHandler>
>(options: SetupIpcMainHandlerOptions<T, U>) => {
  const { use: Server, modules } = options;

  if (IS_DEV) {
    if (!Server) {
      Printer.printError(`\`use\` value cannot be empty.`);
      return;
    }
  }

  const server = new Server();

  if (IS_DEV) {
    if (!(server instanceof FrameworkIpcHandlerServer)) {
      Printer.printError(`\`use\` value must be a subclass of IpcMainHandlerServer.`);
      return;
    }

    if (!Array.isArray(modules)) {
      Printer.printError(`\`modules\` value must be a array of IpcMainHandler.`);
      return;
    }
  }

  modules.forEach(Handler => {
    const handler = new Handler();

    if (IS_DEV) {
      const isController = Reflect.getMetadata(IPC_META_CONTROLLER, handler.constructor);
      if (!isIpcMainHandler(handler) || !isController) {
        Printer.printError(`\`modules\` each value must be a subclass of IpcMainHandler and decorated by IpcController.`);
        return;
      }
    }

    const handlers = Reflect.getMetadata(IPC_META_HANDLER, handler.constructor);
    handlers.forEach((propertyName: string) => {
      const channel = server.syntheticChannel(handler.id, propertyName);

      ipcMain.handle(channel, (e, ...args) => new Promise(async (resolve, reject) => {
        const convertArgs = server.convertArgs(IPC_EMITTER_TYPE.HANDLE, e, ...args);
        const r = await Promise.resolve(handler[propertyName](...convertArgs)).catch(reject);

        resolve(r);
      }))
    })
  })
}

