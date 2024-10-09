import { app, BrowserWindow } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { PrinterService } from '@/core/service/PrinterService';

export interface AppOptions {
  modelId: string;
}

export const DEFAULT_APP_OPTIONS: Required<AppOptions> = {
  modelId: 'com.electron'
};

/**
 * 装载一次 setupApp, 用于捕捉可能会出现的错误, 让程序能够在受到致命错误时进行相应处理
 * @param startApp
 * @param ops
 * @returns
 */
export const setupApp = (startApp: () => void | Promise<void>, ops?: Partial<AppOptions>) => {
  PrinterService.printInfo('开始构建应用程序, setupApp...');
  const options = { ...DEFAULT_APP_OPTIONS, ...ops } as Required<AppOptions>;

  // app.disableHardwareAcceleration();
  app.whenReady().then(() => {
    electronApp.setAppUserModelId(options.modelId);

    app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window));

    // 已经具有实例, 那么找个窗口获得焦点
    if (BrowserWindow.getAllWindows().length !== 0) {
      BrowserWindow.getAllWindows()[0].focus();
    }
    // 启动
    else startApp();

    app.on('activate', () => {
      // 活跃状态时, 如果没有窗口那么就创建
      if (BrowserWindow.getAllWindows().length === 0) startApp();
    });
  });


  app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
      PrinterService.printInfo('窗口已关闭, 应用程序即将退出');

      app.quit();
    }
  });
}

