import type { ExceptionErrorMsgData } from './declare';
import { Exception, ExceptionFilter } from './declare';
import { Catch } from '../decorators';

import { PrinterService } from '../service/PrinterService';

/** 请求异常 */
export class RequestException extends Exception<Partial<ExceptionErrorMsgData>> {

}

@Catch(RequestException)
export class RequestExceptionFilter extends ExceptionFilter {

  override catch(err: RequestException): void {

    if (err?.errMessage?.level) {
      switch (err.errMessage.level) {
        case 'info':
          PrinterService.printInfo('RequestException ==>', err.errMessage.label);
          break;
        case 'warning':
          PrinterService.printWarn('RequestException ==>', err.errMessage.label);
          break;
        case 'error':
          PrinterService.printError('RequestException ==>', err.errMessage.label);
          break;
      }
      return;
    }

    PrinterService.printError('RequestException ==>', err.errMessage?.label);
  }

}
