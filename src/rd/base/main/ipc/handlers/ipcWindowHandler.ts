import { screen } from 'electron';
import type { BrowserWindowConstructorOptions } from 'electron';
import { WindowService } from '../../service/WindowService';
import { RuntimeException, TypeException } from '../../exceptions';
import { isNumber, isString, isUnDef, isDef } from '@rapid/libs';
import { AppConfigService } from '../../service/AppConfigService';
import { toMakeIpcAction } from '@rapid/m-ipc-core';
import { convertWindowServiceMiddleware } from '../middlewares';
import { posix } from 'path';
import { userConfigStore } from '../../../main/stores';
import { WindowServiceStateMachine } from '../../service/WindowServiceStateMachine';
import { AppRouterService } from '../../service/AppRouterService';

const { makeIpcHandleAction } = toMakeIpcAction<[WindowService]>({
  handleMiddlewares: [convertWindowServiceMiddleware]
});

/**
 * 窗口最大化, 可以在 options 中传递制定 id 来控制某个窗口
 */
export const ipcWindowMaximize = makeIpcHandleAction(
  'IpcWindow/maxSize',
  [],
  async (windowService, options?: { id?: number;windowKey?: string; }) => {
    const { id, windowKey } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);
    if (windowService.window.isMaximizable()) windowService.window.maximize();
  }
);

/**
 * 窗口最小化, 可以在 options 中传递制定 id 来控制某个窗口
 */
export const ipcWindowMinimize = makeIpcHandleAction(
  'IpcWindow/minSize',
  [],
  async (windowService, options?: { id?: number;windowKey?: string; }) => {
    const { id, windowKey } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);
    if (windowService.window.isMinimizable()) windowService.window.minimize();
  }
);

/**
 * 窗口还原指令, 还原窗口大小
 */
export const ipcWindowReductionSize = makeIpcHandleAction(
  'IpcWindow/reduction',
  [],
  async (windowService, options?: { id?: number;windowKey?: string; }) => {
    const { id, windowKey } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);
    // 如果窗口最大化状态, 那么还原他
    if (windowService.window.isMaximized()) {
      windowService.window.restore();
      return;
    }
    // 否则最大化他
    windowService.window.maximize();
  }
);

/**
 * 设置窗口是否可以调整大小尺寸
 */
export const ipcWindowResizeAble = makeIpcHandleAction(
  'IpcWindow/resizeAble',
  [],
  async (windowService, options?: { id?: number;windowKey?: string;resizeAble: boolean; }) => {
    const { id, windowKey, resizeAble = true } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);

    windowService.window.setResizable(resizeAble);
  }
);

/**
 * 重新加载某个窗口页面
 */
export const ipcWindowRelaunch = makeIpcHandleAction(
  'IpcWindow/relaunch',
  [],
  async (windowService, options?: { id?: number;windowKey?: string; }) => {
    const { id, windowKey } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);
    windowService.window.reload();
  }
);

/**
 * 设置窗口的最小尺寸大小
 */
export const ipcWindowSetMinimumSize = makeIpcHandleAction(
  'IpcWindow/setMinimumSize',
  [],
  async (windowService, options: {
    id?: number;
    windowKey?: string;
    width: number;
    height: number;
  }) => {
    const { id, windowKey, width, height } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);

    windowService.window.setMinimumSize(width, height);
  }
);

/**
 * 设置窗口的当前尺寸
 */
export const ipcWindowSetSize = makeIpcHandleAction(
  'IpcWindow/setSize',
  [],
  async (windowService, options: {
    id?: number
    windowKey?: string;
    width: number,
    height: number
  }) => {
    const { id, windowKey, width, height } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);

    if (windowService.window.isMaximized()) windowService.window.restore();
    windowService.window.setSize(width, height);
  }
);

/**
 * 重置窗口为制定大小, 用于记忆化窗口尺寸
 */
export const ipcWindowResetCustomSize = makeIpcHandleAction(
  'IpcWindow/resetCustomSize',
  [],
  async (windowService, options: {
    id?: number,
    windowKey?: string;
    type: 'mainWindow'
  }) => {
    const { id, windowKey } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);

    const appConfigService = AppConfigService.getInstance();

    if (options.type === 'mainWindow') {
      const { minWidth, minHeight } = appConfigService.config.windows.mainWindow;
      windowService.window.setMinimumSize(minWidth, minHeight);

      const { width: appWidth, height: appHeight } = appConfigService.config.windows.mainWindow;

      const userWidth = userConfigStore.get('mainWindowMemoryWidth') ?? appWidth;
      const userHeight = userConfigStore.get('mainWindowMemoryHeight') ?? appHeight;

      const [width, height] = windowService.window.getSize();
      const [positionX, positionY] = windowService.window.getPosition();

      const targetWidth: number = userWidth, targetHeight: number = userHeight;
      // let gapWidth: number, gapHeight: number;
      let targetPx: number, targetPy: number;

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

/**
 * 设置窗口的位置
 */
export const ipcWindowSetPosition = makeIpcHandleAction(
  'IpcWindow/setPosition',
  [],
  async (windowService, options: {
    id?: number,
    windowKey?: string;
    x: 'center' | 'left' | 'right' | number
    y: 'center' | 'top' | 'bottom' | number
  }) => {
    const { id, windowKey } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);

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

/**
 * TODO: 需要改进
 */
export const ipcOpenWindow = makeIpcHandleAction(
  'IpcWindow/openWindow',
  [],
  async (_, options: { windowKey?: string; subUrl: string; }, browserWindowOptions: Partial<BrowserWindowConstructorOptions>) => {
    const { windowKey, subUrl } = options;

    let targetWindowService: WindowService | null = null;

    if (isString(windowKey)) targetWindowService = WindowServiceStateMachine.findWindowService(windowKey);
    if (isUnDef(targetWindowService)) {
      targetWindowService = new WindowService(browserWindowOptions, {
        windowKey,
        // url: posix.join(PAGES_WINDOW_MAIN, subUrl),
        url: subUrl,
        autoLoad: true
      })
    }

    if (!targetWindowService.window.isVisible()) targetWindowService.show();
  }
);

/**
 * 关闭窗口
 */
export const ipcWindowClose = makeIpcHandleAction(
  'IpcWindow/closeWindow',
  [],
  async (windowService, options?: {
    windowKey?: string;
    id?: number,
    /**
     * 遮掩的。为 true, 那么窗口不会正常地销毁, 而只是隐藏掉
     */
    fictitious?: boolean
  }) => {

    const { id, windowKey, fictitious = false } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);

    const mainWindowService = WindowService.findWindowService(AppRouterService.Routes.MainWindow);
    // 主窗口只能隐藏
    if (WindowService.isSameWindowService(mainWindowService, windowService)) {
      windowService.window.hide();
      return;
    }

    // 虚假地销毁
    if (fictitious) {
      windowService.window.hide();
      return;
    }

    windowService.destroy();
  }
);

/**
 * 显示窗口, 如果窗口存在, 并且是隐藏地情况下
 */
export const ipcWindowShow = makeIpcHandleAction(
  'IpcWindow/showWindow',
  [],
  async (windowService: WindowService, options: {
    id?: number
    windowKey?: string;
    show: boolean
  }) => {
    const { id, windowKey, show } = options ?? {};
    const targetKey = windowKey ?? id;
    if (targetKey) windowService = WindowService.findWindowService(targetKey);

    const isVisible = windowService.window.isVisible();
    if (show) {
      if (!isVisible) windowService.window.show();
      return;
    }

    if (isVisible) windowService.window.hide();
  }
);

/**
 * TODO:
 */
export declare interface WindowProperties {
  width: number;
  height: number;
  x: number;
  y: number;
}

/**
 * TODO: 需要改进, 理想作用是通过一个 ipc 设置多个 window 属性
 */
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

/**
 * 获取展示窗口的尺寸
 */
export const ipcWindowWorkAreaSize = makeIpcHandleAction(
  'IpcWindow/workAreaSize',
  [],
  async () => {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;

    // throw new RuntimeException('自定义');

    return { width, height } as const;
  }
)
