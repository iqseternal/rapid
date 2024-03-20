import { Exception } from '@/framework';

export const Catch = <E extends typeof Exception>(target: E): ClassDecorator => {

  return (target) => {

    Reflect.defineMetadata(target, '', '');

  }
}

export class Logger {
  public static readonly log: MethodDecorator = () => {


  }

  public static readonly info: MethodDecorator = () => {

  }

  public static readonly warn: MethodDecorator = () => {

  }

  public static readonly error = (messageType: string): MethodDecorator => {


    return () => {

    }
  }
}
