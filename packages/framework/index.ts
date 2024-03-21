import 'reflect-metadata';

export * from './ipc';

export * from './logger';

export * from './exception';

export * from './filter';






// 捕捉没有 处理 Catch 的 Promise
process.on('unhandledRejection', (reason, promise) => {
  if (reason instanceof Error) {
    // PrinterService.printError(reason.stack);
    return;
  }

});

// 处理没有捕捉的异常
process.on('uncaughtException', (reason, exception) => {

  // PrinterService.printError(reason.stack);
});
