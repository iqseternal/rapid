import 'reflect-metadata';
import './process';

import { registerGlobalMiddleware, registerIpcHandle, registerIpcOn, IpcActionEvent } from '@/core/ipc';
import { setupTrayMenu, setupMainWindow } from './setupService';
import { setupApp } from './setupApp';

import {
  ipcWindowClose, ipcWindowMaximize, ipcWindowMinimize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize, ipcWindowShow,
  ipcWindowSetMinimumSize,
  ipcWindowProperties,
  ipcWindowWorkAreaSize,

  ipcAppStoreDelete, ipcAppStoreClear, ipcAppStoreGet, ipcAppStoreGetStore,
  ipcAppStoreReset, ipcAppStoreHas, ipcAppStoreSet,
  ipcOpenDevTool,

  ipcForwardDataTakeIn, ipcForwardDataTakeOut,
  ipcOnBroadcast,
} from './ipc';
import { ipcExceptionFilterMiddleware } from './ipc/middlewares';

registerIpcHandle([
  ipcWindowClose, ipcWindowMaximize, ipcWindowMinimize, ipcWindowReductionSize, ipcWindowRelaunch,
  ipcWindowResetCustomSize, ipcWindowResizeAble, ipcWindowSetPosition, ipcWindowSetSize, ipcWindowShow,
  ipcWindowSetMinimumSize,
  ipcWindowProperties,
  ipcWindowWorkAreaSize
]);
registerIpcHandle([
  ipcAppStoreDelete, ipcAppStoreClear, ipcAppStoreGet, ipcAppStoreGetStore,
  ipcAppStoreReset, ipcAppStoreHas, ipcAppStoreSet
]);
registerIpcHandle([ipcOpenDevTool]);
registerIpcHandle([ipcForwardDataTakeIn, ipcForwardDataTakeOut]);
registerIpcOn([ipcOnBroadcast]);

registerGlobalMiddleware(IpcActionEvent.Handle, [ipcExceptionFilterMiddleware]);
registerGlobalMiddleware(IpcActionEvent.On, [ipcExceptionFilterMiddleware]);

setupApp(async () => {
  await setupMainWindow();
  await setupTrayMenu();
});



