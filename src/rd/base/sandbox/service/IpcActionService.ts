import { ipcRenderer } from 'electron';
import { toNil } from '@rapid/libs';

/**
 * IpcActionService
 */
export class IpcActionService<IpcHandlers extends Record<string, (...args: unknown[]) => Promise<unknown>>> {

  /**
   * 创建 ipc 句柄 - 如果主进程出现 Promise reject, 那么 ipc 默认是返回一段文本描述.
   * 该方法则会自动封装并且提取出文本描述中的 JSON 值
   */
  public makeInvokeAction<InvokeKey extends keyof IpcHandlers>(invokeKey: InvokeKey): IpcHandlers[InvokeKey] {

    return (async (...args: Parameters<IpcHandlers[InvokeKey]>) => {
      if (typeof invokeKey !== 'string') throw new Error('请求的 Ipc 句柄不是字符串');

      // Promise
      const action = ipcRenderer.invoke(invokeKey, ...args as Parameters<IpcHandlers[InvokeKey]>);

      const [err, data] = await toNil(action);

      // 如果 Promise 被拒绝, 则尝试提取错误信息解析为符合调用规范的 JSON 数据
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
      return err.message.replace(data[0], '').trim();
    }

    return null;
  }
}
