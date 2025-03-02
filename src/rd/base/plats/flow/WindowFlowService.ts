import { WindowServiceStateMachine } from 'rd/base/plats/service/WindowServiceStateMachine';
import { PAGES_WINDOW_MAIN } from 'rd/base/node/config';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { AppConfigService } from 'rd/base/plats/service/AppConfigService';
import { WindowService } from 'rd/base/plats/service/WindowService';
import { CONFIG, IS_DEV } from '@rapid/config/constants';
import { join } from 'path';
import { Menu, Tray, app, nativeImage } from 'electron';

const iconUrl = join(__dirname, '../../resources/icon.ico');

/**
 * 窗口构建流程
 */
export class WindowFlowService {



  /**
   * 构建主窗口
   */
  public static async setupMainWindowService() {
    const mainWindowService = WindowServiceStateMachine.findWindowService(PAGES_WINDOW_MAIN);
    if (mainWindowService) return mainWindowService;

    PrinterService.printInfo('窗口开始构建');
    const appConfigService = AppConfigService.getInstance();

    const windowService = new WindowService(appConfigService.config.windows.mainWindow, {
      url: PAGES_WINDOW_MAIN,
      autoLoad: true,
      windowKey: PAGES_WINDOW_MAIN
    });

    PrinterService.printInfo(PAGES_WINDOW_MAIN);

    windowService.window.setMenu(null);
    windowService.window.webContents.setFrameRate(144);
    windowService.window.webContents.setWindowOpenHandler((details) => {
      PrinterService.printInfo(`打开地址为： ${details.url}`);

      if (details.url) {
        return {
          action: 'allow',
          overrideBrowserWindowOptions: {
            title: CONFIG.PROJECT,
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
    PrinterService.printInfo('主窗口ID, ', windowService.window.id);

    return windowService;


  }

  /**
   * 构建弹窗面板
   */
  public static async setupPanelWindowService() {


  }
}
