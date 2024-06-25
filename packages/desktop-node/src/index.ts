import {
  RequestExceptionFilter, TypeExceptionFilter,
  PermissionExceptionFilter, RuntimeExceptionFilter,
  AsyncExceptionFilter, RuntimeException
} from './core';
import { IpcDevToolHandler, IpcStoreHandler, IpcWindowHandler, IpcGraphicHandler, IpcDocHandler } from './ipc';
import { LoggerServer, IpcHandlerServer } from './server';
import { setupContext, setupSingleApplication } from '@rapid/framework';
import { setupMainWindow, setupTrayMenu, setupReportBugsWindow } from './setupService';
import { setupApp } from './setupApp';

setupSingleApplication().catch(() => {

});

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
}).catch(() => {

})

setupApp(async () => {
  // throw new RuntimeException('', {
  //   label: 'sss'
  // })

  setupMainWindow();
  setupTrayMenu();

}, {
  onFailed: async (err) => {
    const reportBugsWindowService = await setupReportBugsWindow();

    reportBugsWindowService.show();
  }
});
