/**
 * ==========================================
 * preload 文件 自动注入 的 Api封装
 * ==========================================
 */
import { contextBridge } from 'electron';

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
  if (process.contextIsolated) {
    Object.keys(exposeApiObj).forEach(key => {
      contextBridge.exposeInMainWorld(key, exposeApiObj[key]);
    });
  }
  else {
    Object.keys(exposeApiObj).forEach(key => {
      window[key as any] = exposeApiObj[key];
    });
  }
}

