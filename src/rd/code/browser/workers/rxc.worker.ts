
import { apiGet, toNil } from '@suey/pkg-utils';
import { Thread } from 'rd/base/browser/service/Thread';
import { rApiGet, rApiPost } from 'rd/base/common/api';
import { Timestamp } from 'rd/base/common/constants';
import { ClockTaskService } from 'rd/base/common/service/ClockTaskService';
import type { ClockTaskServiceOptions } from 'rd/base/common/service/ClockTaskService';
import { useExtensionHeartbeatApi, type UseExtensionHeartbeatVoucher } from '../api/extension';

import type * as Rapid from '../declare';

const selfThread = new Thread<Rapid.Thread.MainThreadEntries, Rapid.Thread.ExtensionThreadEntries>();

const state = {

  vouchers: [] as UseExtensionHeartbeatVoucher[]
}

const extensionHeartbeat = async () => {
  const [err, res] = await toNil(useExtensionHeartbeatApi({ vouchers: state.vouchers }));

  if (err) {
    console.error(err.reason);
    return;
  }

  const extensionIds = res.data.data;
  if (extensionIds.length > 0) {
    selfThread.send('rxc:extension-changed', extensionIds);
  }
}

const options: ClockTaskServiceOptions = {
  clockTime: Timestamp.Second,

  clockTask: extensionHeartbeat
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



