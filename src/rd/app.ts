import 'reflect-metadata';
import 'rd/code/main/process';
import 'rd/base/main/events';

import { CodeMain } from './code/main';
import { RdCatalogs } from 'rd/catalog';
import { bus } from './base/main/bus';
import { Notification, app } from 'electron';
import { join } from 'path';

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

code.main().catch((err) => {
  app.exit(1);
});


