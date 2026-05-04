
export interface AbstractPrinter {
	/**
	 * print
	 */
	print(...messages: unknown[]): void;

	/**
	 * 日志信息
	 */
	printInfo(...messages: unknown[]): void;

	/**
	 * 错误信息
	 */
	printError(...messages: unknown[]): void;

	/**
	 * 警告信息
	 */
	printWarn(...messages: unknown[]): void;

	/**
	 * 成功信息
	 */
	printSuccess(...messages: unknown[]): void;
}
