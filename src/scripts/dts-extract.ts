import { join } from 'path';
import { defineConfig, build } from 'tsup';

import * as fs from 'fs';

export default defineConfig({
  entry: [
    join(__dirname, '../rd/code/browser/types/index.ts').replaceAll('\\', '//')
  ],
  plugins: [],
  tsconfig: join(__dirname, './tsconfig.dts-extract.json'),
  dts: {
    only: true,
    compilerOptions: {
      composite: false,
      incremental: false,
      removeComments: false,
      target: 'ES2015',
      stripInternal: true,
    }
  },
  target: 'es2015',
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: join(__dirname, '../../cli/rd-exc/templates/online/types'),
  format: [
    'cjs'
  ],
  treeshake: true,
  minify: false,
  noExternal: [/.+/],
  silent: false,
});
