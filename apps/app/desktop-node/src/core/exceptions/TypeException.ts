import type { ExceptionErrorMsgData } from './declare';
import { Exception, ExceptionFilter } from './declare';
import { Catch } from '../decorators';

import { PrinterService } from '../service/PrinterService';

/**
 * 类型异常
 * 例如：
 * 传递参数不符合当前函数的预期
 */
export class TypeException extends Exception<ExceptionErrorMsgData> {

}


@Catch(TypeException)
export class TypeExceptionFilter extends ExceptionFilter {


  override catch(err: TypeException): void {


    PrinterService.printError('TypeException ==>', err.errMessage?.label);
  }

}
