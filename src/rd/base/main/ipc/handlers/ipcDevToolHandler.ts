import type { OpenDevToolsOptions } from 'electron';
import { WindowService } from '../../service/WindowService';
import { ipcMReceiver } from '@rapid/m-ipc-core';

/**
 * 渲染进程打开开发者检查工具
 */
export const ipcOpenDevTool = ipcMReceiver.createProcessor(
  'IpcDevTool/openDevTool',
  {
    type: 'handle',
    middlewares: []
  },
  (e, status: boolean, options?: OpenDevToolsOptions) => {
    const windowService = WindowService.findWindowService(e);

    if (status) {
      windowService.window.webContents.openDevTools(options);
      return;
    }

    windowService.window.webContents.closeDevTools();
  }
);
