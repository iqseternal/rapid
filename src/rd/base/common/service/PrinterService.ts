import { Ansi } from '@rapid/libs';
import { AppInformationService } from './AppInformationService';

const appInfo = AppInformationService.getInstance();

export type PrintMessagesTypeArr = Parameters<typeof Ansi.print>;

export class PrinterService {
  private static readonly printer = new PrinterService();

  /**
   * 格式化文本
   */
  public format(...messages: PrintMessagesTypeArr) {
    return Ansi.format(...messages);
  }

  /**
   * print
   */
  public print(...messages: PrintMessagesTypeArr) {
    return Ansi.print(...messages);
  }

  /**
   * 日志信息
   */
  public printInfo(...messages: PrintMessagesTypeArr) {
    return this.print(`${Ansi.format(Ansi.magenta, `[${appInfo.information.appName.toUpperCase()} Host]`, ' ', Ansi.blue, Ansi.underline, '[INFO]')}`, ' ', ...messages);
  }

  /**
   * 错误信息
   */
  public printError(...messages: PrintMessagesTypeArr) {
    return this.print(`${Ansi.format(Ansi.magenta, `[${appInfo.information.appName.toUpperCase()} Host]`, ' ', Ansi.red, Ansi.underline, '[ERRO]')}`, ' ', ...messages);

  }

  /**
   * 警告信息
   */
  public printWarn(...messages: PrintMessagesTypeArr) {
    return this.print(`${Ansi.format(Ansi.magenta, `[${appInfo.information.appName.toUpperCase()} Host]`, ' ', Ansi.yellow, Ansi.underline, '[WARN]')}`, ' ', ...messages);
  }

  /**
   * 成功信息
   */
  public printSuccess(...messages: PrintMessagesTypeArr) {
    return this.print(`${Ansi.format(Ansi.magenta, `[${appInfo.information.appName.toUpperCase()} Host]`, ' ', Ansi.green, Ansi.underline, '[SUCC]')}`, ' ', ...messages);
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
