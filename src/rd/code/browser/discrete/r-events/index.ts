

import { rApiGet } from 'rd/base/common/api';

native.emitter.on('task:start-rxc-extension-heartbeat', () => {


  native.threads.rxcThread.send('rxc-thread-start-extension-heartbeat', void 0);
})

native.emitter.on('task:terminate-rxc-extension-heartbeat', () => {


  native.threads.rxcThread.send('rxc-thread-terminate-extension-heartbeat', void 0);
})

