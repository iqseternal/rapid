import { isPromise } from '@suey/pkg-utils';
import { print } from '@suey/printer';

/**
 * 异常的基类
 */
export class Exception<D extends any = any> extends Error {
  constructor(
    message: string,
    public readonly errMsgData: D
  ) {
    super(message);
  }
}

/**
 * 判断一个错误是否是自定义异常
 * @param err
 * @returns
 */
export const isException = <E extends Error>(err: E) => err instanceof Exception;
