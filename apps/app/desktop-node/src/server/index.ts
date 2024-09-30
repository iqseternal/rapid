import { WindowService } from '@/core/service/WindowService';
import { PrinterService } from '@/core/service/PrinterService';

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




