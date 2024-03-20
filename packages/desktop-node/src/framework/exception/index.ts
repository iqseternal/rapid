
import { isPromise } from '@suey/pkg-utils';
import { print } from '@suey/printer';

export {};

export interface ErrMsgData {
  label: string;

  time?: Date;
}

export class Exception extends Error {
  public static readonly type = this.name;

  constructor(
    message: string,
    public readonly errMsgData: ErrMsgData
  ) {
    super(message);

    if (!this.errMsgData.time) this.errMsgData.time = new Date();

  }
}

export const isException = <E extends Exception>(err: E) => err instanceof Exception;

export const runAndExceptionFilter = () => {

}
