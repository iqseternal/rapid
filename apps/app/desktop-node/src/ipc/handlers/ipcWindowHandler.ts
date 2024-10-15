import { screen } from 'electron';
import type { BrowserWindowConstructorOptions } from 'electron';
import { isSameWindowService, WindowService, WindowStateMachine } from '@/core/service/WindowService';
import { TypeException } from '@/core';
import { isNumber, isString, isUnDef } from '@suey/pkg-utils';
import { AppConfigService } from '@/core/service/AppConfigService';
import { UserConfigService } from '@/core/service/UserConfigService';
import { toMakeIpcAction } from '@/core/ipc';
import { convertWindowServiceMiddleware } from '@/ipc/middlewares';
import { PAGES_WINDOW_MAIN } from '@/config';
import { posix } from 'path';

const { makeIpcHandleAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowServiceMiddleware]
});

export const ipcWindowMaxSize = makeIpcHandleAction(
  'IpcWindow/maxSize',
  [],
  async (windowService, options?: { id: number }) => {
    if (options?.id) {
      windowService = WindowService.findWindowService(options.id);
    }

    if (windowService.window.isMaximizable()) windowService.window.maximize();
  }
);

export const ipcWindowMinSize = makeIpcHandleAction(
  'IpcWindow/minSize',
  [],
  async (windowService, options?: { id: number }) => {
    if (options?.id) {
      windowService = WindowService.findWindowService(options.id);
    }
    if (windowService.window.isMinimizable()) windowService.window.minimize();
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

export const ipcWindowSetMinimumSize = makeIpcHandleAction(
  'IpcWindow/setMinimumSize',
  [],
  async (windowService, options: {
    id?: number
    width: number,
    height: number
  }) => {
    windowService.window.setMinimumSize(options.width, options.height);
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

    // windowService.window.setMinimumSize(0, 0);
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
  async (_, options: { windowKey?: string; subUrl: string; }, browserWindowOptions: Partial<BrowserWindowConstructorOptions>) => {
    const { windowKey, subUrl } = options;

    let targetWindowService: WindowService | null = null;

    if (isString(windowKey)) targetWindowService = WindowStateMachine.findWindowService(windowKey);
    if (isUnDef(targetWindowService)) {
      targetWindowService = new WindowService(browserWindowOptions, {
        windowKey,
        url: posix.join(PAGES_WINDOW_MAIN, subUrl),
        autoLoad: true
      })
    }

    if (!targetWindowService!.window.isVisible()) targetWindowService!.show();
  }
);

export const ipcWindowClose = makeIpcHandleAction(
  'IpcWindow/closeWindow',
  [],
  async (windowService, options?: { windowKey?: string;fictitious?: boolean }) => {
    const {
      windowKey,
      fictitious = false
    } = options ?? {};

    if (isString(windowKey)) {
      const targetWindowService = WindowService.findWindowService(windowKey);
      if (fictitious) targetWindowService.window.hide();

      return targetWindowService.destroy();
    }

    const mainWindowService = WindowService.findWindowService(PAGES_WINDOW_MAIN);

    if (isSameWindowService(mainWindowService, windowService)) {
      return windowService.window.hide();
    }

    if (fictitious) return windowService.window.hide();
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
    const isVisible = windowService.window.isVisible();

    if (options.show) {
      if (!isVisible) windowService.window.show();
    }
    else {
      if (isVisible) windowService.window.hide();
    }
  }
);

declare interface WindowProperties {
  width: number;
  height: number;
  x: number;
  y: number;
}
export const ipcWindowProperties = makeIpcHandleAction(
  'IpcWindow/properties',
  [],
  async (windowService, selectedOptions: { windowKey?: string; }, properties: Partial<WindowProperties>) => {
    const { windowKey } = selectedOptions;

    if (isString(windowKey)) {
      const service = WindowService.findWindowService(windowKey);
      if (service) windowService = service;
    }

    if (isNumber(properties.width)) windowService.window.setSize(properties.width, windowService.window.getSize()[1]);
    if (isNumber(properties.height)) windowService.window.setSize(windowService.window.getSize()[0], properties.height);

    if (isNumber(properties.x)) windowService.window.setPosition(properties.x, windowService.window.getPosition()[1]);
    if (isNumber(properties.y)) windowService.window.setPosition(windowService.window.getPosition()[0], properties.y);
  }
)

