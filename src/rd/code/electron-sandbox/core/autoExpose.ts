/**
 * ==========================================
 * preload 文件 自动注入 的 Api封装
 * ==========================================
 */
import { contextBridge } from 'electron';

/**
 * 注入一个api到渲染进程
 */
export const expose = (exposeKey: string, api: any) => {
  if (process.contextIsolated) {
    contextBridge.exposeInMainWorld(exposeKey, api);
  }
  else {
    window[exposeKey as any] = api;
  }
}

/**
 * 自动暴露Api，解决手动的烦恼
 *
 * @example
 * autoExpose<ExposeApi>({
 *   appName: 'rapid'
 * });
 *
 * @example
 * // in Web scripts
 * window.appName;
 */
export function autoExpose<T extends Record<string | symbol, any>>(exposeApiObj: T): void {
  const exposeKeys = Object.keys(exposeApiObj);

  exposeKeys.forEach(key => expose(key, exposeApiObj[key]));
}

