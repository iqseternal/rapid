import { WindowService } from '@/core/service/WindowService';
import { IpcActionMiddleware, IpcActionEvent } from '@/core/ipc';
import { Catch, isException } from '@/core';

/**
 * ipc 全局中间件, 用于处理异常和日志行为
 */
export const ipcExceptionFilterMiddleware: IpcActionMiddleware<IpcActionEvent> = {
  name: 'ipcExceptionFilterMiddleware',
  /**
   * ipc 接口出现了错误, 利用 onError 回调在主进程处理 ipc 产生地异常, 记录日志...
   */
  onError(err, { channel }) {
    err.errMessage.label = channel;

    if (isException(err)) return Catch.parser(err);

    return err;
  },
}

/**
 * 转换参数的中间件, 将 ipc 句柄传递的事件 e 转换为 windowService
 */
export const convertWindowServiceMiddleware: IpcActionMiddleware<IpcActionEvent> = {
  name: 'convertWindowService',

  /**
   * 转换参数, 将事件 e 转换为对应地 WindowService
   */
  transform(e, ...args) {
    const windowService = WindowService.findWindowService(e);

    return [windowService, ...args];
  }
}

