import '@/global';
import '@/measure/unhandledWarning';
import { setupApp } from './setupApp';
import { setupMainWindow, setupSettingWindow, setupDialogWindow } from './setupService';
import { setupUi } from './setupUi';
import { dialog, ipcMain, app, BrowserWindow, Notification } from 'electron';
import { FileService } from '@service/FileService';
import { AppDataService } from '@service/AppDataService';
import { AppConfigService } from '@service/AppConfigService';
import { UserConfigService } from '@service/UserConfigService';
import { WindowService } from '@service/WindowService';
import { PrinterService } from '@service/PrinterService';
import { NotificationService } from '@service/NotificationService';
import { execShell } from '@/core/shell/execShell';
import { spawn } from 'child_process';
import { print, printClear, printError, toColor } from '@suey/printer';
import { PAGES_WINDOW_MAIN, PAGES_WINDOW_SETTING } from '@/config';


setupApp(async () => {
  // const windowStateService = WindowStateService.getInstance();

  // windowStateService.appendMainWindow(await setupMainWindow());

  // windowStateService.startMainWindow();
  const mainWindowService = await setupMainWindow();

  mainWindowService.open();
});

