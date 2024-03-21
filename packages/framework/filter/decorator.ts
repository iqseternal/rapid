
import { Exception } from '../exception';
import type { DescendantClass } from '../core';

export const FILTER_META_CATCH = Symbol(`reflect:filter:catch`);

export const Catch = (Exception: DescendantClass<Exception>): ClassDecorator => {

  return (target) => {
    Reflect.defineMetadata(FILTER_META_CATCH, Exception, target);
  }
}









