import { app } from 'electron';
import { FileService } from './FileService';
import { join } from 'path';
import { PrinterService } from './PrinterService';
import { SingleInstanceService } from './SingleInstanceService';
import type { AppJsonType } from 'app.config.json';

/**
 * AppConfigJson的维护类
 */
export class AppConfigService extends SingleInstanceService<AppConfigService> {
  public readonly config: AppJsonType = require(join(__dirname, '../../app.config.json'));

  static getInstance<T = AppConfigService>() {
    return super.getInstance<T>();
  }

  destory(): void {
    if (this.config.miscellaneous.appJson.overwrite) {
      PrinterService.printWarn(`当前开启了 AppConfigJson 的覆写, 但是不建议开启, 它应该是开发者配置选项`);

      FileService.saveObjToJson(this.config, join(__dirname, '../../app.config.json')).then(() => {
        PrinterService.printInfo('应用程序即将退出, 覆写 AppConfigJson');
      }).catch(() => {
        PrinterService.printWarn('应用程序即将退出, 覆写 AppConfigJson 失败！！');
      });
    }
  }
}
