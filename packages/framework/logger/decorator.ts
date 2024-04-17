import { print } from '@suey/printer';
import { getLoggerRuntimeContext } from './runtime';
import { Printer } from '../core';
import { IS_DEV } from '@rapid/config/constants';

const runtimeContext = getLoggerRuntimeContext();

/**
 * 方法调用后运行当前 NoteInfo， 当前作用为打印调用日志，函数参数与方法参数保持一致
 * @param messageFn
 * @returns
 */
export const NoteInfo = (messageFn: (...message: any[]) => string) => {
  return <T extends Function>(target: Object, property: string, descripor: TypedPropertyDescriptor<T>) => {
    const fn = descripor.value as Function;

    descripor.value = function(...args: unknown[]) {
      if (IS_DEV) {
        if (!Reflect.has(this, 'id')) {
          Printer.printError(`The instance where the method \`${property}\` decorated by the Decorator NoteInfo is located does not have an id attribute.`);
        }
      }

      const value = fn.call(this, ...args);

      runtimeContext.server.info(messageFn(...args));

      return value;
    } as unknown as T;
  }
}

export {};
