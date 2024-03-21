
import type { SetupOptions, DescendantClass } from '../core';
import { IS_DEV } from '@rapid/config/constants';
import { Printer } from '../core';

export class FrameworkLogger {
  /**
   * 正常的日志
   * @param message
   */
  info(...message: unknown[]) {

  }

  /**
   * 警告日志, 当装饰器装方法出现错误时, 调用, 所以这是一个可控的错误
   * @param message
   */
  warn(...message: unknown[]) {

  }

  /**
   * 出现了不可控错误
   * @param message
   */
  error(...message: unknown[]) {

  }
}

export interface SetupLoggerOptions<T extends DescendantClass<FrameworkLogger>> extends Omit<SetupOptions<T, never>, 'modules'> {

}

export const isLoggerServer = (target: any): target is FrameworkLogger => target instanceof FrameworkLogger;

export const runtimeContext = {
  server: new FrameworkLogger()
}

export const setupLogger = <T extends DescendantClass<FrameworkLogger>>(options: SetupLoggerOptions<T>) => {
  const { use: Server } = options;

  if (IS_DEV) {
    if (!Server) {
      Printer.printError(`\`use\` value cannot be empty.`);
      return;
    }
  }

  const server = new Server();

  if (IS_DEV) {
    if (!isLoggerServer(server)) {
      Printer.printError(`\`use\` value must be a subclass of LoggerServer.`);
      return;
    }
  }

  runtimeContext.server = server;
}

