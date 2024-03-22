
import type { SetupOptions, DescendantClass } from '../core';
import { IS_DEV } from '@rapid/config/constants';
import { Printer } from '../core';

export class FrameworkLoggerServer {
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

export interface SetupLoggerOptions<T extends DescendantClass<FrameworkLoggerServer>> extends Omit<SetupOptions<T, never>, 'modules'> {

}

export const isLoggerServer = (target: any): target is FrameworkLoggerServer => target instanceof FrameworkLoggerServer;

export const runtimeContext = {
  server: new FrameworkLoggerServer()
}

export const setupLogger = async <T extends DescendantClass<FrameworkLoggerServer>>(options: SetupLoggerOptions<T>) => {
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

