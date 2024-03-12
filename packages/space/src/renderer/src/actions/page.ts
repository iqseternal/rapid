
import { IPC_MAIN_WINDOW, WINDOW_STATE_MACHINE_KEYS } from '#/constants';

/**
 * 打开设置页面
 * @return
 */
export const openSettingPage = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_OPEN, WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW);
