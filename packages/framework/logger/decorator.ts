import { print } from '@suey/printer';
import { runtimeContext } from './runtime';
import { Printer } from '../core';
import { IS_DEV } from '@rapid/config/constants';

export const NoteInfo = (messageFn: (...message: any[]) => string) => {
  return <T>(target: Object, property: string, descripor: TypedPropertyDescriptor<T>) => {
    const fn = descripor.value;

    // @ts-ignore
    descripor.value = function(...args: unknown[]) {
      if (IS_DEV) {
        if (!Reflect.has(this, 'id')) {
          Printer.printError(`The instance where the method \`${property}\` decorated by the Decorator NoteInfo is located does not have an id attribute.`);
        }
      }

      // @ts-ignore
      const value = fn.call(this, ...args);

      runtimeContext.server.info(messageFn(...args));

      return value;
    }
  }
}

export {};
