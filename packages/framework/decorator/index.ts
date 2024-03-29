import { isUnDef } from '@suey/pkg-utils';
import { Printer } from '../core';
import { IS_PROD } from '@rapid/config/constants';

/**
 * 标记一个弃用的类或者一个弃用的方法
 * @returns
 */
export function Deprecated() {

  return <T>(target: Function | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<T>) => {
    if (IS_PROD) return;

    // ClassDecorator
    if (isUnDef(propertyKey) && isUnDef(descriptor)) {
      const Constructor = target as Function;

      Printer.printWarn(`Deprecated`, new Error().stack);

      return Constructor;
    }

    if (!descriptor) return;

    const method = descriptor.value as Function;

    descriptor.value = function(...args: any[]) {

      Printer.printWarn(`Deprecated`);

      method.call(this, ...args);
    } as unknown as T;

    return descriptor;
  }
}
