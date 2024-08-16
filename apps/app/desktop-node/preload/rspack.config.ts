// @ts-nocheck
import { defineConfig } from '@rspack/cli';
import { OUT_DESKTOP_MAIN_DIR, OUT_DESKTOP_PRELOAD_DIR } from '@rapid/config/dirs';
import { node, DefinePlugin, DefinePluginOptions, HotModuleReplacementPlugin, SwcJsMinimizerRspackPlugin } from '@rspack/core';
import type { RspackOptions, RspackPluginInstance } from '@rspack/core';
import { resolveAlias, rules, defineVars, IS_DEV, IS_PROD } from '../../../../build';
import { join } from 'path';

const rspackConfig: RspackOptions = defineConfig({
  target: 'electron-main',
  entry: join(__dirname, './index.ts'),
  output: {
    path: OUT_DESKTOP_PRELOAD_DIR,
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
