import 'reflect-metadata';
import 'rd/code/main/process';

import { CodeMain } from './code/main';
import { PrinterService } from 'rd/base/common/service/PrinterService';

const code = new CodeMain();

code.main().catch((err) => {
  PrinterService.printError(`Error: ${err.message}`);
});
