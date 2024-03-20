import 'reflect-metadata';

export * from './exception';

export * from './filters';

export * from './ipc';

export * from './measure';



import { runAndErrorCallback } from './core';
import { setupMeasure } from './measure';

import { app, BrowserView, BrowserWindow } from 'electron';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { PrinterService } from '@/service/PrinterService';
import { print, printError } from '@suey/printer';
import { WindowService, WindowServiceOptions } from '@/service/WindowService';
import { isString, isNumber } from '@suey/pkg-utils';

export { runAndErrorCallback }

process.on('uncaughtException', () => {

})

process.on('uncaughtExceptionMonitor', () => {

})

process.on('rejectionHandled', () => {

})

process.on('unhandledRejection', () => {

})


export interface AppOptions {
  modelId: string;
};

export const DEFAULT_APP_OPTIONS: Required<AppOptions> = {
  modelId: 'com.electron'
};

export const setupApp = async (startApp: () => void | Promise<void>, ops?: Partial<AppOptions>) => {
  const options = { ...DEFAULT_APP_OPTIONS, ...ops } as Required<AppOptions>;

  const safeStartApp = () => runAndErrorCallback(startApp, () => {
    print('error');

    // app.quit();
  });

  app.whenReady().then(() => {
    electronApp.setAppUserModelId(options.modelId);

    app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window));

    if (BrowserWindow.getAllWindows().length !== 0) {
      BrowserWindow.getAllWindows()[0].focus();
    }
    else safeStartApp();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0)  safeStartApp();
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      PrinterService.printInfo('窗口已关闭, 应用程序即将退出');
      app.quit();
    };
  });

  return Promise.resolve();
}



