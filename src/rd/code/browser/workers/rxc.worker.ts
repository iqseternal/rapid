
import { apiGet, toNil } from '@suey/pkg-utils';
import { Thread } from 'rd/base/browser';

import type * as Rapid from '../declare';

const selfThread = new Thread<Rapid.Thread.MainThreadEntries, Rapid.Thread.ExtensionThreadEntries>();

const state = {

}

/**
 * 开始心跳任务
 */
selfThread.handle('rxc-thread-start-extension-heartbeat', async () => {



})


/**
 * 终止心跳任务
 *
 */
selfThread.handle('rxc-thread-terminate-extension-heartbeat', async () => {

})



selfThread.handle('rxc-thread-sync-extensions-info', async () => {



})



