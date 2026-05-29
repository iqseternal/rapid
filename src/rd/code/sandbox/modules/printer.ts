import { PrinterService } from 'rd/base/common/service/PrinterService';

/**
 * renderer 线程打印器
 */
const printerService = new PrinterService();

/**
 * renderer 线程打印器类型
 */
export interface PrinterType {
  /**
   * 打印日志
   */
  readonly print: typeof printerService.print;
  /**
   * 打印日志
   */
  readonly printInfo: typeof printerService.printInfo;
  /**
   * 打印一条警告信息
   */
  readonly printWarn: typeof printerService.printWarn;
  /**
   * 打印一条错误信息
   */
  readonly printError: typeof printerService.printError;
  /**
   * 打印一条成功信息
   */
  readonly printSuccess: typeof printerService.printSuccess;
}

/**
 * renderer 线程打印器
 * 为什么写为 () => printer.print(...message) 而不是 printer.print(...message)
 * 因为注入的 api 需要是一个函数
 */
export const printer: PrinterType = {
  print: (...message) => printerService.print(...message),
  printInfo: (...message) => printerService.printInfo(...message),
  printWarn: (...message) => printerService.printWarn(...message),
  printError: (...message) => printerService.printError(...message),
  printSuccess: (...message) => printerService.printSuccess(...message)
} as const;
