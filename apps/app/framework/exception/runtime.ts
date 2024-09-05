
/**
 * 异常的基类
 */
export class Exception<D extends any = any> extends Error {
  errMsgData: D;

  constructor(
    message: string,
    errMsgData: D
  ) {
    super(message);

    this.errMsgData = errMsgData;
  }
}

/**
 * 判断一个错误是否是自定义异常
 * @param err
 * @returns
 */
export const isException = <E extends Error>(err: E) => err instanceof Exception;
