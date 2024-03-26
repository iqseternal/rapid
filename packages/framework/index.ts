import 'reflect-metadata';
import './process';
import { app } from 'electron';

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

/**
 * 设置 framework 运行的上下文
 * @param options
 */
export const setupContext = (options: SetupContextOptions) => {
  if (options.logger) setupLogger(options.logger);
  if (options.filters) setupFilters(options.filters);
  if (options.ipcMain) setupIpcMainHandler(options.ipcMain);
}

/**
 * 设置单实例程序
 */
export const setupSingleApplication = () => {
  const goTheLock = app.requestSingleInstanceLock();
  if (!goTheLock) {
    app.quit();
  }
}
