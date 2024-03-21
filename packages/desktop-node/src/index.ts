import './global';
import { PrinterService } from '@/service/PrinterService';
import { setupMainWindow } from './setupService';
import { WindowService } from '@/service/WindowService';
import { setupIpcMainHandler, FrameworkIpcServer, IPC_EMITTER_TYPE } from '@rapid/framework';
import { setupApp } from './setupApp';

import * as IpcModules from './setupHandles';

// setupFilter({ use: FilterServer, modules: [] })
// setupLogger({ use: LoggerServer })

class IpcServer extends FrameworkIpcServer<WindowService> {
  convertArgs(type: IPC_EMITTER_TYPE, e: Electron.IpcMainInvokeEvent, ...args: unknown[]): [WindowService, ...unknown[]] {
    const windowService = WindowService.findWindowService(e);

    return [windowService, ...args];
  }
}



setupIpcMainHandler({
  use: IpcServer,
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
