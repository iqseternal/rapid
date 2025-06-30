import { bus } from 'rd/base/main/bus';

bus.emitter.on('rd-config-file-hot-reload', () => {


  console.log('文件热更新了');
})
