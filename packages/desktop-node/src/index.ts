import { setupApp, setupMainHandles, IpcMainHandler, IpcMain, IPC_EMITTER_TYPE } from '@/framework';
import { PrinterService } from '@/service/PrinterService';
import { MainEventHandlers, IPC_MAIN_WINDOW, STORE_KEYS, StoreKeyMap } from '@rapid/config/constants';
import { print } from '@suey/printer';
import { setupMainWindow } from './setupService';
import { WindowStateMachine } from '@/service/WindowService';

import * as IpcModules from './setupHandles';

setupMainHandles({
  async convertIt(value, status) {

    return value;
  },
  modules: [
    IpcModules.IpcDevTool,
    IpcModules.IpcStore,
    IpcModules.IpcWindow
  ]
})

setupApp(async () => {
  const mainWindowService = await setupMainWindow();

  mainWindowService.open();
})
