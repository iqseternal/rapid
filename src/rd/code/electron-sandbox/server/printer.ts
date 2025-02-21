import { PrinterService } from 'rd/base/common/service/PrinterService';

/**
 * renderer 线程打印器
 */
const printer = PrinterService.getInstance();

/**
 * renderer 线程打印器类型
 */
export interface PrinterServer {
  /**
   * 打印日志
   */
  readonly print: typeof printer.print;
  /**
   * 打印日志
   */
  readonly printInfo: typeof printer.printInfo;
  /**
   * 打印一条警告信息
   */
  readonly printWarn: typeof printer.printWarn;
  /**
   * 打印一条错误信息
   */
  readonly printError: typeof printer.printError;
  /**
   * 打印一条成功信息
   */
  readonly printSuccess: typeof printer.printSuccess;
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
} as const;
