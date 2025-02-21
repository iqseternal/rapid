import { IpcActionService } from 'rd/base/sandbox/service/IpcActionService';
import type { HandleHandlers } from '../electron';

const ipcActionService = new IpcActionService<HandleHandlers>();


/**
 * 打开页面
 * @return
 */
export const openPage = ipcActionService.makeInvokeAction('IpcWindow/openWindow');

/**
 * 刷新页面
 * @returns
 */
export const windowReload = () => window.location.reload();

/**
 * 是否展示页面
 * @returns
 */
export const windowShow = ipcActionService.makeInvokeAction('IpcWindow/showWindow');

/**
 * 窗口是否可以调整大小
 */
export const windowResizeAble = ipcActionService.makeInvokeAction('IpcWindow/resizeAble');

/**
 * 设置窗口的大小
 * @returns
 */
export const windowSetSize = ipcActionService.makeInvokeAction('IpcWindow/setSize');

/**
 * 设置窗口的位置
 * @returns
 */
export const windowSetPosition = ipcActionService.makeInvokeAction('IpcWindow/setPosition');

/**
 * 重启应用
 * @returns
 */
export const windowRelaunch = ipcActionService.makeInvokeAction('IpcWindow/relaunch');

/**
 * 恢复窗口为定制化大小
 * @returns
 */
export const windowResetCustomSize = ipcActionService.makeInvokeAction('IpcWindow/resetCustomSize');

/**
 * 最大化窗口
 * @returns
 */
export const windowMax = ipcActionService.makeInvokeAction('IpcWindow/maxSize');

/**
 * 最小化窗口
 * @returns
 */
export const windowMin = ipcActionService.makeInvokeAction('IpcWindow/minSize');

/**
 * 还原窗口
 * @returns
 */
export const windowReduction = ipcActionService.makeInvokeAction('IpcWindow/reduction');

/**
 * 关闭窗口
 * @returns
 */
export const windowClose = ipcActionService.makeInvokeAction('IpcWindow/closeWindow');

/**
 * 打开窗口开发者工具
 * @param args
 * @returns
 */
export const windowDevtool = ipcActionService.makeInvokeAction('IpcDevTool/openDevTool');

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

export const windowWorkAreaSize = ipcActionService.makeInvokeAction('IpcWindow/workAreaSize');

/**
 * 打开一个子窗口
 * @returns
 */
export const windowOpen = ipcActionService.makeInvokeAction('IpcWindow/openWindow');

export const windowForwardDataTakeIn = ipcActionService.makeInvokeAction('IpcForwardData/takeIn');

export const windowForWardDataTakeOut = ipcActionService.makeInvokeAction('IpcForwardData/takeOut');
