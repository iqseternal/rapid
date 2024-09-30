
/*
 * 异常基类
 *
 */
export abstract class Exception<ErrorMessage> {
  constructor(public message: string, public errMessage?: ErrorMessage) {

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
  abstract catch(exp: Exception<any>): void | Promise<void>;
}

/**
 * 产生自定义异常时，所需要携带的参数类型，可以做日志操作等等
 */
export interface ExceptionErrorMsgData {

  label: string;

  level: 'error' | 'warning' | 'info';

  time: number;
}
