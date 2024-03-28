import { WindowService, WindowStateMachine } from '@/service/WindowService';
import { WallpaperService } from '@/service/WallpaperService';
import { DownloadService } from '@/service/DownloadService';
import { AppDataService } from '@/service/AppDataService';
import { CONFIG, WINDOW_STATE_MACHINE_KEYS } from '@rapid/config/constants';
import { AppConfigService } from '@/service/AppConfigService';
import { PrinterService } from '@/service/PrinterService';
import { PAGES_WINDOW_DIALOG, PAGES_WINDOW_MAIN, PAGES_WINDOW_SETTING } from '@/config';
import { UserConfigService } from '@/service/UserConfigService';
import { BrowserWindow, Menu, Tray, app, nativeImage } from 'electron';
import { setWindowCloseCaptionContextmenu, setWindowDevtoolsDetach } from '@/core/common/window';
import { iconUrl } from '@rapid/config/electron-main';

export async function setupAppDataDownload() {
  const wallpaperSaveService = new AppDataService('userData', 'download');
  const downloadService = new DownloadService();
  return { wallpaperSaveService, downloadService };
}

/**
 * 创建主窗口的函数
 * @returns
 */
export async function setupMainWindow() {
  const mainWindowService = WindowStateMachine.findWindowService(WINDOW_STATE_MACHINE_KEYS.MAIN_WINDOW);

  if (mainWindowService) {
    PrinterService.printInfo(`已经拥有了主页面, 重复的构建`);
    return mainWindowService;
  }

  PrinterService.printInfo('窗口开始构建');
  const appConfigService = AppConfigService.getInstance();

  const windowService = new WindowService(appConfigService.config.windows.mainWindow, {
    url: PAGES_WINDOW_MAIN,
    autoShow: false,
    windowKey: WINDOW_STATE_MACHINE_KEYS.MAIN_WINDOW
  });

  windowService.window.setMenu(null);
  setWindowCloseCaptionContextmenu(windowService.window);
  setWindowDevtoolsDetach(windowService.window);

  PrinterService.printInfo('主窗口ID, ', windowService.window.id);

  windowService.addOpenCatchCb(() => {
    app.exit();
  });
  return windowService;
}

/**
 * 创建设置窗口的函数
 * @param parentWindowService
 * @returns
 */
export async function setupSettingWindow(parentWindowService: WindowService) {
  const settingWindowService = WindowStateMachine.findWindowService(WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW);

  if (settingWindowService) {
    PrinterService.printInfo(`已经拥有了设置页面, 重复的构建`);
    return settingWindowService;
  }

  PrinterService.printInfo('构建设置页面');

  const appConfigService = AppConfigService.getInstance();
  const windowService = new WindowService(appConfigService.config.windows.mediumPopupWindow, {
    url: PAGES_WINDOW_SETTING,
    autoShow: true,
    windowKey: WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW
  });

  windowService.window.setResizable(false);
  windowService.window.setMenu(null);

  parentWindowService.window.blurWebView();
  parentWindowService.window.setEnabled(false);

  windowService.window.setParentWindow(parentWindowService.window);
  windowService.addDestroyCb(() => {
    parentWindowService.window.setEnabled(true);
  });

  return windowService;
}

export interface DialogWindowOptions {
  type: typeof CONFIG.DIALOG[keyof typeof CONFIG.DIALOG]['NAME'];
}

/**
 * 创建自定义弹窗的函数
 * @param options
 * @returns
 */
export async function setupDialogWindow(options: DialogWindowOptions) {
  const dialogWindowService = WindowStateMachine.findWindowService(WINDOW_STATE_MACHINE_KEYS.DIALOG_WINDOW);

  if (dialogWindowService) {
    PrinterService.printInfo(`已经拥有了弹窗页面, 重复的构建`);
    return dialogWindowService;
  }

  PrinterService.printInfo('构建弹窗');

  const appConfigService = AppConfigService.getInstance();
  const windowService = new WindowService(appConfigService.config.windows.smallPopupWindow, {
    url: PAGES_WINDOW_DIALOG,
    autoShow: true,
    windowKey: WINDOW_STATE_MACHINE_KEYS.DIALOG_WINDOW
  });

  windowService.window.setResizable(false);
  windowService.window.setMenu(null);

  setWindowCloseCaptionContextmenu(windowService.window);
  // setWindowDevtoolsDetach(windowService.window);

  windowService.addOpenThenCb(() => {
    PrinterService.printWarn(`弹窗打开成功了`);

    // sendToRenderer(windowService.window, IPC_RENDER_DIALOG_WINDOW.DIALOG_TYPE, new IpcResponseOk(options.type));
  });
  windowService.addOpenCatchCb(() => {
    PrinterService.printWarn(`弹窗打开失败了`);
  });

  return windowService;
}


/**
 * 创建托盘和托盘菜单
 */
export async function setupTrayMenu() {
  const tray = new Tray(nativeImage.createFromPath(iconUrl));

  tray.on('click', () => {
    const mainWindowService = WindowService.findWindowService(WINDOW_STATE_MACHINE_KEYS.MAIN_WINDOW);
    mainWindowService.window.show();
  });

  tray.setTitle(CONFIG.PROJECT);
  tray.setToolTip(CONFIG.PROJECT);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio', click: () => {

      console.log('click');
    } },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' },
    { type: 'separator' },
    { label: '????', type: 'normal' },
    { type: 'separator' },
    {
      label: '退出', type: 'normal', click: () => app.quit()
    }
  ])
  tray.setContextMenu(contextMenu);

  return tray;
}
