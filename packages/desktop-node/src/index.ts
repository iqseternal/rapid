import {
  RequestExceptionFilter, TypeExceptionFilter,
  PermissionExceptionFilter, RuntimeExceptionFilter,
  AsyncExceptionFilter
} from './core';
import { LoggerServer } from './server';
import { setupContext, setupSingleApplication, registerIpcHandle } from '@rapid/framework';
import { setupMainWindow, setupTrayMenu } from './setupService';
import { setupApp } from './setupApp';
import {
  ipcOpenWindow, ipcWindowClose, ipcWindowMaxSize, ipcWindowMinSize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize,
  ipcWindowShow,

  ipcStoreClear, ipcStoreDelete, ipcStoreGet, ipcStoreReset,
  ipcStoreSet,

  ipcRdDocSave, ipcRdDocExpose, ipcRdDocImport, ipcRdDocOpen, ipcRdDocSaveAs,

  ipcOpenDevTool
} from './ipc';

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
