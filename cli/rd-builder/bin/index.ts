#!/usr/bin/env ts-node

import { readFileSync } from 'fs';
import { exec } from 'child_process';
import { program } from 'commander';
import { RdBuilderConfigName } from '../src/constants';
import { printError, print, printWarn, printInfo } from '../src/printer';

import * as path from 'path';
import * as fs from 'fs';


program
  .name('rd-builder')
  .version('0.0.1')
  .description('rapid插件脚手架, 用于构建 electron')
  ;;



program
  .command('dev <string>')
  .description('创建一个插件子目录')
  .action(async (name: string) => {

    const configPath = path.join(process.cwd(), RdBuilderConfigName);

    // 配置文件检查
    if (!fs.existsSync(configPath) || !fs.statSync(configPath).isFile()) {
      printError(`配置文件 ${RdBuilderConfigName} 不存在`);
      process.exit(1);
    }

    const target = await import(configPath);

    if (!target.default) {
      printError(`配置文件 ${RdBuilderConfigName} 未默认导出配置对象`);
      process.exit(1);
    }

    const config = target.default;

    console.log(config);
  })
  ;;

program.parse(process.argv);
