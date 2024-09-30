
import { PrinterService } from '../service/PrinterService';
import { ExceptionFilter, Exception } from '../exceptions';
import type { Decorator } from './common';
import { decoratorGetMetadata, decoratorDefineMetadata, DescendantClass } from './common';
import {  } from '@suey/pkg-utils';


export class Logger {


  static Info(): MethodDecorator;
  static Info(...message: unknown[]): void;


  static Info(...message: unknown[]): void | MethodDecorator {

    if (message.length !== 0) {

      PrinterService.printInfo(...message);

      return;
    }

    return <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => {

      const fn = descriptor.value! as unknown as Function;

      descriptor.value = (function(this: typeof target, ...args: unknown[]) {

        PrinterService.printInfo(...args);

        fn.apply(this, args);

      }) as unknown as T;
    }
  }


  Warn() {


  }

  Success() {



  }


  Error() {



  }
}
