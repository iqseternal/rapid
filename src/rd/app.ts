import 'reflect-metadata';
import 'rd/code/main/process';
import 'rd/base/main/events';

import { CodeMain } from './code/main';
import { PrinterService } from 'rd/base/common/service/PrinterService';
import { RdCatalogs } from 'rd/catalog';
import { bus } from './base/main/bus';
import { app } from 'electron';

import chokidar from 'chokidar';

import * as path from 'path';

const code = new CodeMain();

const stipulationSettingJSONFilePath = path.join(RdCatalogs.Resources, './stipulation/setting.json');

const stipulationSettingJSONWatcher = chokidar.watch(stipulationSettingJSONFilePath, {
  persistent: true,
  ignoreInitial: false,
});

stipulationSettingJSONWatcher.on('all', (eventType, fileName) => {
  bus.emitter.emit('rd-config-file-hot-reload');
});

code.main().catch((err) => {
  app.exit(1);
});
