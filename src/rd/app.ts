import 'reflect-metadata';
import 'rd/code/main/process';
import 'rd/base/main/events';

import { CodeMain } from './code/main';
import { RdCatalogs } from 'rd/catalog';
import { bus } from './base/main/bus';
import { app } from 'electron';
import { join } from 'path';
import { PrinterService } from 'rd/base/common/service/PrinterService';

import chokidar from 'chokidar';

app.setAppUserModelId('rapid');
app.setName('rapid');

const code = new CodeMain();

const stipulationSettingJSONFilePath = join(RdCatalogs.Resources, './stipulation/setting.json');

const stipulationSettingJSONWatcher = chokidar.watch(stipulationSettingJSONFilePath, {
  persistent: true,
  ignoreInitial: false,
});

stipulationSettingJSONWatcher.on('all', (eventType, fileName) => {
  bus.emitter.emit('rd-config-file-hot-reload');
});

code.main().catch(() => {
  PrinterService.printError('app server 启动失败');

  app.exit(1);
  process.exit(1);
});
