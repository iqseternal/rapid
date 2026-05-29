import { ansi } from '@suey/pkg-utils';
import { AppInformationService } from './AppInformationService';

const appInfo = AppInformationService.getInstance();

export type PrintMessagesTypeArr = Parameters<typeof ansi.print>;

export class PrinterService {
  private static readonly printer = new PrinterService();

  /**
   * 格式化文本
   */
  public format(...messages: PrintMessagesTypeArr) {
    return ansi.format(...messages);
  }

  /**
   * print
   */
  public print(...messages: PrintMessagesTypeArr) {
    return ansi.print(...messages);
  }

  /**
   * 日志信息
   */
  public printInfo(...messages: PrintMessagesTypeArr) {
    return this.print(`${ansi.format(ansi.magenta, `[${appInfo.information.appName.toUpperCase()} Host]`, ' ', ansi.blue, ansi.underline, '[INFO]')}`, ' ', ...messages);
  }

  /**
   * 错误信息
   */
  public printError(...messages: PrintMessagesTypeArr) {
    return this.print(`${ansi.format(ansi.magenta, `[${appInfo.information.appName.toUpperCase()} Host]`, ' ', ansi.red, ansi.underline, '[ERRO]')}`, ' ', ...messages);
  }

  /**
   * 警告信息
   */
  public printWarn(...messages: PrintMessagesTypeArr) {
    return this.print(`${ansi.format(ansi.magenta, `[${appInfo.information.appName.toUpperCase()} Host]`, ' ', ansi.yellow, ansi.underline, '[WARN]')}`, ' ', ...messages);
  }

  /**
   * 成功信息
   */
  public printSuccess(...messages: PrintMessagesTypeArr) {
    return this.print(`${ansi.format(ansi.magenta, `[${appInfo.information.appName.toUpperCase()} Host]`, ' ', ansi.green, ansi.underline, '[SUCC]')}`, ' ', ...messages);
  }

  /**
   * 格式化文本
   */
  public static format(...messages: PrintMessagesTypeArr) {
    return PrinterService.printer.format(...messages);
  }

  /**
   * 日志信息静态打印
   */
  public static printInfo(...messages: PrintMessagesTypeArr) {
    return PrinterService.printer.printInfo(...messages);
  }

  /**
   * 警告信息静态打印
   */
  public static printWarn(...messages: PrintMessagesTypeArr) {
    return PrinterService.printer.printWarn(...messages);
  }

  /**
   * 成功信息静态打印
   */
  public static printSuccess(...messages: PrintMessagesTypeArr) {
    return PrinterService.printer.printSuccess(...messages);
  }

  /**
   * 错误信息静态打印
   */
  public static printError(...messages: PrintMessagesTypeArr) {
    return PrinterService.printer.printError(...messages);
  }
}
