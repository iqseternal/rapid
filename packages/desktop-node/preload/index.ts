/**
 * ==========================================
 * preload 注入变量 Api
 * ==========================================
 */
import type { Handlers } from './preload.d';
import { autoExpose } from './autoExpose';
import { electronAPI } from '@electron-toolkit/preload';

export type { Handlers, HandlerMethodTyped } from './preload';

export interface ExposeApi {
  electron: typeof electronAPI;
}

autoExpose<ExposeApi>({
  electron: electronAPI
});


