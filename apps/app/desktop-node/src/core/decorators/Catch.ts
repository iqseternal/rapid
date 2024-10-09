import { PrinterService } from '../service/PrinterService';
import { ExceptionFilter, Exception } from '../exceptions';
import type { Decorator } from './common';
import { decoratorGetMetadata, decoratorDefineMetadata, DescendantClass } from './common';
import {  } from '@suey/pkg-utils';

export interface CatchDecorator extends Decorator {
  (Exp: DescendantClass<Exception<any>>, ...Exceptions: DescendantClass<Exception<any>>[]): (ExpFilter: DescendantClass<ExceptionFilter>) => void;

  context: {
    mapper: WeakMap<DescendantClass<Exception<any>>, ExceptionFilter>;
  }

  /**
   * 处理某个异常, 如果异常是 Exception 子类, 并且被成功处理了, 本函数返回 void
   * 否则抛出异常
   */
  parser(Exception: Exception<any>): void;
}

export const Catch: CatchDecorator = function(...Exceptions: DescendantClass<Exception<any>>[]) {

  return (ExceptionFilter: DescendantClass<ExceptionFilter>) => {
    Exceptions.forEach(Exception => {
      const hasExp = Catch.context.mapper.has(Exception);

      if (hasExp) {
        PrinterService.printError(`Catch: 含有重复的异常捕捉, 这可能影响程序运行`);
        return;
      }

      Catch.context.mapper.set(Exception, new ExceptionFilter());
    })
  }
}

Catch.symbol = Symbol('CatchMetadata');
Catch.context = {
  mapper: new WeakMap()
}

Catch.parser = (exception) => {
  const Exception = exception.constructor as unknown as DescendantClass<Exception<any>>
  const filter = Catch.context.mapper.get(Exception);

  if (filter) {
    filter.catch(exception);

    return;
  }

  throw exception;
}
