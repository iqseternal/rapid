import { app } from 'electron';
import { PrinterService } from '@/service/PrinterService';

export const exitApp = (exitCode?: number) => {
  PrinterService.printError(`App 启动失败`);

  app.exit(exitCode);
}

export const reloadApp = () => {
  app.relaunch();
  app.exit();
}

/**
 * 在一个比较安全的环境下运行异步函数，提供当函数发生异常时执行的回调函数
 * @param fn
 * @param errCallback
 * @returns
 */
export const safeRunNoneArgAsyncFn = (fn: () => (void | Promise<void>), errCallback?: BaseCb) => {
  return () => {
    ;(async () => {
      await fn();
    })().catch(errCallback);
  }
}
