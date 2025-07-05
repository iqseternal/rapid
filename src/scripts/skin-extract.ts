import { register } from 'ts-node';

import tsConfigJson from '../rd/tsconfig.browser.json';

import * as fs from 'fs';
import * as path from 'path';
import * as tsConfigPaths from 'tsconfig-paths';

const compilerOptions = {
  ...tsConfigJson.compilerOptions,
  module: 'commonjs',
  noImplicitAny: false,
  types: [
    ...tsConfigJson.compilerOptions.types,
    'node'
  ],
  lib: [
    ...tsConfigJson.compilerOptions.lib,
    'dom'
  ],
  skipLibCheck: true,
  skipDefaultLibCheck: true
}

register({
  compilerOptions: compilerOptions,
  transpileOnly: true,
  typeCheck: false
})

tsConfigPaths.register({
  baseUrl: compilerOptions.baseUrl,
  paths: compilerOptions.paths
});

const browserDir = path.join(__dirname, '../rd/code/browser');
const skinDir = path.join(browserDir, './skin/index.ts');

if (!fs.existsSync(skinDir)) {
  console.log('不存在目标目录');
  process.exit(1);
}

function camelToDots(str: string) {
  return str
    .replace(/([A-Z])/g, '.$1')  // 在大写字母前添加点
    .toLowerCase()              // 全部转小写
    .replace(/^\./, '');        // 去掉开头的多余点
}

; (async () => {
  const payloadSheet = await import(skinDir);

  const { cssVariablesPayloadSheet } = payloadSheet ?? {};

  const settingJson = fs.readFileSync(path.join(__dirname, '../../.rd-packer/resources/stipulation/setting.json'), 'utf8');

  const setting = JSON.parse(settingJson);

  if (!setting.skin) setting.skin = {};
  if (!setting.skin.vars) setting.skin.vars = {};

  if (cssVariablesPayloadSheet) {
    console.log('检测到 CSS 变量样式定义表');

    for (const key in cssVariablesPayloadSheet) {
      const name = camelToDots(key);

      console.log(`转换 CSS 变量定义 ${name}`);
      setting.skin.vars[name] = cssVariablesPayloadSheet[key].value;
    }
  }

  fs.writeFileSync(path.join(__dirname, '../../.rd-packer/resources/stipulation/setting.json'), JSON.stringify(setting, null, 2));
})();


