#!/usr/bin/env ts-node
import { program } from 'commander';
import { devAction } from '../src/scripts/dev';
import { buildAction } from '../src/scripts/build';

program
  .name('rd-builder')
  .version('0.0.1')
  .description('rapid插件脚手架, 用于构建 electron')
  ;;

program
  .command('dev')
  .option('-c, --config <string>', '指定配置文件')
  .option('-p, --platform', '指定构建平台')
  .option('-w, --watch', '是否开启 watch 模式')
  .description('启用开发时脚手架')
  .action(devAction)
  ;;


program
  .command('build')
  .option('-c, --config <string>', '指定配置文件')
  .option('-p, --platform', '指定构建平台')
  .option('--preview', '是否开启预览模式')
  .description('启用构建时脚手架')
  .action(buildAction)
  ;;

program.parse(process.argv);
