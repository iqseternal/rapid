import { WindowService } from '../../service/WindowService';
import { IpcActionMiddleware, IpcActionEvent } from '../framework';
import { Catch, RuntimeException, isException } from '../../exceptions';
import type { Exception, ExceptionErrorMsgData } from '../../exceptions';
import type { RPromiseLike } from '@rapid/libs';
import { toNil, asynced } from '@rapid/libs';

/**
 * ipc 全局中间件, 用于处理异常和日志行为
 */
export const ipcExceptionFilterMiddleware: IpcActionMiddleware<IpcActionEvent> = {
  name: 'ipcExceptionFilterMiddleware',
  /**
   * ipc 接口出现了错误, 利用 onError 回调在主进程处理 ipc 产生地异常, 记录日志...
   */
  onError: async (err, { channel }) => {
    err.errMessage.other.channel = channel;

    if (isException(err)) Catch.parser(err);

    return err;
  },
}

/**
 * 转换响应的函数类型
 */
export type IpcTransformResponseFc = <Data>(response: Promise<Data>) => RPromiseLike<Data, Exception<ExceptionErrorMsgData>>;

/**
 * 转换响应的中间件
 */
export const ipcResponseMiddleware: IpcActionMiddleware<IpcActionEvent> = {
  name: 'ipcResponseMiddleware',
  /**
   * 转换响应, 将 ipc 句柄的响应转换为 RPromiseLike 对象
   */
  transformResponse: asynced<IpcTransformResponseFc>(async (response) => {
    const [err, data] = await toNil(response);

    if (err) {
      if (isException(err.reason)) return Promise.reject(JSON.stringify(err.reason));

      if (err.reason instanceof Error) {
        return Promise.reject(JSON.stringify(new RuntimeException(err.reason.message, {
          label: `ipcResponseMiddleware`,
          level: 'ERROR'
        })));
      }

      return Promise.reject(JSON.stringify(new RuntimeException('ipc句柄出现了未定义且未知的异常错误', {
        label: `ipcResponseMiddleware`,
        level: 'ERROR'
      })));
    }

    return data;
  }),
}

/**
 * 转换参数的中间件, 将 ipc 句柄传递的事件 e 转换为 windowService
 */
export const convertWindowServiceMiddleware: IpcActionMiddleware<IpcActionEvent> = {
  name: 'convertWindowService',

  /**
   * 转换参数, 将事件 e 转换为对应地 WindowService
   */
  transformArgs: async (e, ...args) => {
    const windowService = WindowService.findWindowService(e);

    if (!windowService) {
      throw new RuntimeException(`transformArgs 转换 WindowService 失败`, {
        label: 'convertWindowServiceMiddleware',
        level: 'ERROR'
      });
    }

    return [windowService, ...args];
  }
}

