
import { WINDOW_STATE_MACHINE_KEYS } from '@rapid/config/constants';

/**
 * 打开设置页面
 * @return
 */
export const openSettingPage = () => window.electron.ipcRenderer.invoke('IpcWindow/openWindow', WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW);
