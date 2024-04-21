import type { Handlers } from 'node_modules/@rapid/desktop-node/preload';
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
export const windowResizeAble = (...args: Parameters<Handlers['IpcWindow/resizeAble']>) => window.electron.ipcRenderer.invoke('IpcWindow/resizeAble', ...args);

/**
 * 设置窗口的大小
 * @returns
 */
export const windowSetSize = (...args: Parameters<Handlers['IpcWindow/setSize']>) => window.electron.ipcRenderer.invoke('IpcWindow/setSize', ...args);

/**
 * 设置窗口的位置
 * @returns
 */
export const windowSetPosition = (...args: Parameters<Handlers['IpcWindow/setPosition']>) => window.electron.ipcRenderer.invoke('IpcWindow/setPosition', ...args)

/**
 * 重启应用
 * @returns
 */
export const windowRelaunch = (...args: Parameters<Handlers['IpcWindow/relaunch']>) => window.electron.ipcRenderer.invoke('IpcWindow/relaunch');

/**
 * 恢复窗口为定制化大小
 * @returns
 */
export const windowResetCustomSize = (...args: Parameters<Handlers['IpcWindow/resetCustomSize']>) => window.electron.ipcRenderer.invoke('IpcWindow/resetCustomSize', ...args);

/**
 * 最大化窗口
 * @returns
 */
export const windowMax = (...args: Parameters<Handlers['IpcWindow/maxSize']>) => window.electron.ipcRenderer.invoke('IpcWindow/maxSize', ...args);

/**
 * 最小化窗口
 * @returns
 */
export const windowMin = (...args: Parameters<Handlers['IpcWindow/minSize']>) => window.electron.ipcRenderer.invoke('IpcWindow/minSize', ...args);

/**
 * 还原窗口
 * @returns
 */
export const windowReduction = (...args: Parameters<Handlers['IpcWindow/reduction']>) => window.electron.ipcRenderer.invoke('IpcWindow/reduction', ...args);

/**
 * 关闭窗口
 * @returns
 */
export const windowClose = (...args: Parameters<Handlers['IpcWindow/closeWindow']>) => window.electron.ipcRenderer.invoke('IpcWindow/closeWindow', ...args);

/**
 * 打开窗口开发者工具
 * @param args
 * @returns
 */
export const windowDevtool = (...args: Parameters<Handlers['IpcDevTool/openDevTool']>) => window.electron.ipcRenderer.invoke('IpcDevTool/openDevTool', ...args);

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

