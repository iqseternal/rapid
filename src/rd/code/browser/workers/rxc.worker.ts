
import { toNil, toWaitPromise } from '@suey/pkg-utils';
import { Thread } from 'rd/base/browser/service/Thread';
import { rApiGet, rApiPost } from 'rd/base/common/api';
import { Timestamp } from 'rd/base/common/constants';
import { ClockTaskService } from 'rd/base/common/service/ClockTaskService';
import type { ClockTaskServiceOptions } from 'rd/base/common/service/ClockTaskService';
import { useExtensionHeartbeatApi, type UseExtensionHeartbeatVoucher } from '../api/extension';

const selfThread = new Thread<Rapid.Thread.MainThreadEntries, Rapid.Thread.ExtensionThreadEntries>();

const state = {

  vouchers: [] as UseExtensionHeartbeatVoucher[],

  step: 20,
  current: 1,
}

const nextCurrent = () => {
  if (state.current >= Math.ceil(state.vouchers.length / state.step)) state.current = 1;
  else state.current += 1;
}

/**
 * 心跳任务
 */
const extensionHeartbeatTask = async () => {
  const left = (state.current - 1) * state.step;
  const right = state.current * state.step >= state.vouchers.length ? state.vouchers.length : state.current * state.step;

  const range = state.vouchers.slice(left, right);

  nextCurrent();

  if (range.length === 0) return;

  const [err, res] = await toNil(useExtensionHeartbeatApi({ vouchers: range }));

  if (err) {
    console.error(err.reason);
    return;
  }

  const extensionIds = res.data.data;
  if (extensionIds.length > 0) {
    selfThread.send('rxc:extension-changed', extensionIds);
  }

  if (right !== state.vouchers.length) {
    await toWaitPromise({ waitTime: Timestamp.Second * 2 });
    await extensionHeartbeatTask();
  }
}

const options: ClockTaskServiceOptions = {
  clockTime: Timestamp.Minute * 4,

  clockTask: extensionHeartbeatTask
}

const heartbeatTask = new ClockTaskService(options);

/**
 * 开始心跳任务
 */
selfThread.handle('rxc-thread-start-extension-heartbeat', async () => {

  heartbeatTask.start();
})

/**
 * 终止心跳任务
 *
 */
selfThread.handle('rxc-thread-terminate-extension-heartbeat', async () => {

  heartbeatTask.stopOnAfter();
})


/**
 * 同步扩展信息
 */
selfThread.handle('rxc-thread-sync-extensions-info', async (vouchers) => {
  state.vouchers = vouchers;
})



