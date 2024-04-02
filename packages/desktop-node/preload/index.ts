/**
 * ==========================================
 * preload 注入变量 Api
 * ==========================================
 */
import type { ElectronAPI, Handlers } from './preload.d';
import { autoExpose } from './autoExpose';
import { electronAPI } from '@electron-toolkit/preload';

export type { Handlers, HandlerMethodTyped } from './preload';

export interface ExposeApi {
  electron: ElectronAPI;
}

autoExpose<ExposeApi>({
  electron: electronAPI
});


