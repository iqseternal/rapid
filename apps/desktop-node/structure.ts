import { defineElectronMainConfig, resolveAlias, defineElectronPreloadConfig } from '../../packages/config/structure';
import { join } from 'path';

import tsConfigJson from './tsconfig.json';

export const mainConfigFn = defineElectronMainConfig(({ mode }) => ({
  resolve: {
    alias: resolveAlias(__dirname, tsConfigJson.compilerOptions.paths)
  },


  build: {
    lib: {
      entry: join(__dirname, './src/index.ts')
    }
  }

}));

export const preloadConfigFn = defineElectronPreloadConfig(({ mode }) => ({
  resolve: {
    alias: resolveAlias(__dirname, {})
  },
  build: {
    lib: {
      entry: join(__dirname, './preload/index.ts')
    }
  }
}))
