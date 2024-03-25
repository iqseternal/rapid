import { setupContext } from '@rapid/framework';
import { RequestExceptionFilter, TypeExceptionFilter, PermissionExceptionFilter, RuntimeExceptionFilter, AsyncExceptionFilter } from './common';
import { ipcModules } from './ipc';
import { LoggerServer, IpcHandlerServer } from './server';
import { setupApp } from './setupApp';
import { setupMainWindow } from './setupService';

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
  ipcMain: { use: IpcHandlerServer, modules: ipcModules }
})

setupApp(async () => {
  const mainWindowService = await setupMainWindow();

  mainWindowService.open();
})
