import { IpcMainManager } from 'rd/base/main/ipc';
import { app, BrowserWindow, session } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { WindowFlowService } from './flow/WindowFlowService';
import { TrayMenuFlowService } from './flow/TrayMenuFlowService';

export class CodeMain {

  public async main() {

    // await IpcMainManager.start();

    // await this.startApp();
  }

  private async startApp() {
    app.on('window-all-closed', async () => {
      if (process.platform !== 'darwin') {
        PrinterService.printInfo('窗口已关闭, 应用程序即将退出');
        app.quit();
      }
    });

    app.on('activate', async () => {
      // 活跃状态时, 如果没有窗口那么就创建
      if (BrowserWindow.getAllWindows().length === 0) {
        await WindowFlowService.setupMainWindowService();
        await TrayMenuFlowService.setupTrayMenu();
      }
    });

    if (IS_DEV) {
      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window);
      });
    }

    await app.whenReady();

    electronApp.setAppUserModelId(`com.electron`);

    // 已经具有实例, 那么找个窗口获得焦点
    if (BrowserWindow.getAllWindows().length === 0) {
      await WindowFlowService.setupMainWindowService();
      await TrayMenuFlowService.setupTrayMenu();
    }
    else {
      BrowserWindow.getAllWindows()[0].focus();
    }
  }
}
