import type { OpenDevToolsOptions } from 'electron';
import { IS_DEV } from '@rapid/config/constants';
import { WindowService } from '@/service/WindowService';
import { PermissionException } from '@/core';
import { toMakeIpcAction } from '@rapid/framework';

const { makeIpcHandleAction } = toMakeIpcAction();

export const ipcOpenDevTool = makeIpcHandleAction(
  'IpcDevTool/openDevTool',
  [],
  async (e, status: boolean, options?: OpenDevToolsOptions) => {
    const windowService = WindowService.findWindowService(e);

    if (status) {
      if (IS_DEV) windowService.window.webContents.openDevTools(options);
      else throw new PermissionException('生产模式, 不允许打开开发者工具');
    }
    else windowService.window.webContents.closeDevTools();
  }
);
