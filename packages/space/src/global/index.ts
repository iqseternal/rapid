/**
 * ==========================================
 * 用于挂载一些全局变量, 方便在主进程的编写中不需要进行导入
 *
 * 避免过多挂载
 * ==========================================
 */
import { ipcR } from '#/code/core/common/ipcR';
import type { StoreKeyMap } from '#/constants';
import ElectronStore from 'electron-store';


globalThis.ipcR = ipcR;

globalThis.appStore = new ElectronStore<StoreKeyMap>;


