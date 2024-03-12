/**
 * ==========================================
 * preload 注入变量 Api
 * ==========================================
 */
import type { ElectronAPI } from './preload.d';
import { autoExpose } from './autoExpose';
import { electronAPI } from '@electron-toolkit/preload';

export interface ExposeApi {
  electron: ElectronAPI;
}

autoExpose<ExposeApi>({
  electron: electronAPI
});

