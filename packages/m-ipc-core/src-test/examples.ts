/**
 * IpcManager 使用示例
 *
 * 展示新的统一 Processor API 的使用方式
 */

import type { IpcMainInvokeEvent } from 'electron';
import { BrowserWindow } from 'electron';
import { IpcManager } from '../src';

const ipcManager = new IpcManager();


interface WindowService {

	window: BrowserWindow;
}

const makeProcessor = ipcManager.withProcessorFactory<WindowService>({
	middlewares: []
});

const windowMax = makeProcessor(
	'window:max',
	{},
	async (windowService) => {
		// 获取当前窗口
		const window = windowService.window;

		if (!window) return;

		// 最大化
		window.maximize();
	}
)

const c = windowMax.channel;

windowMax.useMiddleware({
	name: 'sxx',

	onBeforeEach: (ctx, args) => {

		const name = ctx.metadata.get('accc');


	}

})
