import { defineConfig } from 'tsup';
import { join } from 'path';

export default defineConfig({
  entry: [
    '../../src/rd/code/browser/declare.ts',

    '../../src/rd/code/browser/types'
  ],
  plugins: [

  ],
  tsconfig: join(__dirname, './tsconfig.main.json'),
  dts: {
    only: true,
    compilerOptions: {
      composite: false,
      incremental: false,

    }
  },
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: 'pst', // 输出目录
  format: [
    'cjs',
  ],

  treeshake: true,
  minify: false
});
