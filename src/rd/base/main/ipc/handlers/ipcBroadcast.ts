/**
 * ====================================================================================
 * ipc 广播, 渲染进程发射事件, 携带 事件名和数据, 向其他窗口广播, 事件名由渲染进程决定, 由渲染进程监听是否处理
 * 此做法免去主进程的多事件注册, 由渲染进程进行处理解决.
 * ====================================================================================
 */

import { BrowserWindow } from 'electron';
import { WindowService } from '../../service/WindowService';
import { ipcMReceiver, IpcMiddleware } from '@suey/elec-ipc-core';

/**
 * 接收 IpcBroadcast 事件, 并且向其他窗口广播, 携带 事件名、参数
 */
export const ipcOnBroadcast = ipcMReceiver.createProcessor(
  'IpcBroadcast',
  {
    type: 'on',
    middlewares: []
  },
  async (e, evtName: string, data: any) => {
    const windowService = WindowService.findWindowService(e);

    const windows = BrowserWindow.getAllWindows();

    // 向所有窗口广播事件
    windows.forEach(window => {
      if (window === windowService.window) return;

      window.webContents.send('IpcBroadcast', evtName, data);
    })
  }
);
