import { IS_DEV } from '@rapid/config/constants';
import { PrinterService } from '../service/PrinterService';
import { ExceptionFilter, Exception } from '../exceptions';
import type { Decorator } from './common';
import { decoratorGetMetadata, decoratorDefineMetadata, DescendantClass } from './common';

export interface CatchDecorator extends Decorator {
  /**
   * catch 拦截一种异常
   */
  (Exp: DescendantClass<Exception<any>>, ...Exceptions: DescendantClass<Exception<any>>[]): (ExpFilter: DescendantClass<ExceptionFilter>) => void;

  /**
   * 装饰器执行所需数据上下文
   */
  context: {
    mapper: WeakMap<DescendantClass<Exception<any>>, ExceptionFilter[]>;
  }

  /**
   * 处理某个异常, 如果异常是 Exception 子类, 并且被成功处理了, 本函数返回 void
   * 否则抛出异常
   */
  parser(Exception: Exception<any>): void;
}

/**
 * 为一个 ExceptionFilter 类添加需要捕捉的异常类
 *
 * @example
 *
 * _@Catch(RuntimeException)
 * class RuntimeExceptionFilter extends ExceptionFilter {
 *
 * }
 *
 *
 */
export const Catch: CatchDecorator = function(...Exceptions: DescendantClass<Exception<any>>[]) {
  if (Exceptions.length === 0) {
    PrinterService.printError(`Catch 装饰器至少传递一个 Exception 类作为监听对象.`);
    return () => {}
  }

  /**
   * 返回装饰器, 并且依靠 ts 类型检查, 只允许作用与 ExceptionFilter 子类
   */
  return (ExceptionFilter: DescendantClass<ExceptionFilter>) => {
    Exceptions.forEach(Exception => {
      const hasExp = Catch.context.mapper.has(Exception);

      if (!hasExp) Catch.context.mapper.set(Exception, []);

      const filters = Catch.context.mapper.get(Exception)!;

      if (IS_DEV) {
        if (filters.some(filter => filter instanceof ExceptionFilter)) {
          PrinterService.printWarn(`Catch 装饰器含有重复的异常捕捉, 这可能影响程序运行`);
        }
      }

      filters.push(new ExceptionFilter());
      Catch.context.mapper.set(Exception, filters);
    })
  }
}

Catch.symbol = Symbol('CatchMetadata');
Catch.context = {
  mapper: new WeakMap()
}

/**
 * 处理装饰器, Catch 捕捉一个异常类
 */
Catch.parser = (exception) => {
  const Exception = exception.constructor as unknown as DescendantClass<Exception<any>>;

  const filters = Catch.context.mapper.get(Exception);

  if (filters) {
    for (const filter of filters) {
      try {
        filter.catch(exception);
        return;
      } catch (err) {

        if (!err) return;
      }
    }
  }

  throw exception;
}
