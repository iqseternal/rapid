import { Configuration, defineConfig } from '@rspack/cli';
import { DEV_DESKTOP_NODE_DIR, DIST_DESKTOP_DIR, OUT_DESKTOP_MAIN_DIR, ROOT_DIR } from '../config/dirs';
import { resolveAlias, defineVars } from '../config/structure';
import { join } from 'path';
import { CONFIG_ENV_MODE, CONFIG_ENV_COMMAND } from '../../target.config';
import { DefinePlugin, node, HotModuleReplacementPlugin, SharePluginOptions, Compiler, DefinePluginOptions } from '@rspack/core';
import { exec } from 'child_process';
import tsConfigJson from './tsconfig.json';

const mode = process.env.NODE_ENV ?? CONFIG_ENV_MODE.DEVELOPMENT;
const command = process.env.npm_lifecycle_event ?? CONFIG_ENV_COMMAND.DEV;

const rspackConfig = defineConfig({
  target: 'node',
  entry: {
    index: {
      import: join(DEV_DESKTOP_NODE_DIR, './src/index.ts')
    }
  },
  output: {
    path: OUT_DESKTOP_MAIN_DIR,
    filename: 'index.js',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.cts', '.js', '.cjs'],
    alias: resolveAlias(__dirname, tsConfigJson.compilerOptions.paths),
  },
  node: {
    global: true

  },
  externals: {

  },
  externalsPresets: {
    electron: true,
    electronMain: true,
    electronPreload: true,
    node: true
  },
  experiments: {
    rspackFuture: {

    }
  },
  watchOptions: {

  },

  plugins: [
    new DefinePlugin(defineVars({ mode, command }) as unknown as DefinePluginOptions),

    new node.NodeTargetPlugin(),

    new HotModuleReplacementPlugin(),

    // {
    //   apply: (compiler: Compiler) => {
    //     compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {

    //       const st = exec(`electron ${join(OUT_DESKTOP_MAIN_DIR, './index.js')}`, (err) => {
    //         if (err) {
    //           console.log(err.toString());
    //           st.disconnect();
    //         }
    //       })
    //       st.stdout?.on('data', data => {
    //         console.log(data.toString());
    //       })


    //     })
    //   }
    // }
  ],


  devServer: {
    hot: false
  },

  module: {
    parser: {

    },
    rules: [
      {
        resourceQuery: /(raw$)|(\.(png|jpe?g|gif|ico)$)/,
        exclude: [/node_modules/],
        type: 'asset/resource'
      },
      {
        test: /\.(c)?[tj]s$/,
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
      },

    ],
  },
})


export default rspackConfig;
