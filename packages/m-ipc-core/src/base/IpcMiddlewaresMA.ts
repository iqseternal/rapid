import type { IpcMiddleware } from '../types'

export class IpcMiddlewaresMA {
	private middlewares: IpcMiddleware[];
	private middlewaresSheet: Map<string, IpcMiddleware>;

	public constructor(middlewares: IpcMiddleware[]) {
		this.middlewares = [];
		this.middlewaresSheet = new Map();
		middlewares.forEach(mw => this.insertMiddleware(mw));
	}

	public entries() {
		return [...this.middlewares];
	}

	public hasMiddleware(middleware:  string | IpcMiddleware) {
		const middlewareName = (typeof middleware === 'string' ? middleware : middleware.name);
		return this.middlewaresSheet.has(middlewareName);
	}

	public getMiddleware(middleware: string | IpcMiddleware) {
		const middlewareName = (typeof middleware === 'string' ? middleware : middleware.name);
		return this.middlewaresSheet.get(middlewareName);
	}

	public insertMiddleware(middleware: IpcMiddleware) {
		const middlewareName = middleware.name;
		if (this.hasMiddleware(middlewareName)) return false;

		this.middlewares.push(middleware);
		this.middlewaresSheet.set(middlewareName, middleware);
		return true;
	}

	public removeMiddleware(middleware: string | IpcMiddleware) {
		const middlewareName = (typeof middleware === 'string' ? middleware : middleware.name);
		if (!this.hasMiddleware(middlewareName)) return false;

		this.middlewares = this.middlewares.filter(mw => mw !== middleware);
		this.middlewaresSheet.delete(middlewareName);
		return true;
	}
}