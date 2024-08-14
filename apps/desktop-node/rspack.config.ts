// @ts-nocheck
import { defineConfig } from '@rspack/cli';
import { OUT_DESKTOP_MAIN_DIR } from '@rapid/config/dirs';
import { node, DefinePlugin, DefinePluginOptions, HotModuleReplacementPlugin, SwcJsMinimizerRspackPlugin } from '@rspack/core';
import type { RspackOptions, RspackPluginInstance } from '@rspack/core';
import { resolveAlias, PluginWidthStartElectron, rules, defineVars, IS_DEV, IS_PROD } from '../../build';
import { join } from 'path';
import tsConfigJson from './tsconfig.json';

const rspackConfig: RspackOptions = defineConfig({
  target: 'electron-main',
  entry: join(__dirname, './src/index.ts'),
  output: {
    path: OUT_DESKTOP_MAIN_DIR,
    filename: 'index.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.cts', '.js', '.cjs'],
    alias: resolveAlias(__dirname, tsConfigJson.compilerOptions.paths),
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true
    },
  },
  plugins: [
    new DefinePlugin(defineVars() as unknown as DefinePluginOptions),
    new node.NodeTargetPlugin(),
    new node.NodeTemplatePlugin(),
  ],
  module: {
    rules: [rules.supportImportRaw, rules.supportTypescript],
  }
})

export default rspackConfig;
