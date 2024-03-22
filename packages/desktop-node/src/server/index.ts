import { WindowService } from '@/service/WindowService';
import { FrameworkIpcHandlerServer, FrameworkLoggerServer, IPC_EMITTER_TYPE } from '@rapid/framework';
import { PrinterService } from '@/service/PrinterService';

export class LoggerServer extends FrameworkLoggerServer {
  info(...message: unknown[]): void {
    PrinterService.printInfo(...message);
  }

  warn(...message: unknown[]): void {
    PrinterService.printWarn(...message);
  }

  error(...message: unknown[]): void {
    PrinterService.printError(...message);
  }
}

export class IpcHandlerServer extends FrameworkIpcHandlerServer<WindowService> {
  convertArgs(type: IPC_EMITTER_TYPE, e: Electron.IpcMainInvokeEvent, ...args: unknown[]): [WindowService, ...unknown[]] {
    const windowService = WindowService.findWindowService(e);

    return [windowService, ...args];
  }
}





