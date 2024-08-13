import { defineConfig } from '@rspack/cli';
import { OUT_DESKTOP_MAIN_DIR } from '@rapid/config/dirs';
import { node, DefinePlugin, DefinePluginOptions, HotModuleReplacementPlugin, SwcJsMinimizerRspackPlugin } from '@rspack/core';
import type { RspackOptions, RspackPluginInstance } from '@rspack/core';
import { resolveAlias, PluginWidthStartElectron, rules, defineVars, IS_DEV, IS_PROD } from '../../build';
import tsConfigJson from './tsconfig.json';

const plugins: RspackPluginInstance[] = [
  new DefinePlugin(defineVars() as unknown as DefinePluginOptions),
  new node.NodeTargetPlugin(),
  new node.NodeTemplatePlugin(),
];

if (IS_DEV) plugins.push(new PluginWidthStartElectron());

const rspackConfig: RspackOptions = defineConfig({
  target: 'electron-main',
  entry: './src/index.ts',
  output: {
    path: OUT_DESKTOP_MAIN_DIR,
    filename: 'index.js',
    clean: true,
  },
  devtool: false,
  resolve: {
    extensions: ['.ts', '.cts', '.js', '.cjs'],
    alias: resolveAlias(__dirname, tsConfigJson.compilerOptions.paths),
  },
  plugins,
  module: {
    rules: [rules.supportImportRaw, rules.supportTypescript],
  },
  optimization: {
    minimize: false,
    minimizer: [
      // new SwcJsMinimizerRspackPlugin({
      //   extractComments: {

      //   },
      //   format: {
      //     comments: false
      //   }
      // })
    ],
    splitChunks: false,
    mangleExports: false
  }
})

export default rspackConfig;
