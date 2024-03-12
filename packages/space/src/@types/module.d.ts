/// <reference types="vite/client" />

import { ipcR as ipcResponseFn } from '#/code/core/common/ipcR';
import type { PropType as VuePropType } from 'vue';

import ElectronStore from 'electron-store';
import type { StoreKeyMap } from '#constants/store';

declare global {
  // 主进程
  declare var ipcR: typeof ipcResponseFn;
  declare var appStore: ElectronStore<StoreKeyMap>;
}

export {};

