import { app , screen } from 'electron';
import { IpcMain, FrameworkIpcHandler } from '@rapid/framework';
import { WINDOW_STATE_MACHINE_KEYS } from '@rapid/config/constants';
import { isSameWindowService, WindowService, WindowStateMachine } from '@/service/WindowService';
import { TypeException } from '@/core';
import { isNumber } from '@suey/pkg-utils';
import { AppConfigService } from '@/service/AppConfigService';
import { UserConfigService } from '@/service/UserConfigService';
import { setupReportBugsWindow, setupSettingWindow } from '@/setupService';

/**
 * Ipc 关于窗口操作的 句柄
 */
@IpcMain.IpcController()
export class IpcWindowHandler extends FrameworkIpcHandler {
  public readonly id = 'IpcWindow';

  /**
   * 最大化窗口
   */
  @IpcMain.Handler()
  maxSize(windowService: WindowService, _?: number) {
    windowService.window.maximize();
  }

  /**
   * 最小化窗口
   */
  @IpcMain.Handler()
  minSize(windowService: WindowService, _?: number) {

    windowService.window.minimize();
  }

  /**
   * 重置窗口
   * @returns
   */
  @IpcMain.Handler()
  reduction(windowService: WindowService, _?: number) {

    if (windowService.window.isMaximized()) {
      windowService.window.restore();
      return true;
    }
    windowService.window.maximize();
    return true;
  }

  /**
   * 调整窗口是否可以托拽改变大小
   */
  @IpcMain.Handler()
  resizeAble(windowService: WindowService, options: {
    id?: number,
    able: boolean
  }) {
    windowService.window.setResizable(options.able);
  }

  /**
   * 重启
   */
  @IpcMain.Handler()
  relaunch() {
    app.relaunch();
  }

  /**
   * 设置窗口大小
   * @param windowService
   * @param options
   */
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

  /**
   * 设置窗口为用户的自定义大小
   * @param windowService
   * @param options
   * @returns
   */
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

      let targetWidth: number, targetHeight: number;
      // let gapWidth: number, gapHeight: number;
      let targetPx: number, targetPy: number;

      if (!userWidth || !userHeight) {
        targetWidth = appWidth;
        targetHeight = appHeight;
      }
      else {
        targetWidth = userWidth;
        targetHeight = userHeight;
      }

      const gapWidth = (targetWidth - width) * (targetWidth > width ? 1 : -1);
      const gapHeight = (targetHeight - height) * (targetHeight > height ? 1 : -1);

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
      label: `${this.id}:resetCustomSize`
    })
  }

  /**
   * 设置窗口的位置
   * @param windowService
   * @param options
   */
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

  /**
   * 打开一个内置定义窗口对象
   * @returns
   */
  @IpcMain.Handler()
  async openWindow(_: WindowService, type: WINDOW_STATE_MACHINE_KEYS) {
    const windowService = WindowStateMachine.findWindowService(type);

    if (!windowService) {
      if (type === WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW) await setupSettingWindow();
      else if (type === WINDOW_STATE_MACHINE_KEYS.REPORT_BUGS_WINDOW) await setupReportBugsWindow();

      return;
    }

    windowService.show();
  }

  /**
   * 关闭窗口
   * @returns
   */
  @IpcMain.Handler()
  closeWindow(windowService: WindowService, _?: number) {
    const mainWindowService = WindowStateMachine.findWindowService(WINDOW_STATE_MACHINE_KEYS.MAIN_WINDOW);

    if (isSameWindowService(mainWindowService, windowService)) return windowService.window.hide();

    windowService.destroy();
  }

  /**
   * 管理窗口是否可以显示
   */
  @IpcMain.Handler()
  showWindow(windowService: WindowService, options: {
    id?: number
    show: boolean
  }) {
    if (options.show) windowService.window.show();
    else windowService.window.hide();
  }
}





