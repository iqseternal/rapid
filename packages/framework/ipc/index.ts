
export { IpcMain, IPC_EMITTER_TYPE } from './decorator';

export type { SetupIpcMainHandlerOptions } from './runtime';
export {
  FrameworkIpcHandler, FrameworkIpcHandlerServer,
  setupIpcMainHandler,
  registerIpcMain, registerIpcMainHandler,
  unRegisterIpcMain, unRegisterIpcMainHandler,
  getIpcRuntimeContext
} from './runtime';
