import type { ExceptionErrorMsgData } from './declare';
import { Exception, ExceptionFilter } from './declare';
import { Catch } from '../decorators';

import { PRINT_TYPE, PrinterService } from '../service/PrinterService';
import { Logger } from '../service/LoggerService';

export interface RuntimeExceptionErrorMsgData extends ExceptionErrorMsgData {

}

/**
 * 运行时异常
 * 例如：
 * 运行时数据不符合预期
 */
export class RuntimeException extends Exception<RuntimeExceptionErrorMsgData> {

}

@Catch(RuntimeException)
export class RuntimeExceptionFilter extends ExceptionFilter {

  override catch(err: RuntimeException): void {
    switch (err.errMessage.level) {
      case 'ERROR': {
        Logger.error(`${err.errMessage.label}`, err.message);
        break;
      }

      default: {
        PrinterService.printError(`未定义\\未处理的异常level: ${err.errMessage.level}`)
        break;
      }
    }
  }
}
