import { program } from 'commander';

import * as path from 'path';
import * as fs from 'fs';

program.name('rapid-extension-cli').description('rapid插件脚手架, 用于创建子插件文件夹目录结构以编写新的插件').version('0.0.0');

program
  .command('create <string>')
  .description('创建一个插件子目录')
  .action(async (name: string) => {
    const dir = path.join(__dirname, name);

    fs.mkdirSync(dir);

    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({
      name: `@rapid/extension-${name}`,
      version: '0.0.0',
      description: `A rapid extension for ${name}`,
      scripts: {
        typecheck: `concurrently \"tsc --noEmit -p tsconfig.web.json\"  \"tsc --noEmit -p tsconfig.node.json\"`
      }
    }, null, 2));

    fs.writeFileSync(path.join(dir, '.npmrc'), `loglevel=error`);

    fs.writeFileSync(path.join(dir, 'tsconfig.json'), JSON.stringify({
      references: [
        { path: "./tsconfig.node.json" },
        { path: "./tsconfig.web.json" },
      ]
    }, null, 2));

    fs.writeFileSync(path.join(dir, 'tsconfig.node.json'), JSON.stringify({
      extends: '../tsconfig.base.json',
      include: ['./node/**/*.ts']
    }, null, 2));

    fs.writeFileSync(path.join(dir, 'tsconfig.web.json'), JSON.stringify({
      extends: '../tsconfig.base.json',
      include: ['./web/**/*.ts','./web/**/*.tsx']
    }, null, 2));

    fs.mkdirSync(path.join(dir, 'node'));
    fs.mkdirSync(path.join(dir, 'web'));

    fs.writeFileSync(path.join(dir, 'web/index.ts'), ``);
  });

program.parse(process.argv);
