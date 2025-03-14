import 'reflect-metadata';
import 'rd/code/electron-main/process';

import { CodeMain } from 'rd/code/electron-main/main';
import { PrinterService } from 'rd/base/common/service/PrinterService';

const code = new CodeMain();

code.main().catch((err) => {
  PrinterService.printError(`Error: ${err.message}`);
});
