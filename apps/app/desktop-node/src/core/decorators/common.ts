

export interface Decorator {
  (this: any, ...args: any[]): ClassDecorator | MethodDecorator | PropertyDecorator | ParameterDecorator;

  /**
   * 唯一标识
   */
  symbol: Symbol;

  /**
   * 执行解析函数
   * @returns
   */
  parser: (...args: any[]) => any;
}


/**
 * 某个类的子类, 这里表示的类型为 类 本身，而非实例
 */
export type DescendantClass<Class> = { new(...args: any[]): Class; };

export const decoratorDefineMetadata = <Data>(decorator: Decorator, target: any, data: Data) => Reflect.defineMetadata(decorator.symbol, data, target);
export const decoratorGetMetadata = <Data>(decorator: Decorator, target: any) => Reflect.getMetadata(decorator.symbol, target) as Data;

