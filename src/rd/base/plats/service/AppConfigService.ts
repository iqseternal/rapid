import { PrinterService } from 'rd/base/common/service/PrinterService';
import { RdAppSingleInstanceService } from './RdAppSingleInstanceService';
import { PackInformationService } from '../../common/service/PackInformationService';

const packInformation = PackInformationService.getInstance();

/**
 * AppConfigJson的维护类
 */
export class AppConfigService extends RdAppSingleInstanceService {
  public readonly config = {
    appName: packInformation.information.name,
    appVersion: 'v1.0.0',
    author: 'suey',
    email: 'sueyeternal@163.com',
    windows: {
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
    },
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

  protected override destroy(): void {
    if (this.config.miscellaneous.appJson.overwrite) {
      PrinterService.printError(`当前还未编写覆写过程`);
    }
  }
}
