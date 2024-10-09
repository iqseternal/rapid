import type { ExceptionErrorMsgData } from './declare';
import { Exception, ExceptionFilter } from './declare';
import { Catch } from '../decorators';

import { PrinterService } from '../service/PrinterService';

/** 请求异常 */
export class RequestException extends Exception<ExceptionErrorMsgData> {

}

@Catch(RequestException)
export class RequestExceptionFilter extends ExceptionFilter {

  override catch(err: RequestException): void {



    PrinterService.printError('RequestException ==>', err.errMessage?.label);
  }

}
