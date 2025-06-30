import 'reflect-metadata';
import 'rd/code/main/process';
import 'rd/base/main/events';

import { CodeMain } from './code/main';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { RdDirs } from './base/main/constants';
import { bus } from './base/main/bus';

import chokidar from 'chokidar';

import * as path from 'path';

const code = new CodeMain();

const stipulationSettingJSONFilePath = path.join(RdDirs.Resources, './stipulation/setting.json');

const stipulationSettingJSONWatcher = chokidar.watch(stipulationSettingJSONFilePath, {
  persistent: true,
  ignoreInitial: false,
});

stipulationSettingJSONWatcher.on('all', (eventType, fileName) => {
  bus.emitter.emit('rd-config-file-hot-reload');
});

code.main().catch((err) => {
  PrinterService.printError(`Error: ${err.message}`);
});
