import { WindowService, WindowStateMachine } from '@/service/WindowService';
import { CONFIG, WINDOW_STATE_MACHINE_KEYS } from '@rapid/config/constants';
import { AppConfigService } from '@/service/AppConfigService';
import { PrinterService } from '@/service/PrinterService';
import { PAGES_WINDOW_DIALOG, PAGES_WINDOW_MAIN, PAGES_WINDOW_SETTING, PAGES_WINDOW_REPORT_BUGS } from '@/config';
import { Menu, Tray, app, nativeImage } from 'electron';
import { setWindowCloseCaptionContextmenu, setWindowDevtoolsDetach } from '@/core/common/window';
import { iconUrl } from '@rapid/config/electron-main';

/**
 * 创建主窗口的函数
 * @returns
 */
export async function setupMainWindow() {
  const mainWindowService = WindowStateMachine.findWindowService(WINDOW_STATE_MACHINE_KEYS.MAIN_WINDOW);
  if (mainWindowService) return mainWindowService;

  PrinterService.printInfo('窗口开始构建');
  const appConfigService = AppConfigService.getInstance();

  const windowService = new WindowService(appConfigService.config.windows.mainWindow, {
    url: PAGES_WINDOW_MAIN,
    autoLoad: true,
    windowKey: WINDOW_STATE_MACHINE_KEYS.MAIN_WINDOW
  });

  windowService.window.setMenu(null);
  setWindowCloseCaptionContextmenu(windowService.window);
  setWindowDevtoolsDetach(windowService.window);

  PrinterService.printInfo('主窗口ID, ', windowService.window.id);
  return windowService;
}

/**
 * 创建设置窗口的函数
 * @returns
 */
export async function setupSettingWindow() {
  const settingWindowService = WindowStateMachine.findWindowService(WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW);

  if (settingWindowService) return settingWindowService;
  PrinterService.printInfo('构建设置页面');

  const appConfigService = AppConfigService.getInstance();
  const windowService = new WindowService(appConfigService.config.windows.mediumPopupWindow, {
    url: PAGES_WINDOW_SETTING,
    autoLoad: true,
    windowKey: WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW
  });

  windowService.window.setResizable(false);
  windowService.window.setMenu(null);
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

  if (dialogWindowService) return dialogWindowService;
  PrinterService.printInfo('构建弹窗');

  const appConfigService = AppConfigService.getInstance();
  const windowService = new WindowService(appConfigService.config.windows.smallPopupWindow, {
    url: PAGES_WINDOW_DIALOG,
    autoLoad: true,
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

export interface ReportBugsWindowOptions {
  /** 是否汇报 BUG 后自动重启 App */
  autoReloadApp?: boolean;
}

/**
 * 创建汇报BUG页面的函数
 * @returns
 */
export async function setupReportBugsWindow() {
  const reportBugsWindow = WindowStateMachine.findWindowService(WINDOW_STATE_MACHINE_KEYS.REPORT_BUGS_WINDOW);
  if (reportBugsWindow) return reportBugsWindow;

  const windowService = new WindowService({
    width: 550,
    height: 400,
    frame: false,
    autoHideMenuBar: false,
    resizable: false,
    fullscreenable: false
  }, {
    url: PAGES_WINDOW_REPORT_BUGS,
    autoLoad: true,
    windowKey: WINDOW_STATE_MACHINE_KEYS.REPORT_BUGS_WINDOW
  });

  // windowService.window.setMenu(null);
  // setWindowCloseCaptionContextmenu(windowService.window);
  setWindowDevtoolsDetach(windowService.window);

  return windowService;
}


/**
 * 创建托盘和托盘菜单
 */
export async function setupTrayMenu() {
  const tray = new Tray(nativeImage.createFromPath(iconUrl));

  tray.on('click', async () => {
    const mainWindowService = WindowStateMachine.findWindowService(WINDOW_STATE_MACHINE_KEYS.MAIN_WINDOW);
    if (!mainWindowService) {
      setupMainWindow();
      return;
    }

    if (!mainWindowService.window.isVisible()) mainWindowService.window.show();
    else mainWindowService.window.focus();
  });

  tray.setTitle(CONFIG.PROJECT);
  tray.setToolTip(CONFIG.PROJECT);

  const contextMenu = Menu.buildFromTemplate([
    // {
    //   label: '没什么用的选项1',
    //   type: 'radio',
    //   click: () => {

    //     console.log('click');
    //   }
    // },
    // { label: '没用的选项2', type: 'radio' },
    // { label: '没用的选项3', type: 'radio', checked: true },
    // { label: '没用的选项4', type: 'radio' },
    // { type: 'separator' },
    // { label: '????', type: 'normal' },
    // {
    //   label: '设置',
    //   type: 'normal',
    //   click: async () => {
    //     const settingWindowService = WindowStateMachine.findWindowService(WINDOW_STATE_MACHINE_KEYS.SETTING_WINDOW);
    //     if (!settingWindowService) {
    //       await setupSettingWindow();
    //       return;
    //     }

    //     if (!settingWindowService.window.isVisible()) settingWindowService.window.show();
    //     else settingWindowService.window.focus();
    //   }
    // },
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
