import type { ExceptionErrorMsgData } from './declare';
import { Exception, ExceptionFilter } from './declare';
import { Catch } from '../decorators';

import { PrinterService } from '../service/PrinterService';

/**
 * 类型异常
 * 例如：
 * 传递参数不符合当前函数的预期
 */
export class TypeException extends Exception<Partial<ExceptionErrorMsgData>> {

}


@Catch(TypeException)
export class TypeExceptionFilter extends ExceptionFilter {


  override catch(err: TypeException): void {


    if (err?.errMessage?.level) {
      switch (err.errMessage.level) {
        case 'info':
          PrinterService.printInfo('TypeException ==>', err.errMessage.label);
          break;
        case 'warning':
          PrinterService.printWarn('TypeException ==>', err.errMessage.label);
          break;
        case 'error':
          PrinterService.printError('TypeException ==>', err.errMessage.label);
          break;
      }
      return;
    }

    PrinterService.printError('TypeException ==>', err.errMessage?.label);
  }

}
