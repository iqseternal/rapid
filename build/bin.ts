import { Printer } from '@suey/printer';
import type { ChildProcess } from 'child_process';
import { exec } from 'child_process';
import { join, resolve } from 'path';
import { existsSync, statSync } from 'fs';

import treeKill from 'tree-kill';
import chokidar from 'chokidar';

export const bin = resolve(__dirname, '../node_modules/.bin/electron');
if (!existsSync(bin) || !statSync(bin).isFile()) {
  Printer.printError(`未在node_modules中找到electron, 请检查依赖是否安装, pnpm install ?`);
}

let electronProcess: ChildProcess;
export const startElectron = (entryPath: string) => {
  if (electronProcess) {
    Printer.printWarn(`当前已经启动了electron`);
    return;
  }
  electronProcess = exec(`${bin} ${entryPath}`);
  electronProcess?.stdout?.on('data', console.log);
}

export const closeElectron = () => {
  if (typeof electronProcess.pid === 'undefined') {
    Printer.printError(`没有kill成功子进程, Electron关闭失败`);
    return;
  }
  treeKill(electronProcess.pid, 'SIGTERM', err => {
    if (err) Printer.printError(err);
  });
}

export const restartElectron = (entryPath: string = '') => {
  if (!electronProcess) startElectron(entryPath);

  if (typeof electronProcess.pid === 'undefined') {
    Printer.printError(`没有kill成功子进程, Electron重启失败`);
    return;
  }
  treeKill(electronProcess.pid, 'SIGTERM', err => {
    if (err) Printer.printError(err);
    electronProcess = exec(`${bin} ${entryPath}`);
    electronProcess?.stdout?.on('data', console.log);
  });
}
