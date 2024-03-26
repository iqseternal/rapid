

export interface SetupOptions<Server, Service> {
  /** 服务对象 */
  use: Server;
  /** 创建的模块 */
  modules: Service[];
}

export interface DescendantClass<Class> {
  new (...args: any[]): Class;
}

export * from './printer';
