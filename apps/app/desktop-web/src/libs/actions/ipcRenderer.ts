import { IS_BROWSER } from '@rapid/config/constants';
import { toPicket } from '@rapid/libs';

/**
 * 创建 ipc 句柄的调用函数
 */
export const makeInvokeActions = <InvokeKey extends keyof RdPreload.HandleHandlers>(invokeKey: InvokeKey): RdPreload.HandleHandlers[InvokeKey] => {
  if (IS_BROWSER || !window.electron) return ((...args: unknown[]) => Promise.resolve()) as unknown as RdPreload.HandleHandlers[InvokeKey];

  return (async (...args: Parameters<RdPreload.HandleHandlers[InvokeKey]>) => {
    const action = window.electron.ipcRenderer.invoke(invokeKey, ...args as Parameters<RdPreload.HandleHandlers[InvokeKey]>);

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
  }) as unknown as RdPreload.HandleHandlers[InvokeKey];
}
