import { BrowserWindow, app, screen } from 'electron';
import { setIpcMainHandle, sendToRenderer, IpcResponseOk } from '@/core/common/ipcR';
import { reloadApp } from '@/core/common/app';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW, IS_DEV } from '@rapid/config/constants';
import { PAGES_WINDOW_SETTING, PAGES_WINDOW_MAIN } from '@/config/pages';
import { getWindowFrom } from '@/core/common/window';

import { WindowService } from '@service/WindowService';
import { AppConfigService } from '@service/AppConfigService';
import { UserConfigService } from '@service/UserConfigService';
import { PrinterService } from '@service/PrinterService';

setIpcMainHandle(IPC_MAIN_WINDOW.DEV_OPEN_TOOL, (e, status, options?) => ipcR((ok, fail) => {
  const windowService = WindowService.findWindowService(e);

  if (!windowService) return fail(false, '找不到指定窗口');

  if (status) {
    if (IS_DEV) {
      PrinterService.printInfo(`id: ${e.frameId} 打开了开发者工具`);
      windowService.window.webContents.openDevTools(options);
    }
    else {
      PrinterService.printError(`生产模式, 不允许打开开发者工具`);
      return fail(false, '当前状态不允许打开开发者工具');
    }
  }
  else {
    PrinterService.printInfo(`id: ${e.frameId} 关闭了开发者工具`);
    windowService.window.webContents.closeDevTools();
  }

  return ok(true, 'ok');
}));
