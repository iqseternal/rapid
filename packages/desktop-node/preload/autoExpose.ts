/**
 * ==========================================
 * preload 文件 自动注入 的 Api封装
 * ==========================================
 */
import { contextBridge } from 'electron';

export type ExposeApiObj = Record<string | symbol, any>;

/**
 * 自动暴露Api，解决手动的烦恼
 * @param exposeApiObj
 */
export function autoExpose<T extends ExposeApiObj>(exposeApiObj: Required<T>): void {
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

