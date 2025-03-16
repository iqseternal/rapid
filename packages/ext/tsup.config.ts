import { defineConfig } from 'tsup';
import { join } from 'path';
import { DIRS } from '../../src/rd-builder';

import alias from '@rollup/plugin-alias';

const builder = join(DIRS.ROOT_DIR, './builder');

const rapid_libs = join(DIRS.ROOT_DIR, './packages/libs');
const rapid_extensions = join(DIRS.ROOT_DIR, './packages/extensions');
const rapid_libs_web = join(DIRS.ROOT_DIR, './packages/libs-web');

const rd = join(DIRS.ROOT_DIR, './src/rd');
const rd_browser = join(DIRS.ROOT_DIR, './src/rd/code/browser');

export default defineConfig({
  entry: ['./src/index.ts'],
  plugins: [

  ],
  tsconfig: join(__dirname, './tsconfig.json'),
  dts: true,

  // dts: {
  //   only: true,

  //   compilerOptions: {
  //     declaration: true,
  //     skipLibCheck: true,
  //     baseUrl: '.',
  //     rootDir: DIRS.ROOT_DIR,
  //     composite: true,
  //     target: "ESNext",
  //     skipDefaultLibCheck: true,
  //     jsx: "react-jsx",
  //     lib: [
  //       "DOM",
  //       "ESNext"
  //     ],
  //     module: "ESNext",
  //     moduleResolution: "node",
  //     resolveJsonModule: true,
  //     esModuleInterop: false,
  //     isolatedModules: true,
  //     preserveSymlinks: false,
  //     strict: false,
  //     strictNullChecks: true,
  //     strictPropertyInitialization: true,
  //     strictBindCallApply: true,
  //     experimentalDecorators: true,
  //     emitDecoratorMetadata: true,
  //     noEmitOnError: false,
  //     noUnusedParameters: false,
  //     noImplicitAny: false,
  //     noImplicitOverride: true,
  //     noImplicitReturns: true,
  //     allowSyntheticDefaultImports: true,
  //     allowUmdGlobalAccess: true,
  //     allowArbitraryExtensions: true,
  //     allowUnusedLabels: true,
  //     types: [
  //       "reflect-metadata",
  //       join(builder, './@types-web'),
  //       join(rd_browser, './types')
  //     ],
  //     paths: {
  //       [`@rapid/extensions`]: [`${rapid_extensions}`],
  //       [`@rapid/libs-web`]: [`${rapid_libs_web}`],
  //       [`@rapid/libs`]: [`${rapid_libs}`],
  //       [`@/*`]: [`${rd_browser}/*`],
  //       [`rd/*`]: [`${rd}/*`],
  //     },
  //   },
  // },
  outDir: 'dist', // 输出目录
  format: ['esm'], // 不输出 JS 文件
});
