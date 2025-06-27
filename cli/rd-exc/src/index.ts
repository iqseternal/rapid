import { program } from 'commander';

import * as path from 'path';
import * as fs from 'fs';

program
  .name('rxc')
  .version('0.0.1')
  .description('rapid插件脚手架, 用于创建子插件文件夹目录结构以编写新的插件')
;;

program
  .command('create <string>')
  .description('创建一个插件子目录')
  .action(async (name: string) => {
    if (typeof name !== 'string' || name.trim() === '') throw new Error('传递了一个无效的插件名');
    const dir = path.join(__dirname, name);

    fs.mkdirSync(dir);
  })
;;

program
  .command('build <string>')
  .description('创建一个插件子目录')
  .action(async (name: string) => {
    if (typeof name !== 'string' || name.trim() === '') throw new Error('传递了一个无效的插件名');



    const dir = path.join(__dirname, name);

    fs.mkdirSync(dir);
  })
;;


program.parse(process.argv);
