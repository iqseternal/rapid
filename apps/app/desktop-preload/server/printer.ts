import { CONFIG } from '@rapid/config/constants';
import { PrinterService } from '../../desktop-node/src/core/service/PrinterService';

const appName = CONFIG.PROJECT.toUpperCase();

/**
 * renderer 线程打印器
 */
const printer = new PrinterService(appName, 'RENDER');

/**
 * renderer 线程打印器类型
 */
export interface PrinterServer {
  /**
   * 打印日志
   */
  print: typeof printer.print;
  /**
   * 打印日志
   */
  printInfo: typeof printer.printInfo;
  /**
   * 打印一条警告信息
   */
  printWarn: typeof printer.printWarn;
  /**
   * 打印一条错误信息
   */
  printError: typeof printer.printError;
  /**
   * 打印一条成功信息
   */
  printSuccess: typeof printer.printSuccess;
}

/**
 * renderer 线程打印器
 * 为什么写为 () => printer.print(...message) 而不是 printer.print(...message)
 * 因为注入的 api 需要是一个函数
 */
export const printerServer: PrinterServer = {
  print: (...message) => printer.print(...message),
  printInfo: (...message) => printer.printInfo(...message),
  printWarn: (...message) => printer.printWarn(...message),
  printError: (...message) => printer.printError(...message),
  printSuccess: (...message) => printer.printSuccess(...message)
};
