import { Printer } from '@suey/printer';
import { IS_DEV } from '@rapid/config/constants';

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// 处理没有捕捉的异常
process.on('uncaughtException', (reason: Error, origin: string) => {
  Printer.printError(reason, origin);
});


if (IS_DEV) {
  // 多次 Resolve 或者 Reject 同一个 promise
  // process.on('multipleResolves', (type, promise) => {

  // })


  // process.on('rejectionHandled', (promise) => {

  // })

  // Nodejs 出发警告
  // process.on('warning', (warning) => {

  // })

  // 捕捉没有 处理 Catch 的 Promise
  process.on('unhandledRejection', (reason: Error, promise) => {
    Printer.printError(reason, promise);
  });
}


