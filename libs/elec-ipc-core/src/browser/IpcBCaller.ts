
import { IpcAbstractCaller } from '../base';
import type { IpcCompatibleProcessor, MutateProcessorSheet } from '../types';

/**
 * 浏览器进程 IPC 调用器类
 */
export class IpcBCaller<IpcProcessorSheet extends MutateProcessorSheet<Record<string, IpcCompatibleProcessor>>> extends IpcAbstractCaller<IpcProcessorSheet> {

}


