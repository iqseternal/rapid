import type { OpenDevToolsOptions } from 'electron';
import {
  IpcMain,
  FrameworkIpcHandler, FrameworkIpcHandlerServer,
  NoteInfo,
  setupIpcMainHandler,
  IPC_EMITTER_TYPE
} from '@rapid/framework';
import { IS_DEV } from '@rapid/config/constants';
import { WindowService } from '@/service/WindowService';
import { PermissionException } from '@/core';

@IpcMain.IpcController()
export class IpcDevToolHandler extends FrameworkIpcHandler {
  public readonly id = 'IpcDevTool';

  /**
   * 打开开发者工具
   * @param windowService
   * @param status
   * @param options
   */
  @IpcMain.Handler()
  @NoteInfo((win: WindowService, status: boolean) => `${win.window.id}${status ? 'open' : '关闭'}了开发者工具`)
  async openDevTool(windowService: WindowService, status: boolean, options?: OpenDevToolsOptions) {
    if (status) {
      if (IS_DEV) windowService.window.webContents.openDevTools(options);
      else throw new PermissionException('生产模式, 不允许打开开发者工具', { label: this.id });
    }
    else windowService.window.webContents.closeDevTools();
  }
}
