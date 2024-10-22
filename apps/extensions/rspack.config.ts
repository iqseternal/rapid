import { defineConfig } from '@rspack/cli';
import { node, DefinePlugin, DefinePluginOptions } from '@rspack/core';
import type { RspackOptions, RspackPluginInstance, RuleSetRule } from '@rspack/core';
import { DIRS } from '../../config/node/dirs';
import { supportImportRaw, supportTypescript } from '../../config/node/rules';
import { join } from 'path';

const rspackConfig: RspackOptions = defineConfig({
  target: 'web',
  entry: join(__dirname, './src/index.tsx'),
  output: {
    path: DIRS.DIST_EXTENSIONS_DIR,
    filename: 'index.js',
    clean: true
  },
  externals: {
    'react': 'React'
  },
  resolve: {
    extensions: ['.ts', 'tsx', '.cts', '.js', '.cjs', '.jsx']
  },
  plugins: [
    new node.NodeTargetPlugin(),
    new node.NodeTemplatePlugin()
  ],
  module: {
    rules: [supportImportRaw, supportTypescript],
  },
  optimization: {
    minimize: false,
    minimizer: [false],
    splitChunks: false
  }
})

export default rspackConfig;
