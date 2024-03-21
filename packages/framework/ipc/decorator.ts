
export const IPC_META_CONTROLLER = Symbol('reflect:ipcMain:controller');

export const IPC_META_HANDLER = Symbol('reflect:ipcMain:handler');
export const IPC_META_HANDLER_ONCE = Symbol('reflect:ipcMain:handlerOnce');
export const IPC_META_ON = Symbol('reflect:ipcMain:on');
export const IPC_META_ON_ONCE = Symbol('reflect:ipcMain:once)');

export enum IPC_EMITTER_TYPE {
  HANDLE = 'handle',
  HANDLE_ONCE = 'handleOnce',
  ON = 'on',
  ONCE = 'once'
}

export const IpcMain = {
  IpcController: (): ClassDecorator => {
    return (target) => {
      Reflect.defineMetadata(IPC_META_CONTROLLER, true, target);
      if (!Reflect.hasMetadata(IPC_META_HANDLER, target)) return Reflect.defineMetadata(IPC_META_HANDLER, [], target);
      if (!Reflect.hasMetadata(IPC_META_HANDLER_ONCE, target)) return Reflect.defineMetadata(IPC_META_HANDLER_ONCE, [], target);
      if (!Reflect.hasMetadata(IPC_META_ON, target)) Reflect.defineMetadata(IPC_META_ON, [], target);
      if (!Reflect.hasMetadata(IPC_META_ON_ONCE, target)) Reflect.defineMetadata(IPC_META_ON_ONCE, [], target);
    }
  },
  IpcType: (type: IPC_EMITTER_TYPE = IPC_EMITTER_TYPE.HANDLE, channel?: string): MethodDecorator => {
    if (type === IPC_EMITTER_TYPE.HANDLE) return IpcMain.Handler(channel);
    if (type === IPC_EMITTER_TYPE.HANDLE_ONCE) return IpcMain.HandlerOnce(channel);
    if (type === IPC_EMITTER_TYPE.ON) return IpcMain.On(channel);
    if (type === IPC_EMITTER_TYPE.ONCE) return IpcMain.Once(channel);

    return (target, property) => {

    }
  },
  Handler: (channel?: string): MethodDecorator => {
    return (target, propertyName) => {
      if (!Reflect.hasMetadata(IPC_META_HANDLER, target.constructor)) {
        return Reflect.defineMetadata(IPC_META_HANDLER, [propertyName], target.constructor);
      }

      const values = Reflect.getMetadata(IPC_META_HANDLER, target.constructor);
      values.push(propertyName);
    }
  },
  HandlerOnce: (channel?: string): MethodDecorator => {

    return (target, propertyName) => {
      if (!Reflect.hasMetadata(IPC_META_HANDLER_ONCE, target.constructor)) {
        return Reflect.defineMetadata(IPC_META_HANDLER_ONCE, [propertyName], target.constructor);
      }

      const values = Reflect.getMetadata(IPC_META_HANDLER_ONCE, target.constructor);
      values.push(propertyName);
    }
  },
  On: (channel?: string): MethodDecorator => {

    return (target, propertyName) => {
      if (!Reflect.hasMetadata(IPC_META_ON, target.constructor)) {
        return Reflect.defineMetadata(IPC_META_ON, [propertyName], target.constructor);
      }

      const values = Reflect.getMetadata(IPC_META_ON, target.constructor);
      values.push(propertyName);
    }
  },
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
