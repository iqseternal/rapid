import { optimizer } from '@electron-toolkit/utils';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { app } from 'electron';
import { setupMainWindowService } from './flow/windowFlow';
import { setupTrayMenu } from './flow/trayMenuFlow';
import { ipcMReceiver } from '@rapid/m-ipc-core';
import { ipcAppStoreClear, ipcAppStoreDelete, ipcAppStoreGet, ipcAppStoreGetStore, ipcAppStoreHas, ipcAppStoreReset, ipcAppStoreSet } from 'rd/base/main/ipc/handlers';
import {
  ipcWindowResizeAble, ipcWindowWorkAreaSize, ipcWindowShow, ipcWindowSetSize,
  ipcWindowSetPosition, ipcWindowSetMinimumSize, ipcWindowResetCustomSize, ipcWindowRelaunch,
  ipcWindowReductionSize, ipcWindowProperties, ipcWindowMinimize, ipcWindowMaximize, ipcWindowClose
} from 'rd/base/main/ipc/handlers';
import { ipcOnBroadcast } from 'rd/base/main/ipc/handlers';
import { ipcOpenDevTool } from 'rd/base/main/ipc/handlers';
import { ipcForwardDataTakeIn, ipcForwardDataTakeOut } from 'rd/base/main/ipc/handlers';
import { ipcExceptionFilterMiddleware, ipcResponseMiddleware } from 'rd/base/main/ipc/middlewares';

/**
 * 设置应用监听事件
 */
export async function setupAppListeners() {
  // ========== 所有窗口关闭
  // ========== 在 windows 系统上, 关闭所有窗口通常会退出应用程序
  app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
      PrinterService.printInfo('窗口已关闭, 应用程序即将退出');
      app.quit();
    }
  });

  // ========== 激活应用
  app.on('activate', async () => {

  });

  if (IS_DEV) {
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });
  }
}

export class CodeMain {
  public async main() {
    await this.setupIpcListeners();

    await setupAppListeners();

    await app.whenReady();

    await setupMainWindowService();

    await setupTrayMenu();
  }

  public async setupIpcListeners() {
    ipcMReceiver
      .registerHandle(
        ipcWindowClose, ipcWindowMaximize, ipcWindowMinimize, ipcWindowReductionSize, ipcWindowRelaunch,
        ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize, ipcWindowShow,
        ipcWindowSetMinimumSize,
        ipcWindowProperties,
        ipcWindowWorkAreaSize
      )
      .registerHandle(
        ipcAppStoreDelete, ipcAppStoreClear, ipcAppStoreGet, ipcAppStoreGetStore,
        ipcAppStoreReset, ipcAppStoreHas, ipcAppStoreSet
      )
      .registerHandle(ipcOpenDevTool)
      .registerHandle(ipcForwardDataTakeIn, ipcForwardDataTakeOut)
    ;

    ipcMReceiver
      .registerAsOn(ipcOnBroadcast)
    ;

    ipcMReceiver
      .useGlobalMiddleware(ipcExceptionFilterMiddleware)
      .useGlobalMiddleware(ipcResponseMiddleware)
    ;
  }
}
