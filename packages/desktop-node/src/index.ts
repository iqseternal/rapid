import {
  RequestExceptionFilter, TypeExceptionFilter, PermissionExceptionFilter,
  RuntimeExceptionFilter, AsyncExceptionFilter
} from './core';
import {
  IpcDevToolHandler, IpcStoreHandler, IpcWindowHandler,
  IpcGraphicHandler, IpcDocHandler
} from './ipc';
import { LoggerServer, IpcHandlerServer } from './server';
import { setupContext, setupSingleApplication } from '@rapid/framework';
import { setupMainWindow, setupTrayMenu, documentsStorageService, logsStorageService, desktopStorageService } from './setupService';
import { setupApp } from './setupApp';
import { ConvertService } from './service/ConvertService';
import { FileService } from './service/FileService';
import { Printer } from '@suey/printer';
import { PrinterService } from './service/PrinterService';

import * as path from 'path';
import * as fs from 'fs';

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
      IpcWindowHandler, IpcStoreHandler, IpcDevToolHandler,
      IpcGraphicHandler, IpcDocHandler
    ]
  }
})

setupApp(async () => {
  setupMainWindow();


  setupTrayMenu();
})
