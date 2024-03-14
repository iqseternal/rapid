
import { defineElectronPreloadConfig, resolveAlias } from '../config/structure';
import { DIRS } from '@rapid/config/dirs';
import { join } from 'path';
import tsConfigJson from './tsconfig.json';

export default defineElectronPreloadConfig(({ mode }) => ({
  resolve: {
    alias: resolveAlias(__dirname, {})
  },
  build: {
    lib: {
      entry: join(__dirname, './src/index.ts')
    }
  }
}))
