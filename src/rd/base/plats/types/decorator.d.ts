

/**
 * 自定义创建装饰器的结构
 */
export interface Decorator {
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
