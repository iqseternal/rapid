import { isPromise } from '@suey/pkg-utils';
import { print } from '@suey/printer';

export class Exception<D extends any = any> extends Error {
  public static readonly type = this.name;

  constructor(
    message: string,
    public readonly errMsgData: D
  ) {
    super(message);
  }
}

export const isException = <E extends Exception<any>>(err: E) => err instanceof Exception;


