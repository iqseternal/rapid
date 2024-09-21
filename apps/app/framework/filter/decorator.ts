
import { Exception } from '../exception';
import type { DescendantClass } from '../core';

export const FILTER_META_CATCH = Symbol(`reflect:filter:catch`);

/**
 * Catch 装饰器, 告知需要捕捉那一种类型的异常
 * @param Exception
 * @returns
 */
export const Catch = (Exception: DescendantClass<Exception>): ClassDecorator => {

  return (target) => {
    Reflect.defineMetadata(FILTER_META_CATCH, Exception, target);
  }
}


export const getCatchExceptions = (target: object): DescendantClass<Exception>[] => {
  Reflect.getMetadata(FILTER_META_CATCH, target) ?? [];
  return [];
}





