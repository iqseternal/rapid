import { WINDOW_STATE_MACHINE_KEYS, IS_WEB } from '@rapid/config/constants';
import { makeInvokeActions } from './ipcRenderer';

/**
 * 打开设置页面
 * @return
 */
export const openSettingPage = makeInvokeActions('IpcWindow/openWindow');
