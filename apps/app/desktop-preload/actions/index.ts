
import { IS_BROWSER, IS_DESKTOP } from '@rapid/config/constants';
import { getIpcRuntimeContext } from '../../desktop-node/src/core/ipc';
import { ipcRenderer } from 'electron';
import { toPicket } from '@rapid/libs';

import type { HandleHandlers } from '../server/electron';

/**
 * 创建 ipc 句柄的调用函数
 */
export const makeInvokeActions = <InvokeKey extends keyof HandleHandlers>(invokeKey: InvokeKey): HandleHandlers[InvokeKey] => {
  if (!IS_DESKTOP) return ((..._: unknown[]) => Promise.resolve()) as unknown as HandleHandlers[InvokeKey];

  return (async (...args: Parameters<HandleHandlers[InvokeKey]>) => {
    const action = ipcRenderer.invoke(invokeKey, ...args as Parameters<HandleHandlers[InvokeKey]>);

    const [err, data] = await toPicket(action);

    if (err) {
      const data = err.message.match(/Error invoking remote method .*?:/);

      if (data) {
        const expStr = err.message.replace(data[0], '').trim();

        return Promise.reject(JSON.parse(expStr));
      }

      throw new Error('解析 ipc 句柄的错误信息失败');
    }
    return data;
  }) as unknown as HandleHandlers[InvokeKey];
}

export const windowMax = makeInvokeActions('IpcWindow/maxSize');
export const windowMin = makeInvokeActions('IpcWindow/minSize');
export const windowClose = makeInvokeActions('IpcWindow/closeWindow');

export {};

export const ipcActions = {
  windowMax,
  windowMin,
  windowClose
} as const;

export type IpcActions = typeof ipcActions;
