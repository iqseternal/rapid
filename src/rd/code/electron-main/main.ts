import 'reflect-metadata';
import './process';

import { registerGlobalMiddleware, registerIpcHandle, registerIpcOn, IpcActionEvent } from 'rd/base/node/core/ipc';
import { setupTrayMenu, setupMainWindow } from 'rd/base/node/setupService';
import { setupApp } from 'rd/base/node/setupApp';
import { IpcMainManager } from 'rd/base/plats/ipc';
import { app, BrowserWindow } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { PrinterService } from 'rd/base/plats/service/PrinterService';
import { IS_DEV } from '@rapid/config/constants';

export class CodeMain {
  private readonly ipcManager = new IpcMainManager();

  public async main() {

    await this.ipcManager.startUp();

    await this.startUpApp();
  }


  private async startUpApp() {
    app.on('window-all-closed', async () => {
      if (process.platform !== 'darwin') {
        PrinterService.printInfo('窗口已关闭, 应用程序即将退出');
        app.quit();
      }
    });

    // app.disableHardwareAcceleration();
    await app.whenReady();

    electronApp.setAppUserModelId(`com.electron`);

    if (IS_DEV) {
      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
      });
    }

    // 已经具有实例, 那么找个窗口获得焦点
    if (BrowserWindow.getAllWindows().length === 0) {
      await setupMainWindow();
      await setupTrayMenu();
    }
    else {
      BrowserWindow.getAllWindows()[0].focus();
    }

    app.on('activate', async () => {
      // 活跃状态时, 如果没有窗口那么就创建
      if (BrowserWindow.getAllWindows().length === 0) {
        await setupMainWindow();
        await setupTrayMenu();
      }
    });
  }
}
