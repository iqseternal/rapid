import { defineConfig } from '@rspack/cli';
import type { RuleSetRule } from '@rspack/core';
import { resolve } from 'path';

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
        dynamicImport: false,
        decorators: true,
        importAssertions: false
      },
      transform: {
        legacyDecorator: true,
        decoratorMetadata: true,
        optimizer: {
          simplify: true,
        }
      },
      target: 'es5'
    },
  },
  type: 'javascript/auto',
} as const;

export default defineConfig({
  entry: './src/index.tsx',
  mode: process.env.NODE_ENV,
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    iife: true,
    library: {
      type: 'umd2',
    },
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
  cache: false,
  watchOptions: {


  },
  devServer: {
    devMiddleware: {
      writeToDisk: true
    }
  },
  devtool: false,
  optimization: {
    runtimeChunk: false,
    splitChunks: false,

    minimize: true,


    // chunkIds: "deterministic",
  },
  externals: {
    react: 'React',
  },
});
