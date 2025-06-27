import { join } from 'path';
import { defineConfig, build } from 'tsup';
import type { Options } from 'tsup';

export default defineConfig({
  entry: [
    join(__dirname, '../rd/code/browser/declare.ts').replaceAll('\\', '//')
  ],
  plugins: [],
  tsconfig: join(__dirname, './tsconfig.dts-extract.json'),
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
  outDir: join(__dirname, '../../cli/rd-exc/templates/online/types'),
  format: [
    'cjs'
  ],
  treeshake: true,
  minify: false
});
