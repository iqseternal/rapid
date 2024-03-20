import { app, type IpcMainInvokeEvent, type OpenDevToolsOptions } from 'electron';
import { IpcMainHandlers, IpcMain, IPC_EMITTER_TYPE, runAndErrorCallback, IpcMainHandler } from '@/framework';
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
export class IpcDevTool extends IpcMainHandler {
  public readonly id = 'IpcDevTool';

  @IpcMain.Handler()
  openDevTool(windowService: WindowService, status: boolean, options?: OpenDevToolsOptions) {

    if (status) {
      if (IS_DEV) {
        PrinterService.printInfo(`id: ${windowService.window.id} 打开了开发者工具`);
        windowService.window.webContents.openDevTools(options);
      }
      else {
        PrinterService.printError(`生产模式, 不允许打开开发者工具`);

        throw new PermissionException('生产模式, 不允许打开开发者工具', { label: IpcDevTool.name });
      }
    }
    else {
      PrinterService.printInfo(`id: ${windowService.window.id} 关闭了开发者工具`);
      windowService.window.webContents.closeDevTools();
    }

    return true;
  }
}
