import { program } from 'commander';

import * as path from 'path';
import * as fs from 'fs';




program.name('rapid-extension-cli').description('rapid插件脚手架, 用于创建子插件文件夹目录结构以编写新的插件').version('0.0.0');

program
  .command('create <string>')
  .description('创建一个插件子目录')
  .action(async (name: string) => {
    if (typeof name !== 'string' || name.trim() === '') throw new Error('传递了一个无效的插件名');

    const dir = path.join(__dirname, name);

    fs.mkdirSync(dir);

    const directoryStructure = await createDirectoryStructure(name);

    for (const file in directoryStructure) {
      const distPath = path.join(dir, file);

      if (!fs.existsSync(distPath)) {
        const parentDir = path.dirname(distPath);
        if (!fs.existsSync(parentDir)) fs.mkdirSync(parentDir, { recursive: true});

        fs.writeFileSync(distPath, directoryStructure[file], {
          encoding: 'utf8'
        })
      }
    }
  });

program.parse(process.argv);

interface DirectoryStructure {
  [Key: string]: string;
}

async function createDirectoryStructure(extName: string) {
  const pkgJson = `{
  "name": "@rapid/${extName}",
  "version": "0.0.0",
  "description": "A rapid extension for ${extName}",
  "scripts": {
    "typecheck": "concurrently \\"tsc --noEmit -p tsconfig.web.json\\"  \\"tsc --noEmit -p tsconfig.node.json\\""
  }
}`;

  const npmrc = `loglevel=error`;

  const tsconfigJson = `{
  "references": [
    {
      "path": "./tsconfig.node.json"
    },
    {
      "path": "./tsconfig.web.json"
    }
  ]
}`;

  const tsconfigNodeJson = `{
  "extends": "../tsconfig.base.json",
  "include": [
    "./node/**/*.ts"
  ]
}`;

  const tsconfigWebJson = `{
  "extends": "../tsconfig.base.json",
  "include": [
    "./web/**/*.ts",
    "./web/**/*.tsx"
  ]
}`;

  const dir: DirectoryStructure = {
    'package.json': pkgJson,
    '.npmrc': npmrc,
    'tsconfig.json': tsconfigJson,
    "tsconfig.node.json": tsconfigNodeJson,
    "tsconfig.web.json": tsconfigWebJson,
    'src/index.ts': ''
  };

  return dir;
}
