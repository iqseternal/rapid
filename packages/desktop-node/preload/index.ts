/**
 * ==========================================
 * preload 注入变量 Api
 * ==========================================
 */

import type {CutHead} from '@rapid/libs/types';
import { autoExpose } from './autoExpose';
import { electronAPI } from '@electron-toolkit/preload';
import type { ElectronAPI } from './preload';

export type { Handlers } from './preload.d';

/**
 * 实际上是可以直接 autoExpose 暴露 api, 但是 Web 项目需要扩展类型才能够拥有很好的 TS 支持
 */
export interface ExposeApi {
  electron: ElectronAPI;
}

autoExpose<ExposeApi>({
  electron: electronAPI as ElectronAPI
});




