/**
 * @rapid/m-ipc-core - Renderer Process Entry
 * 
 * 渲染进程入口（仅在渲染进程中可用）
 */

export { IpcCaller, createIpcCaller } from './IpcCaller';

// 导出通用类型
export type {
  IpcInvokeOptions
} from '../types';
