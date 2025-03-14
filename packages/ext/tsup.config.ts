import { defineConfig } from 'tsup';
import { DIRS } from '../../builder';
import { join } from 'path';

const rapid_libs = join(DIRS.ROOT_DIR, './packages/libs');
const rapid_extensions = join(DIRS.ROOT_DIR, './packages/extensions');
const rapid_libs_web = join(DIRS.ROOT_DIR, './packages/libs-web');

const rd_browser = join(DIRS.ROOT_DIR, './src/rd/code/browser');

export default defineConfig({
  entry: ['./src/index.ts'],
  dts: {
    only: true,
    compilerOptions: {

      declaration: true,
      skipLibCheck: true,
      baseUrl: '.',

      paths: {

        [`@rapid/extensions/*`]: [`${rapid_extensions}/*`],
        [`@rapid/libs-web/*`]: [`${rapid_libs_web}/*`],
        [`@rapid/libs/*`]: [`${rapid_libs}/*`],
        [`@/*`]: [`${rd_browser}/*`],
      }
    }
  },
  outDir: 'dist', // 输出目录
  format: ['esm'], // 不输出 JS 文件
});
