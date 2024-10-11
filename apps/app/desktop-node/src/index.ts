import 'reflect-metadata';
import './process';

import { registerGlobalMiddleware, registerIpcHandle, registerIpcOn, IpcActionEvent } from '@/core/ipc';
import { setupMainWindow, setupTrayMenu } from './setupService';
import { setupApp } from './setupApp';

import {
  ipcWindowClose, ipcWindowMaxSize, ipcWindowMinSize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize, ipcWindowShow,
  ipcWindowSetMinimumSize,
  ipcWindowProperties,

  ipcOpenWindow,

  ipcStoreClear, ipcStoreDelete, ipcStoreGet, ipcStoreReset,
  ipcStoreSet, ipcStoreHas, ipcStoreGetStore,

  ipcRdDocSave, ipcRdDocExpose, ipcRdDocImport, ipcRdDocOpen, ipcRdDocSaveAs,

  ipcOpenDevTool,

  ipcForwardDataTakeIn, ipcForwardDataTakeOut,
  ipcOnBroadcast,
} from './ipc';
import { ipcExceptionFilterMiddleware } from './ipc/middlewares';

registerIpcHandle([
  ipcWindowClose, ipcWindowMaxSize, ipcWindowMinSize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize, ipcWindowShow,
  ipcWindowSetMinimumSize,
  ipcWindowProperties
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

registerIpcHandle([ipcForwardDataTakeIn, ipcForwardDataTakeOut]);
registerIpcOn([ipcOnBroadcast]);

registerGlobalMiddleware(IpcActionEvent.Handle, [ipcExceptionFilterMiddleware]);
registerGlobalMiddleware(IpcActionEvent.On, [ipcExceptionFilterMiddleware]);

setupApp(async () => {
  await setupMainWindow();
  await setupTrayMenu();
});





