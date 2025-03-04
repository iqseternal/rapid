import { WindowServiceStateMachine } from 'rd/base/plats/service/WindowServiceStateMachine';
import { join } from 'path';
import { Menu, Tray, app, nativeImage } from 'electron';
import { WindowFlowService } from './WindowFlowService';
import { AppInformationService } from '../../common/service/AppInformationService';
import { AppRouterService } from '../service/AppRouterService';

const iconUrl = join(__dirname, '../../resources/icon.ico');

/**
 * 构建托盘服务流程
 */
export class TrayMenuFlowService {

  /**
   * 创建托盘
   */
  public static async setupTrayMenu() {
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
        label: '没什么用的选项1',
        type: 'radio',
        click: () => {

          console.log('click');
        }
      },
      { label: '没用的选项2', type: 'radio' },
      { label: '没用的选项3', type: 'radio', checked: true },
      { label: '没用的选项4', type: 'radio' },
      { type: 'separator' },
      { label: '????', type: 'normal' },

      { type: 'separator' },
      {
        label: '退出',
        type: 'normal',
        click: () => app.quit()
      }
    ])

    tray.setContextMenu(contextMenu);

    return tray;
  }
}
