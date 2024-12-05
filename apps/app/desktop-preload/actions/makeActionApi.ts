

import { ipcRenderer } from 'electron';
import { IS_DESKTOP } from '@rapid/config/constants';
import type { HandleHandlers } from '../server/electron';
import { toNil } from '@rapid/libs';

/**
 * 创建 ipc 句柄的调用函数
 */
export const makeInvokeActions = <InvokeKey extends keyof HandleHandlers>(invokeKey: InvokeKey): HandleHandlers[InvokeKey] => {
  if (!IS_DESKTOP) return ((..._: unknown[]) => Promise.resolve()) as unknown as HandleHandlers[InvokeKey];

  return (async (...args: Parameters<HandleHandlers[InvokeKey]>) => {
    const action = ipcRenderer.invoke(invokeKey, ...args as Parameters<HandleHandlers[InvokeKey]>);

    const [err, data] = await toNil(action);

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
