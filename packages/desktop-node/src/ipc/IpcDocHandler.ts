import { IpcMain, FrameworkIpcHandler } from '@rapid/framework';

@IpcMain.IpcController()
export class IpcDocHandler extends FrameworkIpcHandler {
  public readonly id = 'IpcDoc';

}
