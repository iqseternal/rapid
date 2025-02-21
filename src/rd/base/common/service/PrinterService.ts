
import { Ansi } from '@rapid/libs';
import { SingleInstanceService } from './SingleInstanceService';

export type PrintMessagesTypeArr = Parameters<typeof Ansi.print>;

export class PrinterService extends SingleInstanceService<PrinterService> {

  private static readonly printer = PrinterService.getInstance();

  public print(...messages: PrintMessagesTypeArr) {
    return Ansi.print(...messages);
  }

  public printInfo(...messages: PrintMessagesTypeArr) {
    return this.print(`${Ansi.format(Ansi.magenta, `[RD Host]`, ' ', Ansi.blue, Ansi.underline, '[INFO]')}`, ' ', ...messages);
  }


  public printError(...messages: PrintMessagesTypeArr) {
    return this.print(`${Ansi.format(Ansi.magenta, `[RD Host]`, ' ', Ansi.red, Ansi.underline, '[ERR ]')}`, ' ', ...messages);

  }

  public printWarn(...messages: PrintMessagesTypeArr) {
    return this.print(`${Ansi.format(Ansi.magenta, `[RD Host]`, ' ', Ansi.yellow, Ansi.underline, '[WARN]')}`, ' ', ...messages);
  }

  public printSuccess(...messages: PrintMessagesTypeArr) {
    return this.print(`${Ansi.format(Ansi.magenta, `[RD Host]`, ' ', Ansi.green, Ansi.underline, '[SUC ]')}`, ' ', ...messages);
  }

  protected override destroy(): void {

  }

  public static override getInstance<T = PrinterService>() {
    return super.getInstance<T>();
  }


  public static printInfo(...messages: PrintMessagesTypeArr) {
    return PrinterService.printer.printInfo(...messages);
  }


  public static printWarn(...messages: PrintMessagesTypeArr) {
    return PrinterService.printer.printWarn(...messages);
  }


  public static printSuccess(...messages: PrintMessagesTypeArr) {
    return PrinterService.printer.printSuccess(...messages);
  }


  public static printError(...messages: PrintMessagesTypeArr) {
    return PrinterService.printer.printError(...messages);
  }
}
