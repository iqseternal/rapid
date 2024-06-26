import type { App, Plugin } from 'vue';
import { createApp } from 'vue';
import { ENV, IS_DEV, IS_PROD } from '@rapid/config/constants';
import { printError } from '@suey/printer';
import store from '@/store';

import 'animate.css';
import 'ant-design-vue/dist/reset.css';
import 'dayjs/locale/zh-cn';

import '@scss/index.scss';

export type ImportDefault<T> = Promise<{ default: T }>;

export type CreateAppArgs = Parameters<typeof createApp>;

export type SetupAppUse = <T>(plugin: ImportDefault<T>) => Promise<T>;
export type SetupAppCallback = (app: App<Element>, use: SetupAppUse) => Promise<void>;
export type SetupAppArgs = [ImportDefault<CreateAppArgs[0]>, CreateAppArgs[1], SetupAppCallback];

/**
 * 建立WebApp, 为什么要使用这种方式额外地编写一个函数呢，因为希望捕捉到建立webApp时出现错误的情况，
 * 在这里将错误捕捉并做相应的统一处理，就不会出现说出现错误，导致整个应用白屏而无法运行
 * 并且这样做可以将一些文件作为动态资源import()使用
 * @param args
 */
export async function setupApp(...args: Partial<SetupAppArgs>) {
  const { windowClose, openReportBugsPage, windowShow } = await import('../actions');

  const App = args[0];
  const appArg = args[1];

  const cb = args.pop() as SetupAppCallback;

  if (!App) {
    if (IS_PROD) {
      await windowClose();
    }
    throw '';
  }

  const app = createApp((await App).default, appArg);


  app.use(store as unknown as Plugin);

  cb(app, async (plugin) => {
    const pl = (await plugin).default;

    app.use(pl as Plugin);
    return pl;
  }).catch(async (e) => {
    // 构建 Web App出现了异常
    if (IS_DEV) {


      // printError(`运行异常`, e);

      // await windowClose();

      window.close();
      // await windowShow({ show: false });
      await openReportBugsPage();

      return;
    }
    else if (IS_PROD) {
      windowClose();
    }
  });
}
