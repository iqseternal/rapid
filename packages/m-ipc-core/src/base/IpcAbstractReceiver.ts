import { ipcMain } from 'electron';
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
import { IpcMiddlewaresMA, IpcPrinter } from '../base';
import { IsUnknown, IsType, IsUndefined, type CutHead, IsAny, Type, Nil, toNil } from '@suey/pkg-utils';
import type { IpcMainInvokeEvent, IpcMainEvent, IpcRendererEvent, IpcMessageEvent } from 'electron';

export interface FindHandleHandlingOptions {
	channel: string;

	type: IpcType;

	middlewares: IpcMiddleware[];

	handler: IpcProcessor<IpcType, any>['handler'];
}

export async function applyOnBeforeEach(middlewares: IpcMiddleware[], ipcMiddlewareContext: IpcMiddlewareContext, ...convertArgs: any[]) {
	for (let i = 0; i < middlewares.length; i++) {
		const middleware = middlewares[i];
		if (!middleware.onBeforeEach) continue;

		const [err] = await toNil(Promise.resolve(middleware.onBeforeEach(ipcMiddlewareContext, ...convertArgs)));
		if (err) return Promise.reject(err.reason);
	}
}

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

export async function applyOnAfterEach(middlewares: IpcMiddleware[], ipcMiddlewareContext: IpcMiddlewareContext, response: any) {
	for (let i = 0; i < middlewares.length; i++) {
		const middleware = middlewares[i];
		if (!middleware.onAfterEach) continue;

		middleware.onAfterEach(ipcMiddlewareContext, response);
	}
}

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

export async function findHandleHandling(globalMiddlewares: IpcMiddleware[], options: FindHandleHandlingOptions, ...ipcArgs: unknown[]) {

}

/**
 * 处理一个 `action`, 来解决对应的 ipc 句柄, 并处理响应
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

	let response: any = void 0;
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
					: (IpcType extends FirstType ? IpcTypeBoth : FirstType)
				)
			: (
				IpcType extends SecondType
					? (IpcType extends FirstType ? IpcTypeBoth : FirstType)
					: SecondType
				)
		);

	export type InferIpcDefaultEvent<FirstType extends (IpcType | undefined), SecondType extends (IpcType | undefined) = undefined> = IpcDefaultEvent<IpcAbstractReceiver.InferIpcType<FirstType, SecondType>>;

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
 * IPC 管理器
 */
export class IpcAbstractReceiver {
	protected readonly ipcMiddlewaresMa: IpcMiddlewaresMA;
	protected readonly printer: AbstractPrinter;

	/**
	 * 创建 IPC 管理器
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
	 * 销毁全局中间件
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
	 * 创建 Processor 工厂
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
			makeHandleProcessor,
			makeOnProcessor,
			makeProcessor,
		};
	}

	/**
	 * 创建 IPC 处理器（Processor）
	 * @param channel - IPC 通信通道名称
	 * @param options - 配置选项，包含类型和初始中间件列表
	 * @param handler - 处理器函数，接收事件和参数
	 * @returns 返回可链式调用的 Processor 对象
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
		const { type = 'both' as Type, middlewares = [] as IpcMiddleware[] } = options;

		// 2. 过滤并去重初始中间件列表（只检查 processor 内部重复）
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
		const state = {
			channel,
			type: type as Type,
			handler: handler,

			middlewares: [...uniqueMiddlewares],
		}

		// 4. 构建 Processor 对象，支持动态添加/移除中间件
		const processor: IpcProcessor<IpcAbstractReceiver.InferIpcType<Type>, ProcessorFirstArg, Channel, ProcessorHandler> = {
			channel,
			type: type as IpcAbstractReceiver.InferIpcType<Type>,
			handler: handler,
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
			// 获取当前中间件列表（只读访问）
			get middlewares() {
				return state.middlewares;
			},
			/**
			 * 动态添加中间件到处理器
			 * 执行双重过滤：排除已存在的中间件、排除重复项
			 * @param middlewares - 要添加的中间件列表（可变长参数）
			 * @returns 返回 processor 自身，支持链式调用
			 */
			useMiddleware: (...middlewares) => {
				// 获取当前已存在的中间件名称集合
				const innerMiddlewares = state.middlewares;
				const innerMiddlewareNames = new Set(innerMiddlewares.map(mw => mw.name));

				// 过滤并收集有效的中间件（双重过滤）
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

				// 将有效的中间件添加到处理器
				state.middlewares.push(...availedMiddlewares);
				return processor;
			},
			/**
			 * 从处理器中移除指定的中间件
			 * 执行双重过滤：排除不存在的中间件、排除重复项
			 * @param middlewares - 要移除的中间件列表（可变长参数）
			 * @returns 返回 processor 自身，支持链式调用
			 */
			revokeMiddleware: (...middlewares) => {
				// 获取当前已存在的中间件名称集合
				const innerMiddlewares = state.middlewares;
				const innerMiddlewareNames = new Set(innerMiddlewares.map(mw => mw.name));

				// 过滤并收集需要移除的中间件（双重过滤）
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

				// 执行删除操作：逐个从数组中移除
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
