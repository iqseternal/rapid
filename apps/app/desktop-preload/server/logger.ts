import { CONFIG } from '@rapid/config/constants';
import { LoggerService } from '../../desktop-node/src/core/service/LoggerService';

const logger = new LoggerService('web.log');

/**
 * renderer 线程打印器类型
 */
export interface LoggerServer {
  /**
   * 打印日志
   */
  readonly info: typeof logger.info;
  /**
   * 打印警告日志
   */
  readonly warn: typeof logger.warn;
  /**
   * 打印一条成功日志
   */
  readonly success: typeof logger.success;
  /**
   * 打印一条错误日志
   */
  readonly error: typeof logger.error;
}


export const loggerServer: LoggerServer = {
  info: (...message) => logger.info(...message),
  warn: (...message) => logger.warn(...message),
  success: (...message) => logger.success(...message),
  error: (...message) => logger.error(...message)
} as const;
