import { ipcRenderer } from 'electron';
import { toNil } from '@rapid/libs';

export class IpcActionService<IpcHandlers extends Record<string, (...args: unknown[]) => Promise<unknown>>> {




  public makeInvokeAction<InvokeKey extends keyof IpcHandlers>(invokeKey: InvokeKey): IpcHandlers[InvokeKey] {

    return (async (...args: Parameters<IpcHandlers[InvokeKey]>) => {
      if (typeof invokeKey !== 'string') throw new Error('请求的 Ipc 句柄不是字符串');

      const action = ipcRenderer.invoke(invokeKey, ...args as Parameters<IpcHandlers[InvokeKey]>);

      const [err, data] = await toNil(action);

      if (err) {
        const expStr = this.parseIpcErrorReason(err.reason as Error);

        if (expStr) return Promise.reject(JSON.parse(expStr));
        throw new Error('解析 ipc 句柄的错误信息失败');
      }
      return data;
    }) as unknown as IpcHandlers[InvokeKey];
  }

  /**
   * 解析 ipc 错误信息字符串为可用 Error
   */
  private parseIpcErrorReason(err: Error) {
    const data = err.message.match(/Error invoking remote method .*?:/);

    if (data) {
      const expStr = err.message.replace(data[0], '').trim();

      return expStr;
    }

    return null;
  }
}
