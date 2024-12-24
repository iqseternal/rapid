
/**
 * 自定义创建装饰器的结构
 */
export interface Decorator {
  /**
   * 自身装饰器具有多样性
   */
  (this: any, ...args: any[]): ClassDecorator | MethodDecorator | PropertyDecorator | ParameterDecorator;

  /**
   * 唯一标识
   */
  readonly symbol: Symbol;

  /**
   * 执行解析函数, 这个函数是抽象的, 由子接口定义
   * @returns
   */
  readonly parser: (...args: any[]) => any;
}

/**
 * 某个类的子类, 这里表示的类型为 类 本身，而非实例
 */
export type DescendantClass<Class> = { new(...args: any[]): Class; };

/**
 * 装饰器定义元数据, 本函数仅在创建装饰器时使用
 *
 * @param {Decorator} decorator 装饰器本身, 装饰器接口规定会含有一个 symbol 数据, 作为元数据的存放 key
 * @param {any} target 装饰器所服务的对象
 * @param data 定义的元数据
 * @see https://jkchao.github.io/typescript-book-chinese/tips/metadata.html
 *
 * @example
 *
 * const Catch: Decorator = function () {
 *   return (target) => {
 *     decoratorDefineMetadata(Catch, target, '数据');
 *   }
 * }
 *
 * Catch.symbol = Symbol('Catch');
 *
 * Catch.parser = () => {
 *   // 解析这个装饰器的处理执行
 * }
 *
 */
export const decoratorDefineMetadata = <Data>(decorator: Decorator, target: any, data: Data) => Reflect.defineMetadata(decorator.symbol, data, target);


/**
 * 装饰器获取元数据, 本函数在创建装饰器的解析函数中执行
 * @param {Decorator} decorator 装饰器本身, 装饰器接口规定会含有一个 symbol 数据, 作为元数据的存放 key
 * @param target 装饰器所服务的对象
 * @see https://jkchao.github.io/typescript-book-chinese/tips/metadata.html
 *
 * @example
 *
 * const Catch: Decorator = function (filter: Filter) {
 *   return (target) => {
 *     const data = decoratorGetMetadata(Catch, target) ?? [];
 *
 *     data.push(Filter);
 *
 *     decoratorDefineMetadata(Catch, target, data);
 *   }
 * }
 *
 */
export const decoratorGetMetadata = <Data>(decorator: Decorator, target: any) => Reflect.getMetadata(decorator.symbol, target) as Data;
