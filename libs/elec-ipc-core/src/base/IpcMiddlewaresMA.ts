import type { IpcMiddleware } from '../types'

/**
 * IPC 中间件管理数组（Middlewares Management Array）
 * @description 提供中间件的增删查改功能，通过数组和 Map 双数据结构实现高效管理
 */
export class IpcMiddlewaresMA {
	/**
	 * 中间件数组，保持插入顺序
	 */
	private middlewares: IpcMiddleware[];

	/**
	 * 中间件名称映射表，用于快速查找
	 */
	private middlewaresSheet: Map<string, IpcMiddleware>;

	/**
	 * 创建中间件管理器实例
	 * @param middlewares - 初始中间件列表，会自动去重并添加到管理器中
	 */
	public constructor(middlewares: IpcMiddleware[]) {
		this.middlewares = [];
		this.middlewaresSheet = new Map();
		middlewares.forEach(mw => this.insertMiddleware(mw));
	}

	/**
	 * 获取所有中间件的副本数组
	 * @returns 返回当前所有中间件的浅拷贝数组，保持插入顺序
	 */
	public entries() {
		return [...this.middlewares];
	}

	/**
	 * 检查中间件是否存在
	 * @param middleware - 中间件对象或中间件名称
	 * @returns 如果中间件存在则返回 true，否则返回 false
	 */
	public hasMiddleware(middleware:  string | IpcMiddleware) {
		const middlewareName = (typeof middleware === 'string' ? middleware : middleware.name);
		return this.middlewaresSheet.has(middlewareName);
	}

	/**
	 * 获取指定的中间件
	 * @param middleware - 中间件对象或中间件名称
	 * @returns 返回找到的中间件对象，如果不存在则返回 undefined
	 */
	public getMiddleware(middleware: string | IpcMiddleware) {
		const middlewareName = (typeof middleware === 'string' ? middleware : middleware.name);
		return this.middlewaresSheet.get(middlewareName);
	}

	/**
	 * 插入中间件到管理器
	 * @description 同时更新数组和 Map，确保数据一致性
	 * @param middleware - 要插入的中间件对象
	 * @returns 如果插入成功返回 true，如果中间件已存在则返回 false
	 */
	public insertMiddleware(middleware: IpcMiddleware) {
		const middlewareName = middleware.name;
		if (this.hasMiddleware(middlewareName)) return false;

		this.middlewares.push(middleware);
		this.middlewaresSheet.set(middlewareName, middleware);
		return true;
	}

	/**
	 * 从管理器中移除中间件
	 * @description 同时从数组和 Map 中删除，确保数据一致性
	 * @param middleware - 要移除的中间件对象或中间件名称
	 * @returns 如果移除成功返回 true，如果中间件不存在则返回 false
	 */
	public removeMiddleware(middleware: string | IpcMiddleware) {
		const middlewareName = (typeof middleware === 'string' ? middleware : middleware.name);
		if (!this.hasMiddleware(middlewareName)) return false;

		this.middlewares = this.middlewares.filter(mw => mw !== middleware);
		this.middlewaresSheet.delete(middlewareName);
		return true;
	}
}