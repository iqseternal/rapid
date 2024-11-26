import { makeInvokeActions } from './ipcRenderer';

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
  static confirm(message?: string) {
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
 * @returns
 */
export const windowShow = makeInvokeActions('IpcWindow/showWindow');

/**
 * 窗口是否可以调整大小
 */
export const windowResizeAble = makeInvokeActions('IpcWindow/resizeAble');

/**
 * 设置窗口的大小
 * @returns
 */
export const windowSetSize = makeInvokeActions('IpcWindow/setSize');

/**
 * 设置窗口的位置
 * @returns
 */
export const windowSetPosition = makeInvokeActions('IpcWindow/setPosition');

/**
 * 重启应用
 * @returns
 */
export const windowRelaunch = makeInvokeActions('IpcWindow/relaunch');

/**
 * 恢复窗口为定制化大小
 * @returns
 */
export const windowResetCustomSize = makeInvokeActions('IpcWindow/resetCustomSize');

/**
 * 最大化窗口
 * @returns
 */
export const windowMax = makeInvokeActions('IpcWindow/maxSize');

/**
 * 最小化窗口
 * @returns
 */
export const windowMin = makeInvokeActions('IpcWindow/minSize');

/**
 * 还原窗口
 * @returns
 */
export const windowReduction = makeInvokeActions('IpcWindow/reduction');

/**
 * 关闭窗口
 * @returns
 */
export const windowClose = makeInvokeActions('IpcWindow/closeWindow');

/**
 * 打开窗口开发者工具
 * @param args
 * @returns
 */
export const windowDevtool = makeInvokeActions('IpcDevTool/openDevTool');

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

export const windowWorkAreaSize = makeInvokeActions('IpcWindow/workAreaSize');

/**
 * 打开一个子窗口
 * @returns
 */
export const windowOpen = makeInvokeActions('IpcWindow/openWindow');

export const windowForwardDataTakeIn = makeInvokeActions('IpcForwardData/takeIn');
export const windowForWardDataTakeOut = makeInvokeActions('IpcForwardData/takeOut');

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

