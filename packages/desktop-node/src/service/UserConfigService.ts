import { app } from 'electron';
import { FileService } from './FileService';
import { SingleInstanceService } from './SingleInstanceService';
import { join } from 'path';
import { PrinterService } from './PrinterService';
import { AppConfigService } from './AppConfigService';
import { USER_CONFIG } from '@rapid/config/electron-main';

/**
 * 维护 UserConfig 的内容信息
 */
export class UserConfigService extends SingleInstanceService<UserConfigService> {
  public config = USER_CONFIG;

  static override getInstance<T = UserConfigService>() {
    return super.getInstance<T>();
  }

  override destory(): void {
    if (!AppConfigService.getInstance().config.miscellaneous.userJson.overwrite) {
      PrinterService.printWarn(`当前关闭了 UserConfigJson 的覆写, 用户窗口配置参数将会失效, 建议开启`);

      return;
    }

    // FileService.saveObjToJson(this.config, join(__dirname, '../../user.config.json')).then(() => {
    //   PrinterService.printInfo('应用程序即将退出, 覆写 UserConfigJson');
    // }).catch(() => {
    //   PrinterService.printWarn('应用程序即将退出, 覆写 UserConfigJson 失败!!');
    // });
  }
}
