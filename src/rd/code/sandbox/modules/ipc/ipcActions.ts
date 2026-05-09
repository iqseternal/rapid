
import { ipcBCaller } from './ipcBCaller';
/**
 * 打开页面
 * @return
 */
export const openPage = ipcBCaller.makeInvoker('IpcWindow/openWindow');

/**
 * 刷新页面
 * @returns
 */
export const windowReload = () => window.location.reload();

/**
 * 是否展示页面
 * @returns
 */
export const windowShow = ipcBCaller.makeInvoker('IpcWindow/showWindow');

/**
 * 窗口是否可以调整大小
 */
export const windowResizeAble = ipcBCaller.makeInvoker('IpcWindow/resizeAble');

/**
 * 设置窗口的大小
 * @returns
 */
export const windowSetSize = ipcBCaller.makeInvoker('IpcWindow/setSize');

/**
 * 设置窗口的位置
 * @returns
 */
export const windowSetPosition = ipcBCaller.makeInvoker('IpcWindow/setPosition');

/**
 * 重启应用
 * @returns
 */
export const windowRelaunch = ipcBCaller.makeInvoker('IpcWindow/relaunch');

/**
 * 恢复窗口为定制化大小
 * @returns
 */
export const windowResetCustomSize = ipcBCaller.makeInvoker('IpcWindow/resetCustomSize');

/**
 * 最大化窗口
 * @returns
 */
export const windowMax = ipcBCaller.makeInvoker('IpcWindow/maxSize');

/**
 * 最小化窗口
 * @returns
 */
export const windowMin = ipcBCaller.makeInvoker('IpcWindow/minSize');

/**
 * 还原窗口
 * @returns
 */
export const windowReduction = ipcBCaller.makeInvoker('IpcWindow/reduction');

/**
 * 关闭窗口
 * @returns
 */
export const windowClose = ipcBCaller.makeInvoker('IpcWindow/closeWindow');

/**
 * 打开窗口开发者工具
 * @param args
 * @returns
 */
export const windowDevtool = ipcBCaller.makeInvoker('IpcDevTool/openDevTool');

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

export const windowWorkAreaSize = ipcBCaller.makeInvoker('IpcWindow/workAreaSize');

/**
 * 打开一个子窗口
 * @returns
 */
export const windowOpen = ipcBCaller.makeInvoker('IpcWindow/openWindow');

export const windowForwardDataTakeIn = ipcBCaller.makeInvoker('IpcForwardData/takeIn');

export const windowForWardDataTakeOut = ipcBCaller.makeInvoker('IpcForwardData/takeOut');

