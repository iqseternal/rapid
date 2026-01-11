import { WindowServiceStateMachine } from 'rd/base/main/service/WindowServiceStateMachine';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { AppConfigService } from 'rd/base/main/service/AppConfigService';
import { WindowService } from 'rd/base/main/service/WindowService';
import { join } from 'path';
import { screen, type BrowserWindowConstructorOptions } from 'electron';
import { AppInformationService } from 'rd/base/common/service/AppInformationService';
import { AppRouterService } from 'rd/base/main/service/AppRouterService';
import { userConfigStore } from 'rd/base/main/stores';
import { debounce } from 'lodash';
import { machine } from 'os';

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

    const workAreaSize = screen.getPrimaryDisplay().workArea;

    const appConfigService = AppConfigService.getInstance();
    const appInformation = AppInformationService.getInstance();


    const windowConstructorOptionsSize = {
      width: userConfigStore.get('mainWindowMemoryWidth', appConfigService.config.windows.mainWindow.width),
      height: userConfigStore.get('mainWindowMemoryHeight', appConfigService.config.windows.mainWindow.height),
    }

    const windowConstructorOptionsSizePosition = {
      x: userConfigStore.get('mainWindowMemoryX', workAreaSize.width * 0.5 - windowConstructorOptionsSize.width * 0.5),
      y: userConfigStore.get('mainWindowMemoryY', workAreaSize.height * 0.5 - windowConstructorOptionsSize.height * 0.5),
    }

    const windowService = new WindowService(
      {
        ...appConfigService.config.windows.mainWindow,

        width: windowConstructorOptionsSize.width,
        height: windowConstructorOptionsSize.height,

        x: windowConstructorOptionsSizePosition.x,
        y: windowConstructorOptionsSizePosition.y,
      },
      {
        url: AppRouterService.Routes.MainWindow,
        autoLoad: true,
        windowKey: AppRouterService.Routes.MainWindow,
      }
    );

    windowService.window.setMenu(null);
    windowService.window.setMenuBarVisibility(false);

    windowService.window.webContents.setFrameRate(144);
    windowService.window.webContents.setZoomLevel(1);
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

      return {
        action: 'deny',
      };
    });


    const saveWindowSizeToConfig = debounce(() => {
      const bounds = windowService.window.getBounds();
      userConfigStore.set('mainWindowMemoryWidth', bounds.width);
      userConfigStore.set('mainWindowMemoryHeight', bounds.height);
    }, 1000);

    const saveWindowPositionToConfig = debounce(() => {
      const bounds = windowService.window.getBounds();
      userConfigStore.set('mainWindowMemoryX', bounds.x);
      userConfigStore.set('mainWindowMemoryY', bounds.y);
    }, 1000);


    windowService.window.on('resize', saveWindowSizeToConfig);
    windowService.window.on('moved', saveWindowPositionToConfig);

    if (IS_DEV) windowService.window.webContents.openDevTools({ mode: 'detach' });
    return windowService;
  }

  /**
   * 构建弹窗面板
   */
  public static async setupPanelWindowService() {


  }
}
