

export type { IpcActionType, IpcActionMiddleware, IpcActionMessageType } from './declare';
export { getIpcRuntimeContext, IpcActionEvent } from './declare';

export {
  registerGlobalMiddleware,

  registerIpcHandle, registerIpcHandleOnce, removeIpcHandle,

  registerIpcOn, registerIpcOnce, offIpcOn
} from './register';

export { toMakeIpcAction } from './runtime';
