import { Catch } from './Catch';
import { Exception } from 'rd/base/common/exceptions';
import type { ExceptionErrorMsgData } from 'rd/base/common/exceptions';
import { ExceptionFilter } from './declare';
import { PrinterService } from 'rd/base/common/service/PrinterService';

/**
 * 类型异常
 * 例如：
 * 传递参数不符合当前函数的预期
 */
export class TypeException extends Exception<ExceptionErrorMsgData> {

}


@Catch(TypeException)
export class TypeExceptionFilter extends ExceptionFilter {

  public override catch(err: TypeException): void {


    PrinterService.printError('TypeException ==>', err.errMessage?.label);
  }

}
