import { WINDOW_STATE_MACHINE_KEYS, IS_WEB } from '@rapid/config/constants';
import { makeInvokeActions } from './ipcRenderer';

/**
 * 打开页面
 * @return
 */
const openPage = makeInvokeActions('IpcWindow/openWindow');

/**
 * 打开设置页面
 * @return
 */
export const openSettingPage = () => openPage(WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW);

/**
 * 打开Bug汇报页面
 * @return
 */
export const openReportBugsPage = () => openPage(WINDOW_STATE_MACHINE_KEYS.REPORT_BUGS_WINDOW);
