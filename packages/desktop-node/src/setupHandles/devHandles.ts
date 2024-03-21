import { app, type IpcMainInvokeEvent, type OpenDevToolsOptions } from 'electron';
import { IpcMain, IPC_EMITTER_TYPE, FrameworkIpcHandler, NoteInfo } from '@rapid/framework';
import { IS_DEV, MainEventHandlers, StoreKeyMap, WINDOW_STATE_MACHINE_KEYS } from '@rapid/config/constants';
import { WindowService } from '@/service/WindowService';
import { setWindowOpenHandler } from '@/core/common/window';
import { screen } from 'electron';
import { ok, fail } from '@/core/common/ipcR';
import { PrinterService } from '@/service/PrinterService';
import { RuntimeException, PermissionException, TypeException } from '../common/exception';
import { isNumber, isString, isUndefined } from '@suey/pkg-utils';
import { AppConfigService } from '@/service/AppConfigService';
import { UserConfigService } from '@/service/UserConfigService';

@IpcMain.IpcController()
export class IpcDevTool extends FrameworkIpcHandler {
  public readonly id = 'IpcDevTool';

  @IpcMain.Handler()
  @NoteInfo((win: WindowService, status: boolean) => `${win.window.id}${status ? '打开' : '关闭'}了开发者工具`)
  openDevTool(windowService: WindowService, status: boolean, options?: OpenDevToolsOptions) {

    if (status) {
      if (IS_DEV) windowService.window.webContents.openDevTools(options);
      else {
        throw new PermissionException('生产模式, 不允许打开开发者工具', { label: IpcDevTool.name });
      }
    }
    else windowService.window.webContents.closeDevTools();
  }
}
