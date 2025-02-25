
import { defineConfig } from '@rsbuild/core';

import { EnvBuilder } from '../../config/node';
import { DIRS } from '../../config/node';
import { join } from 'path';

const envBuilder = new EnvBuilder({
  checker: true
});

export default defineConfig({
  source: {
    entry: {
      index: join(__dirname, './src/index.tsx')
    },
    define: envBuilder.defineVars()
  },
  output: {
    distPath: {
      root: join(DIRS.DIST_DIR, './website'),
    },
    cleanDistPath: true,
  }
})