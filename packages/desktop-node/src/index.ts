import { RequestExceptionFilter, TypeExceptionFilter, PermissionExceptionFilter, RuntimeExceptionFilter, AsyncExceptionFilter } from './core';
import { IpcDevToolHandler, IpcStoreHandler, IpcWindowHandler } from './ipc';
import { LoggerServer, IpcHandlerServer } from './server';
import { setupContext, setupSingleApplication } from '@rapid/framework';
import { setupMainWindow, setupTrayMenu } from './setupService';
import { setupApp } from './setupApp';

setupSingleApplication();

setupContext({
  logger: { use: LoggerServer },
  filters: {
    modules: [
      RequestExceptionFilter,
      RuntimeExceptionFilter,
      TypeExceptionFilter,
      AsyncExceptionFilter,
      PermissionExceptionFilter
    ]
  },
  ipcMain: {
    use: IpcHandlerServer,
    modules: [
      IpcWindowHandler, IpcStoreHandler, IpcDevToolHandler
    ]
  }
})

setupApp(async () => {
  setupTrayMenu();

  // const mainWindowService = await setupMainWindow();
  // mainWindowService.open();
})
