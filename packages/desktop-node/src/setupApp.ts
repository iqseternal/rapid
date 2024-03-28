import { app, BrowserView, BrowserWindow } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { PrinterService } from '@/service/PrinterService';
import { print, printError } from '@suey/printer';
import { WindowService, WindowServiceOptions } from '@/service/WindowService';
import { isString, isNumber } from '@suey/pkg-utils';

export interface AppOptions {
  modelId: string;
};

export const DEFAULT_APP_OPTIONS: Required<AppOptions> = {
  modelId: 'com.electron'
};

/**
 * 装载一次 setupApp, 用于捕捉可能会出现的错误, 让程序能够在受到致命错误时进行相应处理
 * @param startApp
 * @param ops
 * @returns
 */
export const setupApp = async (startApp: () => void, ops?: Partial<AppOptions>): Promise<void> => {
  PrinterService.printInfo('开始构建应用程序, setupApp...');
  const options = { ...DEFAULT_APP_OPTIONS, ...ops } as Required<AppOptions>;

  app.whenReady().then(() => {
    electronApp.setAppUserModelId(options.modelId);

    app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window));

    if (BrowserWindow.getAllWindows().length !== 0) {
      BrowserWindow.getAllWindows()[0].focus();
    }
    else startApp();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) startApp();
    });
  });

  app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
    //   PrinterService.printInfo('窗口已关闭, 应用程序即将退出');
    //   app.quit();
    // };
  });

  return Promise.resolve();
}

