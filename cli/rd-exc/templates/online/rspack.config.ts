import { defineConfig } from '@rspack/cli';
import { RuleSetRule, SwcJsMinimizerRspackPlugin } from '@rspack/core';
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
    library: {
      type: 'umd',
      name: '__define_extension__',
      export: 'default'
    },
    globalObject: 'window'
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

    sideEffects: 'flag',
    mangleExports: false,
    usedExports: true,
    removeEmptyChunks: true,

    minimize: false,
    minimizer: [
      new SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          compress: false,
          mangle: false,
          format: {
            beautify: true,
            comments: false,
            ecma: 5,
            indentLevel: 2
          }
        }
      })
    ]
  },
  externals: {
    react: 'React',
    'react-router': 'ReactRouter',
    'react-router-dom': 'ReactRouterDOM'
  },
})
