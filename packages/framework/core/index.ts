

export interface SetupOptions<Server, Service> {
  use: Server;
  modules: Service[];
}

export interface DescendantClass<Class> {
  new (...args: any[]): Class;
}

export * from './printer';
