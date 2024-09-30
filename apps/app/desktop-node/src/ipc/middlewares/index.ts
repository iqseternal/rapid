import { WindowService } from '@/core/service/WindowService';
import { IpcActionMiddleware, IpcActionEvent } from '@/core/ipc';
import { Catch, isException } from '@/core';

export const ipcExceptionFilterMiddleware: IpcActionMiddleware<IpcActionEvent> = {
  name: 'ipcExceptionFilterMiddleware',

  onError(err, { action, actionType, channel }) {

    if (isException(err)) return Catch.parser(err);

    return err;
  },
}

/**
 * 转换参数的中间件, 将 ipc 句柄传递的事件 e 转换为 windowService
 */
export const convertWindowServiceMiddleware: IpcActionMiddleware<IpcActionEvent> = {
  name: 'convertWindowService',

  transform(e, ...args) {

    const windowService = WindowService.findWindowService(e);


    return [windowService, ...args];
  }
}

