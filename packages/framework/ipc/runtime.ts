import { ipcMain } from 'electron';
import type { IpcMainInvokeEvent } from 'electron';
import { IS_DEV } from '@rapid/config/constants';
import { Printer } from '../core';
import type { SetupOptions, DescendantClass } from '../core';
import { filterCatch } from '../filter/runtime';

import { IPC_META_CONTROLLER, IPC_META_HANDLE, IPC_EMITTER_TYPE, IPC_META_HANDLE_ONCE, IPC_META_ON, IPC_META_ON_ONCE } from './decorator';
import { Exception } from '../exception';

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
  syntheticChannel<T extends string, K extends string>(handlerServerId: T, propertyName: K): `${T}/${K}` {
    return `${handlerServerId}/${propertyName}`;
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

/**
 * 执行上下文
 */
const runtimeContext = {
  /** ipc Server */
  server: new IpcHandlerServer(),
  /** ipc 注册句柄的类 */
  modules: [] as FrameworkIpcHandler[]
}

export const getIpcRuntimeContext = () => runtimeContext;

/**
 * 直接注册一个 ipc 句柄
 * @param type
 * @param channel
 * @param listener
 */
export const registerIpcMain = <
  Class extends FrameworkIpcHandler,
  Channel extends `${Class['id']}/${Exclude<keyof Class, 'id' | number | symbol>}` = `${Class['id']}/${Exclude<keyof Class, 'id' | number | symbol>}`
>(type: IPC_EMITTER_TYPE, channel: Channel, listener: (...args: unknown[]) => any) => {
  ipcMain[type](channel, (e, ...args) => new Promise(async (resolve, reject) => {
    const convertArgs = runtimeContext.server.convertArgs(IPC_EMITTER_TYPE.HANDLE, e, ...args);
    const response = listener(...convertArgs);

    Promise.resolve(response).then(resolve).catch(async err => {
      filterCatch(err).then(() => {
        reject((err as Exception).message);
      }).catch(() => {
        reject('unCaught exception');
      });
    })
  }))
}

/**
 * 为一个 FrameworkIpcHandler 子类注册 ipc 句柄
 * @param Class
 * @returns
 */
export const registerIpcMainHandler = <T extends DescendantClass<FrameworkIpcHandler>>(Class: T): FrameworkIpcHandler => {
  const handler = new Class();
  type HandlerMethodNames = Exclude<keyof typeof handler, 'id' | number | symbol>;

  if (IS_DEV) {
    const isController = Reflect.getMetadata(IPC_META_CONTROLLER, handler.constructor);
    if (!isIpcMainHandler(handler) || !isController) {
      throw new Exception(`\`registerIpcMainHandler\` Class value must be a subclass of IpcMainHandler and decorated by IpcController.`, null);
    }
  }

  const handles = Reflect.getMetadata(IPC_META_HANDLE, handler.constructor) as HandlerMethodNames[];
  handles.forEach((propertyName: string) => {
    const channel = runtimeContext.server.syntheticChannel(handler.id, propertyName as HandlerMethodNames);
    const listener = (...args: unknown[]) => handler[propertyName](...args);
    registerIpcMain<typeof handler>(IPC_EMITTER_TYPE.HANDLE, channel, listener);
  });

  const handleOnces = Reflect.getMetadata(IPC_META_HANDLE_ONCE, handler.constructor) as HandlerMethodNames[];
  handleOnces.forEach((propertyName: string) => {
    const channel = runtimeContext.server.syntheticChannel(handler.id, propertyName as HandlerMethodNames);
    const listener = (...args: unknown[]) => handler[propertyName](...args);
    registerIpcMain<typeof handler>(IPC_EMITTER_TYPE.HANDLE_ONCE, channel, listener);
  });

  const ons = Reflect.getMetadata(IPC_META_ON, handler.constructor) as HandlerMethodNames[];
  ons.forEach((propertyName: string) => {
    const channel = runtimeContext.server.syntheticChannel(handler.id, propertyName as HandlerMethodNames);
    const listener = (...args: unknown[]) => handler[propertyName](...args);
    registerIpcMain<typeof handler>(IPC_EMITTER_TYPE.ON, channel, listener);
  });

  const onOnces = Reflect.getMetadata(IPC_META_ON_ONCE, handler.constructor) as HandlerMethodNames[];
  onOnces.forEach((propertyName: string) => {
    const channel = runtimeContext.server.syntheticChannel(handler.id, propertyName as HandlerMethodNames);
    const listener = (...args: unknown[]) => handler[propertyName](...args);
    registerIpcMain<typeof handler>(IPC_EMITTER_TYPE.ON_ONCE, channel, listener);
  });

  return handler;
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

  runtimeContext.server = new Server();

  ipcMain.removeAllListeners('uncaughtException');

  modules.forEach((Handler) => {
    const handler = registerIpcMainHandler(Handler);

    runtimeContext.modules.push(handler);
  });
}

