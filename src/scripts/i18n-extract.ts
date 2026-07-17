import type { UserConfig } from 'i18next-parser';
import { exec } from 'child_process';
import { join } from 'path';
import { ansi } from '@suey/pkg-utils';
import { tmpdir } from 'os';
import { writeFileSync, unlinkSync, readFileSync } from 'fs';

const browserDir = join(__dirname, '../rd/code/browser');

const localesDir = join(browserDir, 'i18n/locales');

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

ansi.print(ansi.blue, `[SCRIPT:i18-extract]`, ' ', ansi.normal, ansi.white, '已加载配置: ');
ansi.print(JSON.stringify(JSON.parse(data.toString()), null, 4));

exec(`pnpx i18next-parser -c ${tmpConfigPath}`, (error, stdout, stderr) => {
  console.log(stdout);

  try {
    unlinkSync(tmpConfigPath);
  } catch (e) {
    ansi.print(ansi.yellow, `[SCRIPT:i18-extract]`, ' ', ansi.normal, ansi.white, '清理临时配置文件失败: ', tmpConfigPath);
    process.exit(1);
  }

  if (error) {
    // 解析失败
    ansi.print(ansi.red, `[SCRIPT:i18-extract]`, ' ', ansi.normal, ansi.white, 'i18n全量解析失败');
    ansi.print(ansi.red, `[SCRIPT:i18-extract]`, ' ', error.message);
    process.exit(1);
  }
});
