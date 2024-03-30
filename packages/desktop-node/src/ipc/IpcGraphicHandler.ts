import { IpcMain, FrameworkIpcHandler, Deprecated } from '@rapid/framework';

@IpcMain.IpcController()
export class IpcGraphicHandler extends FrameworkIpcHandler {
  public readonly id = 'IpcGraphic';

  @IpcMain.Handler()
  getSystemGraphics() {


    return [];
  }
}
