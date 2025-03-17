import { defineConfig } from '@rspack/cli';
import type { RuleSetRule } from '@rspack/core';
import { resolve } from 'path';
import { SwcJsMinimizerRspackPlugin } from '@rspack/core';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: 'development' | 'production';
    }
  }
}

const supportImportRaw: RuleSetRule = {
  resourceQuery: /(\?raw$)|(\.(png|jpe?g|gif|ico)$)/,
  exclude: [/node_modules/],
  type: 'asset/resource'
} as const;

const supportTypescript: RuleSetRule = {
  test: /\.(c)?[tj]sx?$/,
  loader: 'builtin:swc-loader',
  options: {
    jsc: {
      loose: true,
      parser: {
        syntax: 'typescript',
        decorators: true,

      },
      transform: {
        legacyDecorator: true,
        decoratorMetadata: true
      },
    },
  },
  type: 'javascript/auto',
} as const;

export default defineConfig(() => {


  return {
    entry: './src/index.tsx',
    mode: process.env.NODE_ENV,
    output: {
      path: resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      clean: true,
      asyncChunks: true,
      chunkFilename: '[name].js',
      iife: true,
    },
    plugins: [

    ],
    module: {
      rules: [
        supportImportRaw,
        supportTypescript
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    cache: true,

    watch: true,
    watchOptions: {


    },
    devServer: {

    },
    optimization: {

      chunkIds: 'named' as const,
      moduleIds: 'named' as const,
      sideEffects: 'flag' as const,

      minimize: true,
      minimizer: [
        new SwcJsMinimizerRspackPlugin({
          minimizerOptions: {
            minify: true,
            mangle: false,
            compress: false,

            format: {
              keep_quoted_props: true,
              beautify: true,
              braces: true,
              indent_level: 2,
              semicolons: true,
              ecma: 2016
            },
            module: true,
          }
        })
      ],
      usedExports: true,
      providedExports: true,
      mangleExports: 'deterministic' as const,
      innerGraph: true,
      concatenateModules: true,
    },
    externals: ['react']
  }
});
