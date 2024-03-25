import { filterCatch } from './filter/runtime';
import { IS_DEV } from '@rapid/config/constants';

// 处理没有捕捉的异常
process.on('uncaughtException', (reason: Error, origin: string) => {
  filterCatch(reason).catch(err => {



    console.log(reason.stack, '?');
  })
});


if (IS_DEV) {
  // 多次 Resolve 或者 Reject 同一个 promise
  process.on('multipleResolves', (type, promise) => {

  })

  // Nodejs 出发警告
  process.on('warning', (warning) => {

  })

  // 捕捉没有 处理 Catch 的 Promise
  process.on('unhandledRejection', (reason: Error, promise) => {
    filterCatch(reason).catch(err => {



      console.log(reason.stack, '?');
    })

    // PrinterService.printWarn(`出现了未处理Promise REJECTED:: ${reason}`);
  });
}


