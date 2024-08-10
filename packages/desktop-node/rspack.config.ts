import { Configuration } from '@rspack/cli';
import { DEV_DESKTOP_NODE_DIR } from '../config/dirs';
import { resolveAlias, defineVars } from '../config/structure';
import { join } from 'path';
import { DefinePlugin } from '@rspack/core';

import tsConfigJson from './tsconfig.json';

const config: Configuration = {
  target: 'electron-main',
  
  entry: {
    index: join(DEV_DESKTOP_NODE_DIR, './src/index.ts')
  },
  resolve: {
    extensions: ['.ts', '.cts', '.js', '.cjs'],
    alias: resolveAlias(__dirname, tsConfigJson.compilerOptions.paths),
  },
  node: {
    global: true
  },
  externals: {
    fs: 'fs',
    path: 'path',
    os: 'os',
    crypto: 'crypto'
  },
  experiments: {
    rspackFuture: {

    }
  },
  plugins: [
    new DefinePlugin(defineVars({ mode: 'production' } as any) as any)
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',

        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              decorators: true
            },
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true
            }
          },
        },
        type: 'javascript/auto',
      },
      {
        resourceQuery: /\?raw$/,
        exclude: [/node_modules/],
        type: 'asset/source'
      }
    ],
  },
}

export default config;
