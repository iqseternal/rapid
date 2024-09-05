import { PrinterService } from './PrinterService';
import { SingleInstanceService } from './SingleInstanceService';
import type { BrowserWindowConstructorOptions } from 'electron';
import { CONFIG } from '@rapid/config/constants';
import { join } from 'path';

export const iconUrl = join(__dirname, '../../../resources/icon.png');

function makeBrowserWindowOptions<T extends Record<string, BrowserWindowConstructorOptions>>(options: T) {
  return options;
}

const APP_CONFIG = {
  appName: CONFIG.PROJECT,
  appVersion: 'v1.0.0',
  author: 'suey',
  email: 'sueyeternal@163.com',
  windows: makeBrowserWindowOptions({
    mainWindow: {
      type: 'main',
      icon: '/resources/icon.png',
      width: 1650,
      minWidth: 650,
      height: 780,
      minHeight: 400,
      frame: false,
      titleBarStyle: 'hidden',
      descriptor: '主窗口, maxWidth, maxHeight 默认为屏幕最大最大值'
    },
    largePopupWindow: {
      type: 'pop',
      icon: '/resources/icon.png',
      titleBarStyle: 'hidden',
      modal: true,
      descriptor: '大型弹窗'
    },
    mediumPopupWindow: {
      type: 'pop',
      icon: '/resources/icon.png',
      width: 690,
      height: 580,
      resizable: false,
      modal: true,
      titleBarStyle: 'hidden',
      descriptor: '中型弹窗'
    },
    smallPopupWindow: {
      type: 'pop',
      width: 300,
      height: 200,
      modal: true,
      icon: '/resources/icon.png',
      titleBarStyle: 'hidden',
      descriptor: '小型弹窗'
    }
  }),
  miscellaneous: {
    appJson: {
      overwrite: false,
      descriptor: '是否覆写JSON文件, 会在应用程序即将退出时执行, 建议不要覆写 AppJson'
    },
    userJson: {
      overwrite: true,
      descriptor: '是否覆写JSON文件, 会在应用程序即将退出时执行, 建议覆写 UserJson'
    },
    script: {
      reptile: {
        log: false
      }
    }
  }
} as const;





/**
 * AppConfigJson的维护类
 */
export class AppConfigService extends SingleInstanceService<AppConfigService> {
  public readonly config = APP_CONFIG;

  static override getInstance<T = AppConfigService>() {
    return super.getInstance<T>();
  }

  override destory(): void {
    if (this.config.miscellaneous.appJson.overwrite) {

      PrinterService.printError(`当前还未编写覆写过程`);

      // PrinterService.printWarn(`当前开启了 AppConfigJson 的覆写, 但是不建议开启, 它应该是开发者配置选项`);

      // FileService.saveObjToJson(this.config, join(__dirname, '../../app.config.json')).then(() => {
      //   PrinterService.printInfo('应用程序即将退出, 覆写 AppConfigJson');
      // }).catch(() => {
      //   PrinterService.printWarn('应用程序即将退出, 覆写 AppConfigJson 失败！！');
      // });
    }
  }
}
