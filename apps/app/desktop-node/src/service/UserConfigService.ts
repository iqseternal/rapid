import { app } from 'electron';
import { FileService } from './FileService';
import { SingleInstanceService } from './SingleInstanceService';
import { join } from 'path';
import { PrinterService } from './PrinterService';
import { AppConfigService } from './AppConfigService';






export const USER_CONFIG = {
  nodeServer: {
    port: '9303',
    mixin: false,
    static: {
      minConcurrency: 10,
      maxConcurrency: 50,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: 30,
      descriptor: '静态页面的配置, 最小最大并发数, 请求的最大尝试次数, 请求超时的时间s'
    },
    trends: {
      minConcurrency: 10,
      maxConcurrency: 50,
      maxRequestRetries: 1,
      requestHandlerTimeoutSecs: 30,
      descriptor: '动态页面的配置, 最小最大并发数, 请求的最大尝试次数, 请求超时的时间s'
    },
    source: [
      {
        src: 'https://cn.bing.com/images/search?cw=1905&ch=947&q=%e5%a3%81%e7%ba%b8&qft=+filterui:imagesize-wallpaper+filterui:photo-photo+filterui:aspect-wide+filterui:licenseType-Any&form=IRFLTR&first=1',
        proxy: 'http://127.0.0.1:7890',
        enable: true,
        static: false,
        loadType: 'scrollY',
        scrollDistance: 100,
        scrollTrie: 20,
        scrollWait: 100
      },
      {
        src: 'https://sq.simpro.cn/',
        proxy: 'http://127.0.0.1:7890',
        enable: true,
        static: false,
        loadType: 'scrollY',
        scrollDistance: 100,
        scrollTrie: 20,
        scrollWait: 100
      }
    ],
    descriptor: '关于NODE服务的用户配置, SOURCE为爬虫的ITEM配置'
  },
  theme: {
    descriptor: '主题的用户配置 哼哼哈hi'
  },
  windows: {
    mainWindow: {
      width: 1650,
      height: 780,
      descriptor: '记录用户调整主视窗的大小, 能够在二次启动时记忆大小'
    }
  }
} as const;

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
