import { PrinterService } from './PrinterService';
import { SingleInstanceService } from './SingleInstanceService';
import { APP_CONFIG } from '@rapid/config/electron-main';

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
