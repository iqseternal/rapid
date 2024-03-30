import { RequestExceptionFilter, TypeExceptionFilter, PermissionExceptionFilter, RuntimeExceptionFilter, AsyncExceptionFilter } from './core';
import {
  IpcDevToolHandler, IpcStoreHandler, IpcWindowHandler,
  IpcGraphicHandler, IpcDocHandler
} from './ipc';
import { LoggerServer, IpcHandlerServer } from './server';
import { setupContext, setupSingleApplication } from '@rapid/framework';
import { setupAppDataService, setupMainWindow, setupTrayMenu } from './setupService';
import { setupApp } from './setupApp';
import { ConvertDataService } from './service/ConvertDataService';
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
  // setupMainWindow();

  // setupTrayMenu();

  const appDataService = await setupAppDataService('docs');

  const data = ConvertDataService.toDeflate({
    name: '1',
    age: 1
  });

  // appData/docs/test.rd
  const distPath = path.join(appDataService.sourcePath, './test.rd');

  PrinterService.printInfo(appDataService.relativeSourcePath, appDataService.absoluteSourcePath);
  FileService.saveFile(Buffer.from(data), distPath).then(() => {
    PrinterService.printInfo('保存成功');

    const Sdata = fs.readFileSync(distPath);

    PrinterService.printInfo('读取成功', ConvertDataService.toInflate(Sdata));
  }).catch(() => {
    PrinterService.printWarn('保存失败');
  });



})
