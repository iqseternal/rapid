import type { IpcCompatibleProcessor, IpcCallerConfig, MutateProcessorSheet, IpcTypeHandle, ExtractMutateProcessorSheet, IpcTypeOn } from '../types';
import { ipcRenderer } from 'electron';
import { toNil } from '@suey/pkg-utils';

/**
 * 渲染进程 IPC 调用器类
 *
 * 提供面向对象的渲染进程 IPC 调用方式
 */
export class IpcAbstractCaller<IpcProcessorSheet extends MutateProcessorSheet<Record<string, IpcCompatibleProcessor>>> {
	protected readonly ipcCallerConfig: IpcCallerConfig;

	/**
	 * 创建 IPC 调用器实例
	 *
	 * @param ipcCallerConfig
	 */
	public constructor(ipcCallerConfig?: IpcCallerConfig) {
		let {
			timeout = 0,
			retry = 0,
			retryDelay = 0
		} = ipcCallerConfig ?? {};

		timeout = Number(timeout.toFixed(0));
		if (timeout < 0) timeout = 0;

		retry = Number(retry.toFixed(0));
		if (retry < 0) retry = 0;

		this.ipcCallerConfig = {
			timeout,
			retry,
			retryDelay
		} as const;
	}

	/**
	 * 解析 ipc 拒绝信息字符串为可用 Error
	 */
	private extractIpcRefusedReason = (err: Error)=> {
		const data = err.message.match(/Error invoking remote method .*?:/);
		if (data) return err.message.replace(data[0], '').trim();
		return null;
	}

	/**
	 * 调用 IPC 句柄
	 *
	 * @param channel - 句柄名称
	 * @param args - 参数列表
	 * @returns 响应结果
	 */
	public invoke = async<Key extends keyof ExtractMutateProcessorSheet<IpcProcessorSheet, IpcTypeHandle>>(channel: Key, ...args: IpcProcessorSheet[Key]['args']): Promise<IpcProcessorSheet[Key]['return']> => {
		const [err, response] = await toNil(ipcRenderer.invoke(channel as string, ...args));
		if (err) {
			const expStr = this.extractIpcRefusedReason(err.reason as Error);
			if (expStr) return Promise.reject(JSON.parse(expStr));
			throw new Error('解析 ipc 句柄的错误信息失败');
		}
		return response;
	}

	/**
	 * 发送 IPC 消息
	 *
	 * @param channel - 通道名称
	 * @param args - 参数列表
	 */
	public send = <Key extends keyof ExtractMutateProcessorSheet<IpcProcessorSheet, IpcTypeOn>>(channel: Key, ...args: IpcProcessorSheet[Key]['args']): void => {
		ipcRenderer.send(channel as string, ...args);
	}
}

