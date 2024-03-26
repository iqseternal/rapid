import { setupContext, setupSingleApplication } from '@rapid/framework';
import { RequestExceptionFilter, TypeExceptionFilter, PermissionExceptionFilter, RuntimeExceptionFilter, AsyncExceptionFilter } from './common';
import { IpcDevToolHandler, IpcStoreHandler, IpcWindowHandler } from './ipc';
import { LoggerServer, IpcHandlerServer } from './server';
import { setupApp } from './setupApp';
import { setupMainWindow, setupTrayMenu } from './setupService';
import { Menu, Tray, nativeImage } from 'electron';
import { iconUrl } from '@rapid/config/electron-main';
import { CONFIG } from '@rapid/config/constants';

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
  const tray = await setupTrayMenu();


  const mainWindowService = await setupMainWindow();
  mainWindowService.open();
})
