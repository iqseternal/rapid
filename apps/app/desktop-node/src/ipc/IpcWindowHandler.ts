import { screen } from 'electron';
import { WINDOW_STATE_MACHINE_KEYS, IS_DEV } from '@rapid/config/constants';
import { isSameWindowService, WindowService, WindowStateMachine } from '@/service/WindowService';
import { TypeException } from '@/core';
import { isNumber } from '@suey/pkg-utils';
import { AppConfigService } from '@/service/AppConfigService';
import { UserConfigService } from '@/service/UserConfigService';
import { setupReportBugsWindow, setupSettingWindow } from '@/setupService';
import { toMakeIpcAction } from '@rapid/framework';
import { convertWindowService } from './middlewares';

const { makeIpcHandleAction, makeIpcOnAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowService]
});

export const ipcWindowMaxSize = makeIpcHandleAction(
  'IpcWindow/maxSize',
  [],
  async (windowService, options?: { id: number }) => {
    if (options?.id) {
      windowService = WindowService.findWindowService(options.id);
    }

    if (windowService.window.maximizable) windowService.window.maximize();
  }
);

export const ipcWindowMinSize = makeIpcHandleAction(
  'IpcWindow/minSize',
  [],
  async (windowService, options?: { id: number }) => {
    if (options?.id) {
      windowService = WindowService.findWindowService(options.id);
    }
    if (windowService.window.minimizable) windowService.window.minimize();
  }
);

export const ipcWindowReductionSize = makeIpcHandleAction(
  'IpcWindow/reduction',
  [],
  async (windowService, options?: { id: number }) => {
    if (options?.id) {
      windowService = WindowService.findWindowService(options.id);
    }
    if (windowService.window.isMaximized()) {
      windowService.window.restore();
      return true;
    }
    windowService.window.maximize();
    return true;
  }
);

export const ipcWindowResizeAble = makeIpcHandleAction(
  'IpcWindow/resizeAble',
  [],
  async (windowService, options?: {
    id?: number,
    able: boolean
  }) => {
    const { able = true } = options ?? {};

    windowService.window.setResizable(able);
  }
);

export const ipcWindowRelaunch = makeIpcHandleAction(
  'IpcWindow/relaunch',
  [],
  async (windowService) => {
    windowService.window.reload();
    // app.relaunch();
  }
);

export const ipcWindowSetSize = makeIpcHandleAction(
  'IpcWindow/setSize',
  [],
  async (windowService, options: {
    id?: number
    width: number,
    height: number
  }) => {
    if (windowService.window.isMaximized()) windowService.window.restore();

    windowService.window.setMinimumSize(0, 0);
    windowService.window.setSize(options.width, options.height);
  }
);


export const ipcWindowResetCustomSize = makeIpcHandleAction(
  'IpcWindow/resetCustomSize',
  [],
  async (windowService, options: {
    id?: number,
    type: 'mainWindow'
  }) => {
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
      label: `resetCustomSize`
    })
  }
);


export const ipcWindowSetPosition = makeIpcHandleAction(
  'IpcWindow/setPosition',
  [],
  async (windowService, options: {
    id?: number,
    x: 'center' | 'left' | 'right' | number
    y: 'center' | 'top' | 'bottom' | number
  }) => {
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
);



export const ipcOpenWindow = makeIpcHandleAction(
  'IpcWindow/openWindow',
  [],
  async (_, type: WINDOW_STATE_MACHINE_KEYS) => {
    let windowService = WindowStateMachine.findWindowService(type);

    if (!windowService) {
      if (type === WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW) windowService = await setupSettingWindow();
      else if (type === WINDOW_STATE_MACHINE_KEYS.REPORT_BUGS_WINDOW) windowService = await setupReportBugsWindow();
      else throw new TypeException('错误的窗口KEY', {
        label: `$openWindow`
      })
    }

    return windowService.show();
  }
);

export const ipcWindowClose = makeIpcHandleAction(
  'IpcWindow/closeWindow',
  [],
  async (windowService) => {
    const mainWindowService = WindowStateMachine.findWindowService(WINDOW_STATE_MACHINE_KEYS.MAIN_WINDOW);

    if (isSameWindowService(mainWindowService, windowService)) return windowService.window.hide();

    windowService.destroy();
  }
);

export const ipcWindowShow = makeIpcHandleAction(
  'IpcWindow/showWindow',
  [],
  async (windowService: WindowService, options: {
    id?: number
    show: boolean
  }) => {

    const isMinimized = windowService.window.isMinimized();
    const isVisible = windowService.window.isVisible();


    if (options.show) {
      if (IS_DEV && isMinimized) return;

      if (!isVisible) windowService.window.show();
    }
    else {
      if (isVisible) windowService.window.hide();
    }
  }
);
