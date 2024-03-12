/**
 * ==========================================
 * preload 为 Window，渲染进程代码全局提供的全局声明
 * ==========================================
 */
import ElectronStore from 'electron-store';
import type { ExposeApi } from './index';
import { StoreKeyMap } from '#/constants';

declare global {
  interface Window extends ExposeApi {


  }
}

export { };
