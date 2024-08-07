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
  ipcWindowClose, ipcWindowMaxSize, ipcWindowMinSize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize, ipcWindowShow,

  ipcOpenWindow,

  ipcStoreClear, ipcStoreDelete, ipcStoreGet, ipcStoreReset,
  ipcStoreSet, ipcStoreHas, ipcStoreGetStore,

  ipcRdDocSave, ipcRdDocExpose, ipcRdDocImport, ipcRdDocOpen, ipcRdDocSaveAs,

  ipcOpenDevTool
} from './ipc';

registerIpcHandle([
  ipcWindowClose, ipcWindowMaxSize, ipcWindowMinSize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize, ipcWindowShow
]);
registerIpcHandle([ipcOpenWindow]);
registerIpcHandle([
  ipcStoreClear, ipcStoreDelete, ipcStoreGet, ipcStoreReset,
  ipcStoreSet, ipcStoreHas, ipcStoreGetStore
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

  await setupMainWindow();
  await setupTrayMenu();

}, {
  onFailed: async (err) => {
    // const reportBugsWindowService = await setupReportBugsWindow();

    // reportBugsWindowService.show();
  }
});
