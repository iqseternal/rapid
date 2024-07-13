import {
  RequestExceptionFilter, TypeExceptionFilter,
  PermissionExceptionFilter, RuntimeExceptionFilter,
  AsyncExceptionFilter
} from './core';
import { LoggerServer } from './server';
import { setupContext, setupSingleApplication } from '@rapid/framework';
import { setupMainWindow, setupTrayMenu } from './setupService';
import { setupApp } from './setupApp';
import {
  ipcOpenWindow, ipcWindowClose, ipcWindowMaxSize, ipcWindowMinSize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize,
  ipcWindowShow
} from './ipc/IpcWindowHandler';
import {
  ipcStoreClear, ipcStoreDelete, ipcStoreGet, ipcStoreReset,
  ipcStoreSet
} from './ipc/IpcStoreHandler';
import {
  ipcRdDocSave, ipcRdDocExpose, ipcRdDocImport, ipcRdDocOpen, ipcRdDocSaveAs
} from './ipc/IpcDocHandler';
import { ipcOpenDevTool } from './ipc/IpcDevToolHandler';
import { registerIpcHandle } from '@rapid/framework';

registerIpcHandle([
  ipcWindowClose, ipcWindowMaxSize, ipcWindowMinSize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize,
  ipcWindowShow
]);
registerIpcHandle([ipcOpenWindow]);
registerIpcHandle([
  ipcStoreClear, ipcStoreDelete, ipcStoreGet, ipcStoreReset,
  ipcStoreSet
]);
registerIpcHandle([ipcOpenDevTool]);
registerIpcHandle([
  ipcRdDocSave, ipcRdDocExpose, ipcRdDocImport, ipcRdDocOpen, ipcRdDocSaveAs
]);

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
  // ipcMain: {
  //   use: IpcHandlerServer,
  //   modules: [
  //     IpcWindowHandler, IpcStoreHandler, IpcDevToolHandler,
  //     IpcGraphicHandler, IpcDocHandler
  //   ]
  // }
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
    // const reportBugsWindowService = await setupReportBugsWindow();

    // reportBugsWindowService.show();
  }
});
