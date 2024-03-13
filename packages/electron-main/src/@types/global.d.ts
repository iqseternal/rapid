
import { ipcR as ipcResponseFn } from '@/core/common/ipcR';
import type { PropType as VuePropType } from 'vue';

import ElectronStore from 'electron-store';
import type { StoreKeyMap } from '@constants/store';

declare global {
  // 主进程
  var ipcR: typeof ipcResponseFn;
  var appStore: ElectronStore<StoreKeyMap>;
}

export {};
