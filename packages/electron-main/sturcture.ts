import { defineElectronMainConfig, resolveAlias } from '../config/structure';
import { DIRS } from '../config/dirs';
import { join } from 'path';

import tsConfigJson from './tsconfig.json';

export default defineElectronMainConfig(({ mode }) => ({
  resolve: {
    alias: resolveAlias(__dirname, tsConfigJson.compilerOptions.paths)
  },


  build: {
    lib: {
      entry: join(__dirname, './src/index.ts')
    }
  }

}));
