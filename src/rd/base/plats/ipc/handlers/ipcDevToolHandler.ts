import type { OpenDevToolsOptions } from 'electron';
import { WindowService } from 'rd/base/plats/service/WindowService';
import { toMakeIpcAction } from 'rd/base/node/core/ipc';

const { makeIpcHandleAction } = toMakeIpcAction();

/**
 * 渲染进程打开开发者检查工具
 */
export const ipcOpenDevTool = makeIpcHandleAction(
  'IpcDevTool/openDevTool',
  [],
  async (e, status: boolean, options?: OpenDevToolsOptions) => {
    const windowService = WindowService.findWindowService(e);

    if (status) {
      windowService.window.webContents.openDevTools(options);
      return;
    }

    windowService.window.webContents.closeDevTools();
  }
);
