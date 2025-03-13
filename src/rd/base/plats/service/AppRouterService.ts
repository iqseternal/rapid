import { is } from '@electron-toolkit/utils';
import { join } from 'path';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * 注入的变量, 用于在 NodeJs 中获取启动的 Web URL
       */
      readonly ELECTRON_RENDERER_URL: string;
    }
  }
}

/**
 * 根据当前的环境获取URL
 *
 * dev: 获取URL
 * pro: 获取路径
 */
const makeStartUrl = (fileName: string, extension = 'html') => {
  if (is.dev && process.env.ELECTRON_RENDERER_URL) return `${process.env.ELECTRON_RENDERER_URL}/${fileName}.${extension}/#`;
  return join(__dirname, `../renderer/${fileName}.${extension}`);
}

export class AppRouterService {
  /**
   * 路径
   */
  public static readonly Routes = {

    MainWindow: makeStartUrl('index', 'html'),


  } as const;
}
