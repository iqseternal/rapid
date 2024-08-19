

export interface SetupOptions<Server, Service> {
  /** 服务对象 */
  use: Server;
  /** 创建的模块 */
  modules: Service[];
}

/**
 * 某个类的子类, 这里表示的类型为 类 本身，而非实例
 */
export type DescendantClass<Class> = {
  new(...args: any[]): Class;
};

export * from './printer';
