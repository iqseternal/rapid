import { defineConfig } from '@rspack/cli';
import { node, DefinePlugin, DefinePluginOptions, HotModuleReplacementPlugin, SwcJsMinimizerRspackPlugin } from '@rspack/core';
import type { RspackOptions, RspackPluginInstance, RuleSetRule } from '@rspack/core';
import { DIRS, rules, Builder } from '../../../config/node';
import { join } from 'path';

import tsConfigJson from './tsconfig.main.json';

const builder = new Builder({
  checker: false
})

const rspackConfig: RspackOptions = defineConfig({
  target: 'electron-main',
  entry: join(__dirname, './src/index.ts'),
  output: {
    path: DIRS.OUT_DESKTOP_MAIN_DIR,
    filename: 'index.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.cts', '.js', '.cjs'],
    alias: builder.defineAlias(__dirname, tsConfigJson.compilerOptions.paths),
  },
  plugins: [
    new node.NodeTargetPlugin(),
    new node.NodeTemplatePlugin(),
    new HotModuleReplacementPlugin()
  ],
  module: {
    rules: [rules.supportImportRaw, rules.supportTypescript],
  },
})

export default rspackConfig;
