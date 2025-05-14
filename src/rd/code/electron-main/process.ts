import { LoggerService } from '../../base/main/service/LoggerService';
import { Catch, Exception, ExceptionErrorMsgData, isException } from '../../base/main/exceptions';
import { PrinterService } from 'rd/base/common/service/PrinterService';

// 关闭渲染进程安全警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

// 处理没有捕捉的异常
if (IS_DEV) {
  process.on('uncaughtException', (reason: Error, origin: string) => {
    try {
      Catch.parser(reason as unknown as Exception<ExceptionErrorMsgData>);
    } catch (err) {
      console.error(reason, origin);
      console.dir(err);


      if (err && err === reason) {
        LoggerService.error(`未捕获的异常`, err, origin);

        return;
      }

      PrinterService.printError(err);
    }
  });
}

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
  try {
    Catch.parser(reason as unknown as Exception<ExceptionErrorMsgData>);
  } catch (err) {

    if (IS_DEV) {
      if (!isException(reason)) {
        PrinterService.printError('当前异常未定义(非Exception)');
      }
    }

    if (err && err === reason) {
      LoggerService.error(`未捕获的Promise`, JSON.stringify(reason), promise);
      return;
    }

    PrinterService.printError(err);
  }
});



