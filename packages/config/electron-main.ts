import type { BrowserWindowConstructorOptions } from 'electron';
import { CONFIG } from './constants';

export { default as iconUrl } from '../../resources/icon.png?asset';

function makeBrowserWindowOptions<T extends Record<string, BrowserWindowConstructorOptions>>(options: T) {
  return options;
}

export const APP_CONFIG = {
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
