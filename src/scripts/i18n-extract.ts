import type { RsbuildPlugin, OnDevCompileDoneFn } from '@rsbuild/core';
import type { UserConfig } from 'i18next-parser';
import { exec } from 'child_process';
import { join } from 'path';
import { Ansi } from '@suey/pkg-utils';
import { tmpdir } from 'os';
import { writeFileSync, unlinkSync, readFileSync } from 'fs';
import { Stats } from '@rspack/core';

const browserDir = join(__dirname, '../rd/code/browser');
const i18nDir = join(browserDir, 'i18n');
const localesDir = join(i18nDir, 'locales');

// 配置解析器参数
const parserConfig: UserConfig = {
  locales: ['en', 'zh'],
  output: join(localesDir, '/$LOCALE/$NAMESPACE.json'),
  keySeparator: '.',
  keepRemoved: false,
  input: [
    join(browserDir, '**/*.{ts,tsx,mts}')
  ],
};

const tmpConfigPath = join(tmpdir(), `i18next-parser-config-${Date.now()}.json`);

writeFileSync(tmpConfigPath, JSON.stringify(parserConfig), 'utf8');

const data = readFileSync(tmpConfigPath);

console.log('执行命令中', data.toString());

exec(`pnpx i18next-parser -c ${tmpConfigPath}`, (error, stdout, stderr) => {
  console.log(stdout);

  try {
    unlinkSync(tmpConfigPath);
  } catch (e) {
    Ansi.print(Ansi.yellow, `[SCRIPT:i18-extract]`, ' ', Ansi.normal, Ansi.white, '清理临时配置文件失败: ', tmpConfigPath);
    process.exit(1);
  }

  if (error) {
    // 解析失败
    Ansi.print(Ansi.red, `[SCRIPT:i18-extract]`, ' ', Ansi.normal, Ansi.white, 'i18n全量解析失败');
    Ansi.print(Ansi.red, `[SCRIPT:i18-extract]`, ' ', error.message);
    process.exit(1);
  }
});
