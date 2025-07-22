
import { defineConfig } from '@rspack/cli';
import { DefinePlugin } from '@rspack/core';
import { join } from 'path';

export default defineConfig({


  entry: join(__dirname, './src/index.ts'),

  plugins: [
    new DefinePlugin({
      OS_PLATFORM: `'darwin'`,
    }),
  ],

  experiments: {




  },
  optimization: {


    minimize: true,


    usedExports: true
  }
})
