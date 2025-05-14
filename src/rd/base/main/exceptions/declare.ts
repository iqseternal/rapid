import { PrinterService } from 'rd/base/common/service/PrinterService';
import { Exception } from 'rd/base/common/exceptions';


/**
* 异常捕捉器
*/
export abstract class ExceptionFilter {

  /**
   * 无参构造函数
   */
  public constructor() {}

  /**
   * 处理异常地回调函数
   * @param exp
   */
  public abstract catch(exp: Exception<any>): void | Promise<void>;
}
