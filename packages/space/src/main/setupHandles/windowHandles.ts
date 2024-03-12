import { BrowserWindow, app, screen, dialog } from 'electron';
import { setIpcMainHandle, sendToRenderer, IpcResponseOk } from '#/code/core/common/ipcR';
import { reloadApp } from '#code/core/common/app';
import { getWindowFrom } from '#/code/core/common/window';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW, WINDOW_STATE_MACHINE_KEYS } from '#/constants';
import { PAGES_WINDOW_SETTING, PAGES_WINDOW_MAIN } from '#/config/pages';

import { WindowService } from '#code/service/WindowService';
import { AppConfigService } from '#/code/service/AppConfigService';
import { UserConfigService } from '#/code/service/UserConfigService';
import { Printer } from '@suey/printer';
import { setupMainWindow, setupSettingWindow } from '../setupService';
import { PrinterService } from '#/code/service/PrinterService';

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_MAX_SIZE, (e, id) => ipcR((ok, fail) => {
  const windowService = WindowService.findWindowService(id ?? e);
  if (!windowService) return fail(void 0, '找不到指定窗口');

  windowService.window.maximize();
  sendToRenderer(windowService.window, IPC_RENDER_WINDOW.WINDOW_STATUS, new IpcResponseOk(true, '最大化了'));
  return ok();
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_MIN_SIZE, (e, id) => ipcR((ok, fail) => {
  const windowService = WindowService.findWindowService(id ?? e);
  if (!windowService) return fail(void 0, '找不到指定窗口');

  windowService.window.minimize();
  return ok();
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_REDUCTION, (e, id?: number) => ipcR((ok, fail) => {
  const windowService = WindowService.findWindowService(id ?? e);
  if (!windowService) return fail(false, '找不到指定窗口');

  if (windowService.window.isMaximized()) {
    windowService.window.restore();
    sendToRenderer(windowService.window, IPC_RENDER_WINDOW.WINDOW_STATUS, new IpcResponseOk(false, '被还原了'));
    return ok(true);
  }
  windowService.window.maximize();
  sendToRenderer(windowService.window, IPC_RENDER_WINDOW.WINDOW_STATUS, new IpcResponseOk(true, '最大化了'));
  return ok(true);
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_RESIZE_ABLE, (e, able: boolean) => ipcR((ok, fail) => {
  const windowService = WindowService.findWindowService(e);
  if (!windowService) return fail(false, '找不到指定窗口');

  windowService.window.setResizable(able);
  return ok(true, '窗口RESIZE更改成功');
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_RELAUNCH, () => ipcR((ok, fail) => {
  reloadApp();
  return ok();
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_SET_SIZE, (e, width, height) => ipcR((ok, fail) => {
  const windowService = WindowService.findWindowService(e);
  if (!windowService) return fail(false, '找不到指定窗口');

  if (windowService.window.isMaximized()) windowService.window.restore();
  windowService.window.setMinimumSize(0, 0);
  windowService.window.setSize(width, height);
  return ok(true);
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_SET_POSITION, (e, _1: number | 'center' | 'left' | 'right' | 'top' | 'bottom', _2?: number) => ipcR((ok, fail) => {
  const windowService = WindowService.findWindowService(e);
  if (!windowService) return fail(false, '找不到指定窗口');

  if (typeof _1 === 'string' && !_2) {
    const type = _1; // 类型, 窗口大小

    const [currentPx, currentPy] = windowService.window.getPosition();
    const [width, height] = windowService.window.getSize();

    if (type === 'center') {
      const { width: maxScreenWidth, height: maxScreenHeight } = screen.getPrimaryDisplay().size;

      const targetPx = maxScreenWidth / 2 - width / 2;
      const targetPy = maxScreenHeight / 2 - height / 2;

      windowService.window.setPosition(targetPx, targetPy, false);
      return ok(true);
    }

    let targetPx = currentPx, targetPy = currentPy;

    if (type === 'left') { targetPx -= width; }
    if (type === 'right') { targetPx += width; }
    if (type === 'top') { targetPy -= height; }
    if (type === 'bottom') { targetPy += height; }
    windowService.window.setPosition(targetPx, targetPy);
    return ok(true);
  }

  if (typeof _1 === 'number' && typeof _2 === 'number') {
    windowService.window.setPosition(_1, _2);
    return ok(true);
  }

  return fail(false, '传参类型有问题');
}));

// 渲染进程改变窗口大小, 在此做了更改大小的时候, 窗口也会更随着自动定位到原来窗口的中心位置扩展
// 例如原本的窗口小, 但在正中间, 那么更改放大之后, 窗口的中心也会在屏幕的正中央
setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_RESET_CUSTOM_SIZE, (e, type) => ipcR((ok, fail) => {
  const windowService = WindowService.findWindowService(e);
  if (!windowService) {
    reloadApp();
    return fail(void 0, '找不到指定窗口');
  }

  const appConfigService = AppConfigService.getInstance();
  const userConfigService = UserConfigService.getInstance();

  if (type === 'mainWindow') {
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
    return ok();
  }

  return fail(void 0, '传入了未指定类型 type');
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_OPEN, (e, type) => ipcR(async (ok, fail) => {
  const windowService = WindowService.findWindowService(e);
  if (!windowService) return fail(false, '找不到指定窗口');

  if (type === WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW) {
    const settingWindowService = await setupSettingWindow(windowService);
    settingWindowService.open();
  }
  return ok(true);
}));

setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_CLOSE, (e, id?: number) => ipcR(async (ok, fail) => {
  const windowService = WindowService.findWindowService(id ?? e);
  if (!windowService) return fail(false, '找不到指定窗口');

  windowService.destroy();
  return ok(true);
}));


setIpcMainHandle(IPC_MAIN_WINDOW.WINDOW_SHOW, (e, show: boolean, id?: number) => ipcR((ok, fail) => {
  const windowService = WindowService.findWindowService(id ?? e);
  if (!windowService) return fail(false, '找不到指定窗口');

  if (show) windowService.window.show();
  else windowService.window.hide();

  return ok(true);
}));
