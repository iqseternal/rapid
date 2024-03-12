import { IPC_MAIN_WINDOW } from '#/constants';
import type { MainEventHandlers } from '#/constants/ipc';

export class WindowPopup {
  /**
   * 弹出一个警告框
   * @param message
   */
  static warn(message?: any) {
    return window.alert(message);
  }

  /**
   * 弹出一个确认框
   */
  static confim(message?: string) {
    return window.confirm(message);
  }
}

/**
 * 刷新页面
 * @returns
 */
export const windowReload = () => window.location.reload();

/**
 * 是否展示页面
 * @param show
 * @param id
 * @returns
 */
export const windowShow = (show: boolean, id?: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SHOW, show, id);

/**
 * 窗口是否可以调整大小
 * @param able
 * @returns
 */
export const windowResizeAble = (able: boolean) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, able);

/**
 * 设置窗口的大小
 * @param width
 * @param height
 * @returns
 */
export const windowSetSize = (width: number, height: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_SIZE, width, height);

/**
 * 设置窗口的位置
 * @param args
 * @returns
 */
export const windowSetPosition = (...args: Parameters<MainEventHandlers[typeof IPC_MAIN_WINDOW.WINDOW_SET_POSITION]>) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_SET_POSITION, ...args)

/**
 * 重启应用
 * @returns
 */
export const windowRelaunch = () => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RELAUNCH);

/**
 * 恢复窗口为定制化大小
 * @param type
 * @returns
 */
export const windowResetCustomSize = (type: Parameters<MainEventHandlers[typeof IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE]>[0]) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE, type);

/**
 * 最大化窗口
 * @param id
 * @returns
 */
export const windowMax = (id?: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_MAX_SIZE, id);

/**
 * 最小化窗口
 * @param id
 * @returns
 */
export const windowMin = (id?: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_MIN_SIZE, id);

/**
 * 还原窗口
 * @param id
 * @returns
 */
export const windowReduction = (id?: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_REDUCTION, id);

/**
 * 关闭窗口
 * @param id
 * @returns
 */
export const windowClose = (id?: number) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.WINDOW_CLOSE, id);

/**
 * 打开窗口开发者工具
 * @param args
 * @returns
 */
export const windowDevtool = (...args: Parameters<MainEventHandlers[typeof IPC_MAIN_WINDOW.DEV_OPEN_TOOL]>) => window.electron.ipcRenderer.invoke(IPC_MAIN_WINDOW.DEV_OPEN_TOOL, ...args);

/**
 * 全屏
 * @param el
 * @returns
 */
export const windowEnableFullScreen = (el = document.body) => el.requestFullscreen();

/**
 * 退出全屏
 * @returns
 */
export const windowExitFullScreen = () => document.exitFullscreen();

/**
 * 自动全屏或者推出全屏
 * @param el
 * @returns
 */
export const windowAutoFullScreen = (el = document.body) => {
  if (document.fullscreenElement) {
    return document.exitFullscreen();
  }

  return el.requestFullscreen();
}

/**
 * 让当前页面URL禁用前进导航
 * @returns
 */
export const windowURLForwardDisabled = () => {
  // TODO: 原生实现
  // window.history.state.forward = null;
}

/**
 * 让当前页面URL禁用后退导航
 * @returns
 */
export const windowURLBackDisabled = () => {
  // TODO: 原生实现
  // window.history.state.back = null;
}

