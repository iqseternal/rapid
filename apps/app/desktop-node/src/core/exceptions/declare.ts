import { isUndefined } from '@rapid/libs';


/**
 * 产生自定义异常时，所需要携带的参数类型，可以做日志操作等等
 */
export interface ExceptionErrorMsgData {
  label: string;

  level: 'ERROR' | 'SUCCESS' | 'INFO' | 'WARN';

  time: number;
}


/*
 * 异常基类
 *
 */
export abstract class Exception<ErrMessageData extends ExceptionErrorMsgData> {
  public readonly errMessage: ErrMessageData;

  constructor(public message: string, errMessage?: Partial<ErrMessageData>) {
    if (isUndefined(errMessage)) errMessage = {};
    if (isUndefined(errMessage.label)) errMessage.label = '<GLOBAL>';
    else {
      errMessage.label = `<${errMessage.label.trim()}>`;
    }

    if (isUndefined(errMessage.level)) errMessage.level = 'ERROR';
    if (isUndefined(errMessage.time)) errMessage.time = Date.now();
    this.errMessage = errMessage as ErrMessageData;
  }
}

/**
* 判断目标是否一个自定义异常
*/
export const isException = <Error>(exp: Error | Exception<any>): exp is Exception<any> => exp instanceof Exception;

/**
* 异常捕捉器
*/
export abstract class ExceptionFilter {

  // 无参构造
  constructor() {}

  /**
   * 处理异常的回调函数
   * @param exp
   */
  public abstract catch(exp: Exception<any>): void | Promise<void>;
}
