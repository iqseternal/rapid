import { WindowService, WindowServiceStateMachine } from '@/core/service/WindowService';
import { CONFIG, IS_DEV } from '@rapid/config/constants';
import { AppConfigService } from '@/core/service/AppConfigService';
import { PrinterService } from '@/core/service/PrinterService';
import { PAGES_WINDOW_MAIN, PAGES_WINDOW_SETTING } from '@/config';
import { Menu, Tray, app, nativeImage } from 'electron';
import { setWindowCross, setWindowOpenHandler } from '@/core/common/window';
import { join } from 'path';

const iconUrl = join(__dirname, '../../resources/icon.ico');

/**
 * 创建主窗口的函数
 * @returns
 */
export async function setupMainWindow() {
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
 * 创建设置窗口的函数
 * @returns
 */
export async function setupSettingWindow() {
  const settingWindowService = WindowServiceStateMachine.findWindowService(PAGES_WINDOW_SETTING);

  if (settingWindowService) return settingWindowService;
  PrinterService.printInfo('构建设置页面');

  const appConfigService = AppConfigService.getInstance();
  const windowService = new WindowService(appConfigService.config.windows.mediumPopupWindow, {
    url: PAGES_WINDOW_SETTING,
    autoLoad: true,
    windowKey: PAGES_WINDOW_SETTING
  });

  windowService.window.setResizable(false);
  windowService.window.setMenu(null);
  setWindowOpenHandler(windowService.window);

  return windowService;
}

/**
 * 创建托盘和托盘菜单
 */
export async function setupTrayMenu() {
  const tray = new Tray(nativeImage.createFromPath(iconUrl));

  tray.on('click', async () => {
    const mainWindowService = WindowServiceStateMachine.findWindowService(PAGES_WINDOW_MAIN);
    if (!mainWindowService) {
      await setupMainWindow();
      return;
    }

    if (mainWindowService.window.isVisible()) {
      mainWindowService.window.focus();
    }
    else mainWindowService.window.show();
  });

  tray.setTitle(CONFIG.PROJECT);
  tray.setToolTip(CONFIG.PROJECT);

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
    {
      label: '设置',
      type: 'normal',
      click: async () => {
        const settingWindowService = WindowServiceStateMachine.findWindowService(PAGES_WINDOW_SETTING);
        if (!settingWindowService) {
          await setupSettingWindow();
          return;
        }

        if (settingWindowService.window.isVisible()) {
          settingWindowService.window.focus();
        }
        else settingWindowService.window.show();
      }
    },
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
