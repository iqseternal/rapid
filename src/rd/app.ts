import 'reflect-metadata';
import 'rd/code/electron-main/process';

import { CodeMain } from 'rd/code/electron-main/main';
import { Printer } from '@suey/printer';

const code = new CodeMain();

code.main().catch((err) => {
  Printer.printError(`Error: ${err.message}`);
});
