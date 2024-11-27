
import { IS_BROWSER, IS_DESKTOP } from '@rapid/config/constants';
import { getIpcRuntimeContext } from '../../desktop-node/src/core/ipc';
import { ipcRenderer } from 'electron';
import { toPicket } from '@rapid/libs';

import { makeInvokeActions } from './makeActionApi';

/** 打开文档数据 */
export const docOpen = makeInvokeActions('IpcDoc/openDoc');

export const docSave = makeInvokeActions('IpcDoc/save');

export const docSaveAs = makeInvokeActions('IpcDoc/saveAs');

export const docExport = makeInvokeActions('IpcDoc/exportsDoc');

export const docImport = makeInvokeActions('IpcDoc/importDoc');

/**
 * 打开页面
 * @return
 */
export const openPage = makeInvokeActions('IpcWindow/openWindow');

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
