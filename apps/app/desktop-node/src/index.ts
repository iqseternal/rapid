import { RequestExceptionFilter, TypeExceptionFilter, PermissionExceptionFilter, RuntimeExceptionFilter, AsyncExceptionFilter } from './core';
import { LoggerServer } from './server';
import { setupContext, setupSingleApplication, registerIpcHandle, registerIpcHandleOnce, registerIpcOn } from '@rapid/framework';
import { setupMainWindow, setupTrayMenu } from './setupService';
import { setupApp } from './setupApp';
import {
  ipcWindowClose, ipcWindowMaxSize, ipcWindowMinSize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize, ipcWindowShow,
  ipcWindowSetMinimumSize,
  ipcWindowProperties,

  ipcOpenWindow,
  ipcWindowGetDragData, ipcWindowSetDragData,

  ipcStoreClear, ipcStoreDelete, ipcStoreGet, ipcStoreReset,
  ipcStoreSet, ipcStoreHas, ipcStoreGetStore,

  ipcRdDocSave, ipcRdDocExpose, ipcRdDocImport, ipcRdDocOpen, ipcRdDocSaveAs,

  ipcOpenDevTool,

  ipcOnBroadcast,
} from './ipc';
import { PrinterService } from './service/PrinterService';

registerIpcHandle([
  ipcWindowClose, ipcWindowMaxSize, ipcWindowMinSize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize, ipcWindowShow,
  ipcWindowSetMinimumSize,
  ipcWindowProperties
]);
registerIpcHandle([ipcOpenWindow]);
registerIpcHandle([ipcWindowGetDragData, ipcWindowSetDragData]);
registerIpcHandle([
  ipcStoreClear, ipcStoreDelete, ipcStoreGet, ipcStoreReset,
  ipcStoreSet, ipcStoreHas, ipcStoreGetStore
]);
registerIpcHandle([ipcOpenDevTool]);
registerIpcHandle([
  ipcRdDocSave, ipcRdDocExpose, ipcRdDocImport, ipcRdDocOpen, ipcRdDocSaveAs
]);

registerIpcOn([ipcOnBroadcast]);

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
}).catch(() => {

})

setupApp(async () => {
  const mainWindow = await setupMainWindow();

  await setupTrayMenu();
}, {
  onFailed: async (err) => {

    PrinterService.printWarn(err);

    // const reportBugsWindowService = await setupReportBugsWindow();

    // reportBugsWindowService.show();
  }
});
