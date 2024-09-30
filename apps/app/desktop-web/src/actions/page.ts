import { WINDOW_STATE_MACHINE_KEYS } from '@rapid/config/constants';
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
export const openSettingPage = () => openPage({ windowKey: WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW, subUrl: '' }, {});

/**
 * 打开Bug汇报页面
 * @return
 */
export const openReportBugsPage = () => openPage({ windowKey: WINDOW_STATE_MACHINE_KEYS.REPORT_BUGS_WINDOW, subUrl: '' }, {});
