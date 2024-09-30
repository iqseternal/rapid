import type { ExceptionErrorMsgData } from './declare';
import { Exception, ExceptionFilter } from './declare';
import { Catch } from '../decorators';

import { PrinterService } from '../service/PrinterService';

export interface RuntimeExceptionErrorMsgData extends ExceptionErrorMsgData {

}

/**
 * 运行时异常
 * 例如：
 * 运行时数据不符合预期
 */
export class RuntimeException extends Exception<Partial<RuntimeExceptionErrorMsgData>> {

}

@Catch(RuntimeException)
export class RuntimeExceptionFilter extends ExceptionFilter {


  override catch(err: RuntimeException): void {
    if (err?.errMessage?.level) {
      switch (err.errMessage.level) {
        case 'info':
          PrinterService.printInfo('RuntimeException ==>', err.errMessage.label);
          break;
        case 'warning':
          PrinterService.printWarn('RuntimeException ==>', err.errMessage.label);
          break;
        case 'error':
          PrinterService.printError('RuntimeException ==>', err.errMessage.label);
          break;
      }

      return;
    }

    PrinterService.printError('RuntimeException ==>', err.errMessage?.label);
  }
}
