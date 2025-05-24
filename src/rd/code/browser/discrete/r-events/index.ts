

import { rApiGet } from 'rd/base/common/api';

rApp.emitter.on('task:start-rxc-extension-heartbeat', () => {


  rApp.threads.rxcThread.send('rxc-thread-start-extension-heartbeat', void 0);
})

rApp.emitter.on('task:terminate-rxc-extension-heartbeat', () => {


  rApp.threads.rxcThread.send('rxc-thread-terminate-extension-heartbeat', void 0);
})

