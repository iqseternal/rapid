import { isUnDef } from '@suey/pkg-utils';
import { Printer } from '../core';
import { IS_PROD } from '@rapid/config/constants';

export { IpcMain, IPC_EMITTER_TYPE } from '../ipc';
export { NoteInfo } from '../logger';

/**
 * 标记一个弃用的类或者一个弃用的方法
 * 这对于项目后期持续维护有作用, 为开发人员调试时告知使用了不应该使用的方法或者参数
 * @returns
 */
export function Deprecated() {

  return <T extends Function>(target: T | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<T>): void => {
    if (IS_PROD) return;

    // ClassDecorator
    if (isUnDef(propertyKey) && isUnDef(descriptor)) {
      Printer.printWarn(`Deprecated`, new Error().stack);
      return;
    }

    if (!descriptor) return;

    const method = descriptor.value as Function;

    descriptor.value = function(...args: any[]) {

      Printer.printWarn(`Deprecated`);

      method.call(this, ...args);
    } as unknown as T;
  }
}

/**
 * 未来得方法, 还有待考究
 * @constructor
 */
export function Feature() {

  return <T extends Function>(target: T | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<T>): void => {

  }
}
