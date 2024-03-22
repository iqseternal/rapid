import { app, type IpcMainInvokeEvent, type OpenDevToolsOptions } from 'electron';
import { IpcMain, IPC_EMITTER_TYPE, FrameworkIpcHandler } from '@rapid/framework';
import { IS_DEV, StoreKeyMap, WINDOW_STATE_MACHINE_KEYS } from '@rapid/config/constants';
import { WindowService } from '@/service/WindowService';
import { setWindowOpenHandler, getWindowFromId, getWindowFromIpcEvt } from '@/core/common/window';
import { screen } from 'electron';
import { reloadApp } from '../core/common/app';
import { PrinterService } from '@/service/PrinterService';
import { RuntimeException, PermissionException, TypeException } from '../common/exceptions';
import { isNumber, isString, isUndefined } from '@suey/pkg-utils';
import { AppConfigService } from '@/service/AppConfigService';
import { UserConfigService } from '@/service/UserConfigService';
import { setupSettingWindow } from '../setupService';
import { print } from '@suey/printer';

@IpcMain.IpcController()
export class IpcWindowHandler extends FrameworkIpcHandler {
  public readonly id = 'IpcWindow';

  @IpcMain.Handler()
  maxSize(windowService: WindowService, id?: number) {
    windowService.window.maximize();
  }

  @IpcMain.Handler()
  minSize(windowService: WindowService, id?: number) {

    windowService.window.minimize();
  }

  @IpcMain.Handler()
  reduction(windowService: WindowService, id?: number) {

    if (windowService.window.isMaximized()) {
      windowService.window.restore();
      return true;
    }
    windowService.window.maximize();
    return true;
  }

  @IpcMain.Handler()
  resizeAble(windowService: WindowService, options: {
    id?: number,
    able: boolean
  }) {
    windowService.window.setResizable(options.able);
  }

  @IpcMain.Handler()
  relanuch(windowService: WindowService) {
    reloadApp();
  }

  @IpcMain.Handler()
  setSize(windowService: WindowService, options: {
    id?: number
    width: number,
    height: number
  }) {
    if (windowService.window.isMaximized()) windowService.window.restore();

    windowService.window.setMinimumSize(0, 0);
    windowService.window.setSize(options.width, options.height);
  }

  @IpcMain.Handler()
  resetCustomSize(windowService: WindowService, options: {
    id?: number,
    type: 'mainWindow'
  }) {
    const appConfigService = AppConfigService.getInstance();
    const userConfigService = UserConfigService.getInstance();

    if (options.type === 'mainWindow') {
      const { minWidth, minHeight } = appConfigService.config.windows.mainWindow;
      windowService.window.setMinimumSize(minWidth, minHeight);

      const { width: userWidth, height: userHeight } = userConfigService.config.windows.mainWindow;
      const { width: appWidth, height: appHeight } = appConfigService.config.windows.mainWindow;

      const [width, height] = windowService.window.getSize();
      const [positionX, positionY] = windowService.window.getPosition();

      let targetWidth: number = 0, targetHeight: number = 0;
      let gapWidth: number = 0, gapHeight: number = 0;
      let targetPx: number = 0, targetPy: number = 0;

      if (!userWidth || !userHeight) targetWidth = appWidth, targetHeight = appHeight;
      else targetWidth = userWidth, targetHeight = userHeight;

      gapWidth = (targetWidth - width) * (targetWidth > width ? 1 : -1);
      gapHeight = (targetHeight - height) * (targetHeight > height ? 1 : -1);

      targetPx = positionX + gapWidth / 2 * -1;
      targetPy = positionY + gapHeight / 2 * -1;

      // 取消这是因为当前使用的标题栏在屏幕上方, 如果按中心改变位置, 可能出现看不到标题栏从而无法拖动的情况
      if (targetPx <= 10) targetPx = positionX;
      if (targetPy <= 50) targetPy = positionY;

      windowService.window.setPosition(targetPx, targetPy);
      windowService.window.setSize(targetWidth, targetHeight);
      return true;
    }

    throw new TypeException('传入了未指定类型 type', {
      label: `${IpcWindowHandler.name}:resetCustomSize`
    })
  }

  @IpcMain.Handler()
  setPosition(windowService: WindowService, options: {
    id?: number,
    x: 'center' | 'left' | 'right' | number
    y: 'center' | 'top' | 'bottom' | number
  }) {
    const { x, y } = options;

    const [currentPx, currentPy] = windowService.window.getPosition();
    const [width, height] = windowService.window.getSize();
    const { width: maxScreenWidth, height: maxScreenHeight } = screen.getPrimaryDisplay().size;

    let targetPx = currentPx, targetPy = currentPy;

    if (isNumber(x)) targetPx = x;
    else {
      if (x === 'center') targetPx = maxScreenWidth / 2 - width / 2;
      else if (x === 'left') { targetPx -= width; }
      else if (x === 'right') { targetPx += width; }
    }

    if (isNumber(y)) targetPy = y;
    else {
      if (y === 'center') targetPy = maxScreenHeight / 2 - height / 2;
      else if (y === 'top') { targetPy -= height; }
      else if (y === 'bottom') { targetPy += height; }
    }

    windowService.window.setPosition(targetPx, targetPy);
  }

  @IpcMain.Handler()
  async openWindow(windowService: WindowService, type: WINDOW_STATE_MACHINE_KEYS) {
    if (type === WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW) {
      const settingWindowService = await setupSettingWindow(windowService);
      settingWindowService.open();
    }
  }

  @IpcMain.Handler()
  closeWindow(windowService: WindowService, id?: number) {
    windowService.destroy();
  }

  @IpcMain.Handler()
  showWindow(windowService: WindowService, options: {
    id?: number
    show: boolean
  }) {
    if (options.show) windowService.window.show();
    else windowService.window.hide();
  }
}





