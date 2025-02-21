import { IpcActionEvent, registerGlobalMiddleware, registerIpcHandle, registerIpcOn } from './framework';
import { ipcExceptionFilterMiddleware, ipcResponseMiddleware } from './middlewares';

import { ipcAppStoreClear, ipcAppStoreDelete, ipcAppStoreGet, ipcAppStoreGetStore, ipcAppStoreHas, ipcAppStoreReset, ipcAppStoreSet } from './handlers/ipcStoreHandler';
import {
  ipcWindowResizeAble, ipcWindowWorkAreaSize, ipcWindowShow, ipcWindowSetSize,
  ipcWindowSetPosition, ipcWindowSetMinimumSize, ipcWindowResetCustomSize, ipcWindowRelaunch,
  ipcWindowReductionSize, ipcWindowProperties, ipcWindowMinimize, ipcWindowMaximize, ipcWindowClose
} from './handlers/ipcWindowHandler';
import { ipcOnBroadcast } from './handlers/ipcBroadcast';
import { ipcOpenDevTool } from './handlers/ipcDevToolHandler';
import { ipcForwardDataTakeIn, ipcForwardDataTakeOut } from './handlers/ipcForwardDataHandler';


export class IpcMainManager {


  public async startUp() {

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

    registerGlobalMiddleware(IpcActionEvent.Handle, [ipcExceptionFilterMiddleware, ipcResponseMiddleware]);
    registerGlobalMiddleware(IpcActionEvent.On, [ipcExceptionFilterMiddleware, ipcResponseMiddleware]);
  }
}
