import {
	IpcProcessor,
	IpcMiddleware,
	IpcType,
	IpcTypeHandle,
	IpcTypeOn,
	IpcTypeBoth,
	IpcDefaultEvent,
	IpcMiddlewareContext
} from '../types';
import type { AbstractPrinter } from '../types';
import { IpcMiddlewaresMA, IpcPrinter } from './index';
import { IsUnknown, IsAny, Nil, toNil } from '@suey/pkg-utils';
import type { IpcMainInvokeEvent, IpcMainEvent } from 'electron';

/**
 * 查找并处理 IPC 句柄的执行选项接口
 */
export interface FindHandleHandlingOptions {
	/** IPC 通信通道名称 */
	channel: string;

	/** IPC 类型（handle/on/both） */
	type: IpcType;

	/** 中间件列表 */
	middlewares: IpcMiddleware[];

	/** 处理器函数 */
	handler: IpcProcessor<IpcType, any>['handler'];
}

/**
 * 应用所有中间件的 onBeforeEach 钩子函数（前置处理）
 * @param middlewares - 中间件列表
 * @param ipcMiddlewareContext - IPC 中间件上下文
 * @param convertArgs - 转换后的参数列表
 * @returns 如果出现错误则返回被拒绝的 Promise，否则继续执行
 */
export async function applyOnBeforeEach(middlewares: IpcMiddleware[], ipcMiddlewareContext: IpcMiddlewareContext, ...convertArgs: any[]): Promise<void> {
	for (let i = 0; i < middlewares.length; i++) {
		const middleware = middlewares[i];
		if (!middleware.onBeforeEach) continue;

		const [err] = await toNil(Promise.resolve(middleware.onBeforeEach(ipcMiddlewareContext, ...convertArgs)));
		if (err) return Promise.reject(err.reason);
	}
	return;
}

/**
 * 应用所有中间件的 transformArgs 钩子函数（参数转换）
 * @param middlewares - 中间件列表
 * @param ipcMiddlewareContext - IPC 中间件上下文
 * @param convertArgs - 原始参数列表
 * @returns 转换后的参数列表，如果出现错误则返回被拒绝的 Promise
 */
export async function applyTransformArgs(middlewares: IpcMiddleware[], ipcMiddlewareContext: IpcMiddlewareContext, ...convertArgs: [any, ...any[]]) {
	let finalConvertArgs = convertArgs;

	for (let i = 0; i < middlewares.length; i++) {
		const middleware = middlewares[i];
		if (!middleware.transformArgs) continue;

		const [err, args] = await toNil(Promise.resolve(middleware.transformArgs(ipcMiddlewareContext, ...finalConvertArgs)));
		if (err) return Promise.reject(err.reason);

		finalConvertArgs = args;
	}

	return finalConvertArgs;
}

/**
 * 应用所有中间件的 onError 钩子函数（错误处理）
 * @param middlewares - 中间件列表
 * @param ipcMiddlewareContext - IPC 中间件上下文
 * @param err - 错误原因对象
 * @returns 如果错误被某个中间件解决则返回 true，否则返回 false；如果出现错误则返回被拒绝的 Promise
 */
export async function applyOnError(middlewares: IpcMiddleware[], ipcMiddlewareContext: IpcMiddlewareContext, err: Nil.NilRefusedReasonType) {
	let isResolved = false;

	for (let i = 0; i < middlewares.length; i++) {
		const middleware = middlewares[i];
		if (!middleware.onError) continue;

		const [error, resolved] = await toNil(Promise.resolve(middleware.onError(ipcMiddlewareContext, err.reason)));
		if (error) return Promise.reject(err.reason);

		if (resolved) {
			isResolved = true;
			break;
		}
	}

	return isResolved;
}

/**
 * 应用所有中间件的 onAfterEach 钩子函数（后置处理）
 * @param middlewares - 中间件列表
 * @param ipcMiddlewareContext - IPC 中间件上下文
 * @param response - 响应数据
 */
export async function applyOnAfterEach(middlewares: IpcMiddleware[], ipcMiddlewareContext: IpcMiddlewareContext, response: any) {
	for (let i = 0; i < middlewares.length; i++) {
		const middleware = middlewares[i];
		if (!middleware.onAfterEach) continue;

		middleware.onAfterEach(ipcMiddlewareContext, response);
	}
}

/**
 * 应用所有中间件的 transformResponse 钩子函数（响应转换）
 * @param middlewares - 中间件列表
 * @param ipcMiddlewareContext - IPC 中间件上下文
 * @param response - 原始响应数据
 * @returns 转换后的响应数据，如果出现错误则返回被拒绝的 Promise
 */
export async function applyTransformResponse(middlewares: IpcMiddleware[], ipcMiddlewareContext: IpcMiddlewareContext, response: any) {
	let finalResponse = response;

	for (let i = 0; i < middlewares.length; i++) {
		const middleware = middlewares[i];
		if (!middleware.transformResponse) continue;

		const [err, res] = await toNil(middleware.transformResponse(ipcMiddlewareContext, finalResponse));
		if (err) return Promise.reject(err.reason);

		finalResponse = res;
	}

	return finalResponse;
}

/**
 * 处理一个 action，解决对应的 IPC 句柄，并处理响应（带保护机制）
 *
 * 执行流程：
 * 1. 创建 IPC 中间件上下文
 * 2. 依次执行全局和内部中间件的前置钩子（onBeforeEach）
 * 3. 依次执行全局和内部中间件的参数转换（transformArgs）
 * 4. 调用实际的处理器函数（handler）
 * 5. 如果处理器出错，依次尝试内部和全局的错误处理（onError）
 * 6. 依次执行内部和全局中间件的响应转换（transformResponse）
 * 7. 依次执行内部和全局中间件的后置钩子（onAfterEach）
 * 8. 根据是否失败决定返回或抛出异常
 *
 * @param globalMiddlewares - 全局中间件列表
 * @param options - 处理选项配置（包含 channel、type、middlewares、handler）
 * @param ipcArgs - IPC 参数列表（第一个参数是事件对象，其余是其他参数）
 * @returns 处理后的响应数据，如果失败则抛出异常
 */
export async function findHandleHandlingGuard(globalMiddlewares: IpcMiddleware[], options: FindHandleHandlingOptions, ...ipcArgs: unknown[]) {
	const [event, ...otherArgs] = ipcArgs as [IpcMainInvokeEvent | IpcMainEvent, ...unknown[]];

	const ipcMiddlewareContext: IpcMiddlewareContext = {
		channel: options.channel,
		type: options.type,
		startTime: new Date().getTime(),
		metadata: new Map(),
		event: event,
	} as const;

	const innerMiddlewares = options.middlewares;

	let response: any;
	let isFailed = false;

	const [err, res] = await toNil((async () => {
		let args = [event, ...otherArgs] as [unknown, ...unknown[]];

		const [outerOnBeforeEachErr] = await toNil(applyOnBeforeEach(globalMiddlewares, ipcMiddlewareContext, ...args));
		if (outerOnBeforeEachErr) return Promise.reject(outerOnBeforeEachErr.reason);

		const [outerTransFormArgsErr, outerConvertArgs] = await toNil(applyTransformArgs(globalMiddlewares, ipcMiddlewareContext, ...args));
		if (outerTransFormArgsErr) return Promise.reject(outerTransFormArgsErr.reason);

		args = outerConvertArgs;

		const [innerOnBeforeEachErr] = await toNil(applyOnBeforeEach(innerMiddlewares, ipcMiddlewareContext, ...args));
		if (innerOnBeforeEachErr) return Promise.reject(innerOnBeforeEachErr.reason);

		const [innerTransFormArgsErr, innerConvertArgs] = await toNil(applyTransformArgs(innerMiddlewares, ipcMiddlewareContext, ...args));
		if (innerTransFormArgsErr) return Promise.reject(innerTransFormArgsErr.reason);

		args = innerConvertArgs;

		const handler = options.handler;

		const [handlerErr, res] = await toNil(Promise.resolve(handler(...args)));
		if (handlerErr) {
			let isResolved = false;

			const [innerOnErrorErr, innerOnErrorResolved] = await toNil(applyOnError(innerMiddlewares, ipcMiddlewareContext, handlerErr.reason));
			if (innerOnErrorErr) return Promise.reject(innerOnErrorErr.reason);

			if (innerOnErrorResolved) isResolved = true;
			if (isResolved) return res;

			const [outerOnErrorErr, outerOnErrorResolved] = await toNil(applyOnError(globalMiddlewares, ipcMiddlewareContext, handlerErr.reason));
			if (outerOnErrorErr) return Promise.reject(outerOnErrorErr.reason);
			if (outerOnErrorResolved) isResolved = true;

			if (isResolved) return res;
			return Promise.reject(new Error('ipc handler error is unresolved.'));
		}

		return res;
	})());

	if (err) {
		isFailed = true;
		response = err.reason;
	}
	else response = res;

	const [innerTransFormErr, innerResponse] = await toNil(applyTransformResponse(innerMiddlewares, ipcMiddlewareContext, response));
	if (innerTransFormErr) return Promise.reject(innerTransFormErr.reason);

	response = innerResponse;

	const [outerTransFormErr, outerResponse] = await toNil(applyTransformResponse(globalMiddlewares, ipcMiddlewareContext, response));
	if (outerTransFormErr) return Promise.reject(outerTransFormErr.reason);

	response = outerResponse;

	await applyOnAfterEach(innerMiddlewares, ipcMiddlewareContext, response);
	await applyOnAfterEach(globalMiddlewares, ipcMiddlewareContext, response);

	if (isFailed) return Promise.reject(response);

	return response;
}

export namespace IpcAbstractReceiver {
	/**
	 * IPC 类型推测
	 * @description 当传递的 IPC 类型为宽泛的 IpcType 时, 用于推导出当前最为合理的类型
	 * @todo: 为什么会有两个泛型传递? 当工厂函数支持传递默认 type 的时候, 此推导将会以 内部到外部的 优先级推测 type 类型值
	 */
	export type InferIpcType<FirstType extends (IpcType | undefined), SecondType extends (IpcType | undefined) = undefined> = (
		SecondType extends undefined
			? (
				FirstType extends undefined
					? IpcTypeBoth
					: (IpcType extends FirstType ? IpcTypeBoth : NonNullable<FirstType>)
				)
			: (
				IpcType extends SecondType
					? (IpcType extends FirstType ? IpcTypeBoth : NonNullable<FirstType>)
					: SecondType
				)
		);

	/**
	 * 根据推断的 IPC 类型获取默认事件类型
	 * @description 用于在类型系统中自动推导合适的事件对象类型
	 */
	export type InferIpcDefaultEvent<FirstType extends (IpcType | undefined), SecondType extends (IpcType | undefined) = undefined> = IpcDefaultEvent<IpcAbstractReceiver.InferIpcType<FirstType, SecondType>>;

	/**
	 * 推断处理器函数的签名类型
	 * @description 根据 IPC 类型、第一个参数类型、剩余参数类型和返回值类型构建完整的处理器函数签名
	 * @template Type - IPC 类型，默认为 IpcTypeBoth
	 * @template FirstArg - 第一个参数的类型，如果为 unknown 则使用默认事件类型
	 * @template RemainingArgs - 剩余参数的类型数组
	 * @template Return - 返回值类型，如果为 any 则包装为 Promise
	 */

	export type InferProcessorHandler<Type extends (IpcType | undefined) = IpcTypeBoth, FirstArg extends unknown = unknown, RemainingArgs extends any[] = any[], Return extends any = any> = (
		first: IsUnknown<
			FirstArg,
			IpcAbstractReceiver.InferIpcDefaultEvent<Type>,
			FirstArg
		>,
		...args: RemainingArgs
	) => IsAny<Return, Promise<Return>, Return> | Return;
}

	/**
	 * IPC 抽象接收器基类
	 * @description 提供 IPC 通信的核心功能，包括中间件管理、处理器创建和执行等
	 */
export class IpcAbstractReceiver {
	/**
	 * 全局中间件管理数组实例（受保护）
	 */
	protected readonly ipcMiddlewaresMa: IpcMiddlewaresMA;

	/**
	 * 日志打印器实例（受保护）
	 */
	protected readonly printer: AbstractPrinter;

	/**
	 * 创建 IPC 管理器实例（受保护的构造函数）
	 * @param options - 配置选项
	 * @param options.middlewares - 初始全局中间件列表，默认为空数组
	 * @param options.printer - 自定义日志打印器，如果不提供则使用默认的 IpcPrinter
	 */
	protected constructor(
		options?: {
			middlewares?: IpcMiddleware[];
			printer?: AbstractPrinter;
		}
	) {
		const { middlewares = [] as IpcMiddleware[], printer } = options || {};

		this.ipcMiddlewaresMa = new IpcMiddlewaresMA(middlewares);
		this.printer = printer ?? new IpcPrinter();
	}

	/**
	 * 注册全局中间件
	 *
	 * 注意：
	 * - 全局中间件应该在应用启动时尽早注册
	 * - 避免将已用作局部中间件的名称注册为全局中间件
	 * - 如果存在同名冲突，createProcessor 会自动过滤局部中间件
	 *
	 * @param middlewares - 要注册的全局中间件列表（可变长参数）
	 * @returns 返回 this，支持链式调用
	 */
	public useGlobalMiddleware(...middlewares: IpcMiddleware[]): this {
		for (const mw of middlewares) {
			if (this.ipcMiddlewaresMa.hasMiddleware(mw)) {
				this.printer.printWarn(`忽略重复注册的全局中间件：${mw.name}`);
				continue;
			}

			const isInserted = this.ipcMiddlewaresMa.insertMiddleware(mw);
			if (!isInserted) this.printer.printError(`注册全局中间件失败：${mw.name}`);
		}
		return this;
	}

	/**
	 * 销毁（移除）全局中间件
	 * @param middlewares - 要移除的全局中间件列表（可变长参数）
	 */
	public revokeGlobalMiddleware(...middlewares: IpcMiddleware[]) {
		for (const mw of middlewares) {
			if (!this.ipcMiddlewaresMa.hasMiddleware(mw)) {
				this.printer.printWarn(`错误地尝试销毁不存在的全局中间件：${mw.name}`);
				continue;
			}

			const isRemoved = this.ipcMiddlewaresMa.removeMiddleware(mw);
			if (!isRemoved) this.printer.printError(`销毁全局中间件失败：${mw.name}`);
		}
	}

	/**
	 * 创建 Processor 工厂函数
	 * @description 返回一组便捷方法，用于快速创建不同类型的 IPC 处理器
	 *
	 * @template ProcessorFirstArg - 处理器第一个参数的类型，默认为根据 IPC 类型推断的默认事件类型
	 * @param options - 配置选项
	 * @param options.middlewares - 工厂级别的中间件列表，这些中间件会被添加到所有通过此工厂创建的处理器中
	 * @returns 包含三个方法的对象：makeHandleProcessor、makeOnProcessor、makeProcessor
	 */
	public withProcessorFactory<ProcessorFirstArg extends any = IpcAbstractReceiver.InferIpcDefaultEvent<IpcType>>(
		options?: {
			middlewares?: IpcMiddleware[],
		}
	) {
		const { middlewares = [] as IpcMiddleware[] } = options || {};

		const makeProcessor = (<
			Type extends (IpcType | undefined) = undefined,
			Channel extends string = string,
			ProcessorHandler extends IpcAbstractReceiver.InferProcessorHandler<Type, ProcessorFirstArg> = IpcAbstractReceiver.InferProcessorHandler<Type, ProcessorFirstArg>,
		>(
			channel: Channel,
			options: {
				type?: Type,
				middlewares?: IpcMiddleware[],
			},
			handler: ProcessorHandler
		) => {

			return this.createProcessor<
				Type,
				Channel,
				ProcessorFirstArg,
				ProcessorHandler
			>(
				channel,
				{
					type: options.type,
					middlewares: [...middlewares].concat(options.middlewares ?? []),
				},
				handler
			);
		})

		const makeHandleProcessor = (<
			Channel extends string = string,
			ProcessorHandler extends IpcAbstractReceiver.InferProcessorHandler<IpcTypeHandle, ProcessorFirstArg> = IpcAbstractReceiver.InferProcessorHandler<IpcTypeHandle, ProcessorFirstArg>,
		>(
			channel: Channel,
			options: {
				middlewares?: IpcMiddleware[],
			},
			handler: ProcessorHandler
		) => makeProcessor(channel, { ...options, type: 'handle' }, handler));

		const makeOnProcessor = (<
			Channel extends string = string,
			ProcessorHandler extends IpcAbstractReceiver.InferProcessorHandler<IpcTypeOn, ProcessorFirstArg> = IpcAbstractReceiver.InferProcessorHandler<IpcTypeOn, ProcessorFirstArg>,
		>(
			channel: Channel,
			options: {
				middlewares?: IpcMiddleware[],
			},
			handler: ProcessorHandler
		) => makeProcessor(channel, { ...options, type: 'on' }, handler));

		return {
			makeHandleProcessor: makeHandleProcessor,
			makeOnProcessor: makeOnProcessor,
			makeProcessor: makeProcessor,
		} as const;
	}

	/**
	 * 创建 IPC 处理器（Processor）
	 * @description 这是核心的处理器创建方法，支持完整的类型推断和中间件管理
	 *
	 * @template Type - IPC 类型（handle/on/both），默认为 'both'
	 * @template Channel - 通道名称字符串类型，用于类型安全
	 * @template ProcessorFirstArg - 处理器第一个参数的类型
	 * @template ProcessorHandler - 处理器函数的完整签名类型，根据其他泛型自动推断
	 *
	 * @param channel - IPC 通信通道名称，必须唯一标识一个 IPC 端点
	 * @param options - 配置选项
	 * @param options.type - IPC 类型，可选值为 'handle'、'on' 或 'both'，默认为 'both'
	 * @param options.middlewares - 初始中间件列表，这些中间件仅作用于当前处理器
	 * @param handler - 处理器函数，接收事件对象和其他参数，返回 Promise 或普通值
	 *
	 * @returns 返回可链式调用的 Processor 对象，包含 listener、middlewares、useMiddleware、revokeMiddleware 等属性和方法
	 */
	public createProcessor<
		Type extends (IpcType | undefined),
		Channel extends string,
		ProcessorFirstArg extends unknown,
		ProcessorHandler extends IpcAbstractReceiver.InferProcessorHandler<Type, ProcessorFirstArg> = IpcAbstractReceiver.InferProcessorHandler<Type, ProcessorFirstArg>
	>(
		channel: Channel,
		options: {
			type?: Type,
			middlewares?: IpcMiddleware[],
		},
		handler: ProcessorHandler
	) {
		// 1. 设置默认值：type 默认为 'both'，middlewares 默认为空数组
		const { type = 'both' as Type, middlewares = [] as IpcMiddleware[] } = options;

		// 2. 过滤并去重初始中间件列表（只检查 processor 内部重复）
		// 目的：确保同一个中间件不会在同一个处理器中重复注册
		const availedMiddlewareNames = new Set<string>();
		const uniqueMiddlewares = [] as IpcMiddleware[];

		middlewares.forEach(mw => {
			// 检查: 不能与当前列表中的中间件重复
			if (availedMiddlewareNames.has(mw.name)) {
				this.printer.printWarn(`忽略重复的 middleware: ${mw.name}`);
				return;
			}
			// 通过检查，添加到有效列表
			availedMiddlewareNames.add(mw.name);
			uniqueMiddlewares.push(mw);
		})

		// 3. 使用 state 对象封装中间件数组，避免闭包问题
		// 说明：通过引用 state 对象，确保 useMiddleware 和 revokeMiddleware 操作的是同一份数据
		const state = {
			channel,
			type: type as Type,
			handler: handler,

			middlewares: [...uniqueMiddlewares],
		}

		// 4. 构建 Processor 对象，支持动态添加/移除中间件
		// 结构：包含 channel、type、handler、listener 以及中间件管理方法
		const processor: IpcProcessor<IpcAbstractReceiver.InferIpcType<Type>, ProcessorFirstArg, Channel, ProcessorHandler> = {
			channel,
			type: type as IpcAbstractReceiver.InferIpcType<Type>,
			handler: handler,
			/**
			 * IPC 监听器函数，当 IPC 消息到达时被调用
			 * @param args - IPC 参数列表（第一个是事件对象，其余是其他参数）
			 * @returns 处理后的响应数据的 Promise
			 */
			listener: (...args) => {
				const globalMiddlewares = this.ipcMiddlewaresMa.entries();

				const options: FindHandleHandlingOptions = {
					channel: processor.channel,
					type: processor.type,
					handler: processor.handler,
					middlewares: processor.middlewares,
				};

				return findHandleHandlingGuard(globalMiddlewares, options, ...args) as Promise<Awaited<ReturnType<ProcessorHandler>>>;
			},
			/**
			 * 获取当前中间件列表（只读访问）
			 * @returns 返回当前处理器中的所有中间件数组的副本
			 */
			get middlewares() {
				return state.middlewares;
			},
			/**
			 * 动态添加中间件到处理器
			 * @description 执行双重过滤：排除已存在的中间件、排除本次添加中的重复项
			 *
			 * @param middlewares - 要添加的中间件列表（可变长参数）
			 * @returns 返回 processor 自身，支持链式调用
			 *
			 * @example
			 * ```typescript
			 * processor.useMiddleware(middleware1, middleware2)
			 *   .useMiddleware(middleware3);
			 * ```
			 */
			useMiddleware: (...middlewares) => {
				// 获取当前已存在的中间件名称集合，用于快速查找
				const innerMiddlewares = state.middlewares;
				const innerMiddlewareNames = new Set(innerMiddlewares.map(mw => mw.name));

				// 过滤并收集有效的中间件（双重过滤）
				// 第一重：不能已在处理器的中间件列表中
				// 第二重：不能在本次添加的列表中重复
				const availedMiddlewareNames = new Set<string>();
				const availedMiddlewares = [] as IpcMiddleware[];

				middlewares.forEach(mw => {
					// 检查1: 不能已在处理器的中间件列表中
					if (innerMiddlewareNames.has(mw.name)) {
						this.printer.printWarn(`忽略已注册的 middleware：${mw.name}`);
						return;
					}
					// 检查2: 不能在本次添加的列表中重复
					if (availedMiddlewareNames.has(mw.name)) {
						this.printer.printWarn(`忽略重复的 middleware：${mw.name}`);
						return;
					}
					// 通过所有检查，添加到有效列表
					availedMiddlewareNames.add(mw.name);
					availedMiddlewares.push(mw);
				})

				// 将有效的中间件添加到处理器数组末尾
				state.middlewares.push(...availedMiddlewares);
				return processor;
			},
			/**
			 * 从处理器中移除指定的中间件
			 * @description 执行双重过滤：排除不存在的中间件、排除本次移除中的重复项
			 *
			 * @param middlewares - 要移除的中间件列表（可变长参数）
			 * @returns 返回 processor 自身，支持链式调用
			 *
			 * @example
			 * ```typescript
			 * processor.revokeMiddleware(middleware1, middleware2);
			 * ```
			 */
			revokeMiddleware: (...middlewares) => {
				// 获取当前已存在的中间件名称集合，用于验证中间件是否存在
				const innerMiddlewares = state.middlewares;
				const innerMiddlewareNames = new Set(innerMiddlewares.map(mw => mw.name));

				// 过滤并收集需要移除的中间件（双重过滤）
				// 第一重：必须在处理器的中间件列表中存在
				// 第二重：不能在本次移除的列表中重复
				const targetMiddlewareNames = new Set<string>();
				const targetMiddlewares = [] as IpcMiddleware[];

				middlewares.forEach(mw => {
					// 检查1: 必须在处理器的中间件列表中存在
					if (!innerMiddlewareNames.has(mw.name)) {
						this.printer.printWarn(`错误地尝试销毁不存在的中间件：${mw.name}`);
						return;
					}
					// 检查2: 不能在本次移除的列表中重复
					if (targetMiddlewareNames.has(mw.name)) {
						this.printer.printWarn(`忽略重复的 middleware：${mw.name}`);
						return;
					}
					// 通过所有检查，添加到待移除列表
					targetMiddlewareNames.add(mw.name);
					targetMiddlewares.push(mw);
				})

				// 执行删除操作：逐个从数组中移除匹配的中间件
				targetMiddlewares.forEach(mw => {
					const index = state.middlewares.findIndex(m => m.name === mw.name);
					if (index !== -1) state.middlewares.splice(index, 1);
				})

				return processor;
			},
		};

		return processor;
	}
}
