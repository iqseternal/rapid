import { defineConfig } from '@rspack/cli';
import { node } from '@rspack/core';
import type { RspackOptions } from '@rspack/core';
import { join } from 'path';
import { rules, DIRS } from '../../../config/node';

const rspackConfig: RspackOptions = defineConfig({
  target: 'electron-preload',
  entry: join(__dirname, './index.ts'),
  output: {
    path: join(__dirname, '../out/preload'),
    filename: 'index.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.cts', '.js', '.cjs'],
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true
    },
  },
  plugins: [
    new node.NodeTargetPlugin(),
    new node.NodeTemplatePlugin(),
  ],
  module: {
    rules: [rules.supportImportRaw, rules.supportTypescript],
  }
})

export default rspackConfig;
