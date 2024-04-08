
export const IPC_META_CONTROLLER = Symbol('reflect:ipcMain:controller');

export const IPC_META_HANDLE = Symbol('reflect:ipcMain:handle');
export const IPC_META_HANDLE_ONCE = Symbol('reflect:ipcMain:handleOnce');
export const IPC_META_ON = Symbol('reflect:ipcMain:on');
export const IPC_META_ON_ONCE = Symbol('reflect:ipcMain:onOnce)');

/**
 * ipc 监听通信的类型
 */
export enum IPC_EMITTER_TYPE {
  HANDLE = 'handle',
  HANDLE_ONCE = 'handleOnce',
  ON = 'on',
  ON_ONCE = 'once'
}

/**
 * Ipc 主进程的装饰器合集
 */
export const IpcMain = {
  /**
   * 标识一个 Ipc 控制器句柄
   * @returns
   */
  IpcController: (): ClassDecorator => {
    return (target) => {
      Reflect.defineMetadata(IPC_META_CONTROLLER, true, target);
      if (!Reflect.hasMetadata(IPC_META_HANDLE, target)) return Reflect.defineMetadata(IPC_META_HANDLE, [], target);
      if (!Reflect.hasMetadata(IPC_META_HANDLE_ONCE, target)) return Reflect.defineMetadata(IPC_META_HANDLE_ONCE, [], target);
      if (!Reflect.hasMetadata(IPC_META_ON, target)) Reflect.defineMetadata(IPC_META_ON, [], target);
      if (!Reflect.hasMetadata(IPC_META_ON_ONCE, target)) Reflect.defineMetadata(IPC_META_ON_ONCE, [], target);
    }
  },
  /**
   * ipc 进行监听回复的总和
   * @param type
   * @param channel
   * @returns
   */
  IpcType: (type: IPC_EMITTER_TYPE = IPC_EMITTER_TYPE.HANDLE, channel?: string): MethodDecorator => {
    if (type === IPC_EMITTER_TYPE.HANDLE) return IpcMain.Handler(channel);
    if (type === IPC_EMITTER_TYPE.HANDLE_ONCE) return IpcMain.HandlerOnce(channel);
    if (type === IPC_EMITTER_TYPE.ON) return IpcMain.On(channel);
    if (type === IPC_EMITTER_TYPE.ON_ONCE) return IpcMain.Once(channel);

    return (target, property) => {

    }
  },
  /**
   * ipc 以 handler 句柄监听
   * @param channel
   * @returns
   */
  Handler: (channel?: string): MethodDecorator => {
    return (target, propertyName) => {
      if (!Reflect.hasMetadata(IPC_META_HANDLE, target.constructor)) {
        return Reflect.defineMetadata(IPC_META_HANDLE, [propertyName], target.constructor);
      }

      const values = Reflect.getMetadata(IPC_META_HANDLE, target.constructor);
      values.push(propertyName);
    }
  },
  /**
   * ipc 以 HandlerOnce 句柄监听
   * @param channel
   * @returns
   */
  HandlerOnce: (channel?: string): MethodDecorator => {

    return (target, propertyName) => {
      if (!Reflect.hasMetadata(IPC_META_HANDLE_ONCE, target.constructor)) {
        return Reflect.defineMetadata(IPC_META_HANDLE_ONCE, [propertyName], target.constructor);
      }

      const values = Reflect.getMetadata(IPC_META_HANDLE_ONCE, target.constructor);
      values.push(propertyName);
    }
  },
  /**
   * ipc 以 On 句柄监听
   * @param channel
   * @returns
   */
  On: (channel?: string): MethodDecorator => {

    return (target, propertyName) => {
      if (!Reflect.hasMetadata(IPC_META_ON, target.constructor)) {
        return Reflect.defineMetadata(IPC_META_ON, [propertyName], target.constructor);
      }

      const values = Reflect.getMetadata(IPC_META_ON, target.constructor);
      values.push(propertyName);
    }
  },
  /**
   * ipc 以 Once 句柄监听
   * @param channel
   * @returns
   */
  Once: (channel?: string): MethodDecorator => {

    return (target, propertyName) => {
      if (!Reflect.hasMetadata(IPC_META_ON_ONCE, target.constructor)) {
        return Reflect.defineMetadata(IPC_META_ON_ONCE, [propertyName], target.constructor);
      }

      const values = Reflect.getMetadata(IPC_META_ON_ONCE, target.constructor);
      values.push(propertyName);
    }
  }
}
