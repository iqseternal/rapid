import { app, ipcMain, BrowserWindow } from 'electron';
import { RdDirs } from 'rd/base/main/constants';

import chokidar from 'chokidar';

import * as fs from 'fs';
import * as path from 'path';

const stipulationSettingPath = path.join(RdDirs.Resources, './stipulation/setting.json');

function readConfigSync() {
  try {
    const rawData = fs.readFileSync(stipulationSettingPath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error('配置文件读取失败:', error);
    return null; // 返回空或默认配置
  }
}

export async function registerHost() {

  const watcher = chokidar.watch(stipulationSettingPath, {
    persistent: true,
    ignoreInitial: false,
  });

  watcher.on('all', (eventType, fileName) => {
    if (eventType === 'change') {
      const config = readConfigSync();
      console.log(config);
      return;
    }

    const config = readConfigSync();
    console.log(config);
  })

}
