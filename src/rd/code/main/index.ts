import { IpcMainManager } from 'rd/base/main/ipc';
import { optimizer } from '@electron-toolkit/utils';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { app } from 'electron';
import { setupMainWindowService } from './flow/windowFlow';
import { setupTrayMenu } from './flow/trayMenuFlow';
import { WindowService } from 'rd/base/main/service/WindowService';

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
    await IpcMainManager.start();

    await setupAppListeners();

    await app.whenReady();

    await setupMainWindowService();

    await setupTrayMenu();
  }
}
