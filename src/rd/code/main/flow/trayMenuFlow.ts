import { IpcMainManager } from 'rd/base/main/ipc';
import { electronApp, optimizer } from '@electron-toolkit/utils';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { WindowServiceStateMachine } from 'rd/base/main/service/WindowServiceStateMachine';
import { join } from 'path';
import { Menu, Tray, app, nativeImage } from 'electron';
import { AppInformationService } from 'rd/base/common/service/AppInformationService';
import { AppRouterService } from 'rd/base/main/service/AppRouterService';
import { setupMainWindowService } from './windowFlow';

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
      await setupMainWindowService();
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
