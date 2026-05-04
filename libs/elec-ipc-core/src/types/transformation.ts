
import type { IpcCompatibleProcessor, IpcType, IpcTypeBoth } from './definition';
import type { CutHead } from '@suey/pkg-utils';

/**
 * 处理器转换类型
 * @description 将 IPC 处理器转换为包含通道、类型、参数、返回值和自定义处理器的完整结构
 * @template T - 要转换的 IPC 兼容处理器类型
 */
export type MutateProcessor<T extends IpcCompatibleProcessor> = {
	/** IPC 通信通道名称 */
	channel: T['channel'];

	/** IPC 类型（handle/on/both） */
	type: T['type'];

	/**
	 * 处理器参数列表（去除第一个事件参数）
	 * @description 使用 CutHead 工具类型移除 listener 的第一个参数（通常是事件对象）
	 */
	args: CutHead<Parameters<T['listener']>>;

	/**
	 * 处理器返回值类型
	 * @description 等待 handler 返回值的 Promise 解析后的类型
	 */
	return: Awaited<ReturnType<T['handler']>>;

	/**
	 * 自定义处理器函数
	 * @description 接收去除第一个参数后的 handler 参数，返回 listener 的完整返回值类型
	 */
	handler: (...args: CutHead<Parameters<T['handler']>>) => ReturnType<T['listener']>;
};

/**
 * 处理器记录转换映射表
 * @description 将处理器记录对象转换为以通道名称为键的 MutateProcessor 映射表
 * @template PRecord - 处理器记录对象，键为任意字符串，值为 IPC 兼容处理器
 */
export type MutateProcessorSheet<PRecord extends Record<string, IpcCompatibleProcessor>> = {
	/**
	 * 映射规则：使用处理器的 channel 属性作为新的键名
	 * @description 遍历记录中的每个处理器，将其转换为 MutateProcessor 类型，并以 channel 作为键
	 */
	[Key in keyof PRecord as PRecord[Key]['channel']]: MutateProcessor<PRecord[Key]>;
};

/**
 * 提取指定类型的处理器映射表
 * @description 从完整的处理器映射表中筛选出符合指定 IPC 类型的处理器
 * @template PRecord - 已转换的处理器映射表
 * @template PType - 要筛选的目标 IPC 类型
 */
export type ExtractMutateProcessorSheet<PRecord extends MutateProcessorSheet<Record<string, IpcCompatibleProcessor>>, PType extends IpcType> = {
	/**
	 * 筛选规则：保留 type 匹配 PType 或 IpcTypeBoth 的处理器
	 * @description 如果处理器的 type 是目标类型或是 both 类型，则保留该键值对，否则排除
	 */
	[
		Key in keyof PRecord as (
			PRecord[Key]['type'] extends (PType | IpcTypeBoth)
				? Key
				: never
		)
	]: PRecord[Key];
};
