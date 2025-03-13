import { defineConfig } from '@rsbuild/core';
import { EnvBuilder } from '../../config/builder';
import { join } from 'path';

const CURRENT_ENV = 1;
const IS_DEV = CURRENT_ENV === 1;

export default defineConfig({
  source: {
    entry: {
      index: join(__dirname, './web/src/index.tsx')
    },
    define: {
      CURRENT_ENV,
      IS_DEV
    },

  },
  html: {
    template: './web/index.html'
  },
  plugins: [

  ],
  mode: 'production',

  output: {

    distPath: {
      root: join(__dirname, './dist/web'),
    },
    cleanDistPath: true,
    filename: {
      js: '[name].js'
    },
    minify: {

      js: true,
      jsOptions: {
        extractComments: true,

        minimizerOptions: {

          compress: true,
          minify: false,
          mangle: false,
          format: {


            beautify: true,

          }

        }

      }
    },
    polyfill: 'off',


  },

  dev: {
    writeToDisk: true
  },

  tools: {



    rspack: {
      mode: 'production',

      experiments: {


      },

      optimization: {
        usedExports: true,
        sideEffects: true,
        minimize: true,
        providedExports: true,
        innerGraph: true,
        moduleIds: 'deterministic',
        concatenateModules: true,


      },

      performance: {


      }
    }
  }
})
