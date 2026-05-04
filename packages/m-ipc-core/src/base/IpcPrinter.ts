import type { AbstractPrinter } from '../types';

export class IpcPrinter implements AbstractPrinter {
	public print(...messages: unknown[]) {
		console.log(...messages);
	}

	public printInfo(...messages: unknown[]) {
		console.info(...messages);
	}

	public printError(...messages: unknown[]) {
		console.error(...messages);
	}

	public printWarn(...messages: unknown[]) {
		console.warn(...messages);
	}

	public printSuccess(...messages: unknown[]) {
		console.info(...messages);
	}
}