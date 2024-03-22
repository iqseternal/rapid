import 'reflect-metadata';
import { setupIpcMainHandler } from './ipc';
import { setupFilters } from './filter';
import { setupLogger } from './logger';

export * from './ipc';

export * from './logger';

export * from './exception';

export * from './filter';

export interface SetupContextOptions {
  ipcMain?: Parameters<typeof setupIpcMainHandler>[0];
  filters?: Parameters<typeof setupFilters>[0];
  logger?: Parameters<typeof setupLogger>[0];
}

export const setupContext = (options: SetupContextOptions) => {
  if (options.logger) setupLogger(options.logger);
  if (options.filters) setupFilters(options.filters);
  if (options.ipcMain) setupIpcMainHandler(options.ipcMain);
}


// 捕捉没有 处理 Catch 的 Promise
process.on('unhandledRejection', (reason, promise) => {
  if (reason instanceof Error) {
    // PrinterService.printError('?');

    return;
  }

  // PrinterService.printWarn(`出现了未处理Promise REJECTED:: ${reason}`);
});

// 处理没有捕捉的异常
process.on('uncaughtException', (reason, exception) => {

  // PrinterService.printError(reason.stack, '?');
});
