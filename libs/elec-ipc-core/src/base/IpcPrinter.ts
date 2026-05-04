import type { AbstractPrinter } from '../types';

/**
 * IPC 日志打印器
 * @description 实现 AbstractPrinter 接口，提供统一的日志输出功能
 */
export class IpcPrinter implements AbstractPrinter {
	/**
	 * 打印普通日志消息
	 * @param messages - 要打印的消息列表（可变长参数）
	 */
	public print(...messages: unknown[]) {
		console.log(...messages);
	}

	/**
	 * 打印信息级别日志消息
	 * @param messages - 要打印的消息列表（可变长参数）
	 */
	public printInfo(...messages: unknown[]) {
		console.info(...messages);
	}

	/**
	 * 打印错误级别日志消息
	 * @param messages - 要打印的消息列表（可变长参数）
	 */
	public printError(...messages: unknown[]) {
		console.error(...messages);
	}

	/**
	 * 打印警告级别日志消息
	 * @param messages - 要打印的消息列表（可变长参数）
	 */
	public printWarn(...messages: unknown[]) {
		console.warn(...messages);
	}

	/**
	 * 打印成功级别日志消息
	 * @description 目前使用 console.info 实现，可根据需要自定义样式
	 * @param messages - 要打印的消息列表（可变长参数）
	 */
	public printSuccess(...messages: unknown[]) {
		console.info(...messages);
	}
}