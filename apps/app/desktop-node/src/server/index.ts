import { WindowService } from '@/service/WindowService';
import { PrinterService } from '@/service/PrinterService';

export class LoggerServer {
  info(...message: unknown[]): void {
    PrinterService.printInfo(...message);
  }

  warn(...message: unknown[]): void {
    PrinterService.printWarn(...message);
  }

  error(...message: unknown[]): void {
    PrinterService.printError(...message);
  }
}




