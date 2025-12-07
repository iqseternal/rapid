import { IpcMainManager } from 'rd/base/main/ipc';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { WindowFlowService } from './flow/WindowFlowService';
import { WindowServiceStateMachine } from 'rd/base/main/service/WindowServiceStateMachine';
import { join } from 'path';
import { Menu, Tray, app, nativeImage } from 'electron';
import { AppInformationService } from 'rd/base/common/service/AppInformationService';
import { AppRouterService } from 'rd/base/main/service/AppRouterService';

/**
 * 设置应用监听事件
 */
export async function setupAppListeners() {

  // ========== 所有窗口关闭
  // ========== 在 windows 系统上, 关闭所有窗口通常会退出应用程序
  app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
      PrinterService.printInfo('窗口已关闭, 应用程序即将退出');
      app.quit();
    }
  });

  // ========== 激活应用
  app.on('activate', async () => {

  });

  if (IS_DEV) {
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });
  }
}

/**
 * 设置托盘菜单
 */
export async function setupTrayMenu() {
  const iconUrl = join(__dirname, '../../resources/icon.ico');

  const appInformation = AppInformationService.getInstance();
  const tray = new Tray(nativeImage.createFromPath(iconUrl));

  tray.on('click', async () => {
    const mainWindowService = WindowServiceStateMachine.findWindowService(AppRouterService.Routes.MainWindow);
    if (!mainWindowService) {
      await WindowFlowService.setupMainWindowService();
      return;
    }

    if (mainWindowService.window.isVisible()) {
      mainWindowService.window.focus();
    }
    else mainWindowService.window.show();
  });

  tray.setTitle(appInformation.information.appName);
  tray.setToolTip(appInformation.information.appName);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: '退出',
      type: 'normal',
      click: () => app.quit()
    }
  ])

  tray.setContextMenu(contextMenu);

  return tray;
}

export class CodeMain {

  public async main() {
    await IpcMainManager.start();

    await setupAppListeners();

    await app.whenReady();

    electronApp.setAppUserModelId(`com.electron`);

    await WindowFlowService.setupMainWindowService();

    await setupTrayMenu();
  }
}
