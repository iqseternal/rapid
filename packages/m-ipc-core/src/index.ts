/**
 * @rapid/m-ipc-core
 *
 * Electron IPC 类型安全封装库
 * 支持中间件系统、参数转换、异常处理链
 *
 * @example 主进程用法
 * ```ts
 * import { IpcManager } from '@rapid/m-ipc-core/main';
 *
 * const manager = new IpcManager();
 * const processor = manager.createProcessor<[WindowService]>(
 *   'window:maximize',
 *   [windowServiceMiddleware],
 *   async (windowService) => {
 *     windowService.window.maximize();
 *   }
 * );
 * manager.registerAsHandle([processor]);
 * ```
 *
 * @example 渲染进程用法
 * ```ts
 * import { IpcCaller } from '@rapid/m-ipc-core/renderer';
 *
 * const caller = new IpcCaller();
 * const result = await caller.invoke<[string], string>('channel:name', ['arg']);
 * ```
 */

export { IpcMReceiver, ipcMReceiver } from './main';
export { IpcBCaller } from './browser';

export type {
	IpcType,
	IpcTypeHandle,
	IpcTypeOn,
	IpcTypeBoth,

	IpcDefaultEvent,

	IpcProcessor,
	IpcCompatibleProcessor,

	IpcMiddleware,
	IpcMiddlewareContext,

	MutateProcessor,
	MutateProcessorSheet,
	ExtractMutateProcessorSheet
} from './types';
