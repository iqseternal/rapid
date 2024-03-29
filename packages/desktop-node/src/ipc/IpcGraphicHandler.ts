import { IpcMain, FrameworkIpcHandler, Deprecated } from '@rapid/framework';

@IpcMain.IpcController()
export class IpcGraphicHandler extends FrameworkIpcHandler {

  @IpcMain.Handler()
  getSystemGraphics() {


    return [];
  }
}
