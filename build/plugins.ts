import type { Compiler } from '@rspack/core';
import { Printer } from '@suey/printer';
import { IS_PROD } from './env';
import type { ChildProcess } from 'child_process';
import { exec } from 'child_process';
import { resolve } from 'path';
import { existsSync, statSync } from 'fs';
import { startElectron, closeElectron, restartElectron } from './bin';
import chokidar from 'chokidar';

export class PluginWidthStartElectron {
  apply(compiler: Compiler) {
    if (IS_PROD) return;

    const watcher = chokidar.watch(compiler.outputPath);

    watcher.on('change', () => restartElectron(compiler.outputPath));
    watcher.on('ready', () => startElectron(compiler.outputPath));
  }
}









