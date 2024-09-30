

export interface Decorator {
  (...args: any[]): ClassDecorator | MethodDecorator | PropertyDecorator | ParameterDecorator;

  symbol: Symbol;

  parser: (...args: any[]) => any;
}


/**
 * 某个类的子类, 这里表示的类型为 类 本身，而非实例
 */
export type DescendantClass<Class> = {
  new(...args: any[]): Class;
};


export const decoratorDefineMetadata = <Data>(decorator: Decorator, target: any, data: Data) => Reflect.defineMetadata(decorator.symbol, data, target);
export const decoratorGetMetadata = <Data>(decorator: Decorator, target: any) => Reflect.getMetadata(decorator.symbol, target) as Data;

