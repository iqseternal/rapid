import { WindowServiceStateMachine } from 'rd/base/plats/service/WindowServiceStateMachine';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { AppConfigService } from 'rd/base/plats/service/AppConfigService';
import { WindowService } from 'rd/base/plats/service/WindowService';
import { IS_DEV } from '@rapid/config/constants';
import { join } from 'path';
import { Menu, Tray, app, nativeImage } from 'electron';
import { AppInformationService } from 'rd/base/common/service/AppInformationService';
import { AppRouterService } from '../service/AppRouterService';

const iconUrl = join(__dirname, '../../resources/icon.ico');

/**
 * 窗口构建流程
 */
export class WindowFlowService {



  /**
   * 构建主窗口
   */
  public static async setupMainWindowService() {
    const mainWindowService = WindowServiceStateMachine.findWindowService(AppRouterService.Routes.MainWindow);
    if (mainWindowService) return mainWindowService;

    PrinterService.printInfo('窗口开始构建');
    const appConfigService = AppConfigService.getInstance();
    const appInformation = AppInformationService.getInstance();

    const windowService = new WindowService(appConfigService.config.windows.mainWindow, {
      url: AppRouterService.Routes.MainWindow,
      autoLoad: true,
      windowKey: AppRouterService.Routes.MainWindow
    });

    windowService.window.setMenu(null);
    windowService.window.webContents.setFrameRate(144);
    windowService.window.webContents.setWindowOpenHandler((details) => {
      if (details.url) {
        return {
          action: 'allow',
          overrideBrowserWindowOptions: {
            title: appInformation.information.appName,
            width: 1000,
            height: 700,
            icon: iconUrl,
            webPreferences: {

            },
            modal: false,
            autoHideMenuBar: true,
            frame: true
          }
        }
      }
      return { action: 'deny' };
    });
    if (IS_DEV) windowService.window.webContents.openDevTools({ mode: 'detach' });
    return windowService;
  }

  /**
   * 构建弹窗面板
   */
  public static async setupPanelWindowService() {


  }
}
