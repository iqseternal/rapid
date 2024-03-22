/**
 * ==========================================
 * 用于挂载一些全局变量, 方便在主进程的编写中不需要进行导入
 *
 * 避免过多挂载
 * ==========================================
 */
import type { StoreKeyMap } from '@rapid/config/constants';
import ElectronStore from 'electron-store';


globalThis.appStore = new ElectronStore<StoreKeyMap>;
