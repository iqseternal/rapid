import { IpcActionEvent, registerGlobalMiddleware, registerIpcHandle, registerIpcOn } from './framework';
import { ipcExceptionFilterMiddleware, ipcResponseMiddleware } from './middlewares';

import { ipcAppStoreClear, ipcAppStoreDelete, ipcAppStoreGet, ipcAppStoreGetStore, ipcAppStoreHas, ipcAppStoreReset, ipcAppStoreSet } from './handlers';
import {
  ipcWindowResizeAble, ipcWindowWorkAreaSize, ipcWindowShow, ipcWindowSetSize,
  ipcWindowSetPosition, ipcWindowSetMinimumSize, ipcWindowResetCustomSize, ipcWindowRelaunch,
  ipcWindowReductionSize, ipcWindowProperties, ipcWindowMinimize, ipcWindowMaximize, ipcWindowClose
} from "./handlers";
import { ipcOnBroadcast } from './handlers';
import { ipcOpenDevTool } from './handlers';
import { ipcForwardDataTakeIn, ipcForwardDataTakeOut } from './handlers';


export class IpcMainManager {


  public static async start() {

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
