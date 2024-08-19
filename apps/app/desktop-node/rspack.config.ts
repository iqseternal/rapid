import { defineConfig } from '@rspack/cli';
import { node, DefinePlugin, DefinePluginOptions, HotModuleReplacementPlugin, SwcJsMinimizerRspackPlugin } from '@rspack/core';
import type { RspackOptions, RspackPluginInstance } from '@rspack/core';
import { resolveAlias, DIRS, rules } from '../../../config';
import { join } from 'path';
import type { RuleSetRule } from '@rspack/core';

import tsConfigJson from './tsconfig.main.json';

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
    alias: resolveAlias(__dirname, tsConfigJson.compilerOptions.paths),
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
