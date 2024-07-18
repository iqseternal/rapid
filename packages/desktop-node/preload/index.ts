/**
 * ==========================================
 * preload 注入变量 Api
 * ==========================================
 */

import type {CutHead} from '@rapid/libs/types';
import { autoExpose } from './autoExpose';
import { electronAPI } from '@electron-toolkit/preload';
import type { ElectronAPI } from './preload.d';

export type { Handlers, HandlerMethodTyped } from './preload.d';

export interface ExposeApi {
  electron: ElectronAPI;
}

autoExpose<ExposeApi>({
  electron: electronAPI as ElectronAPI
});




