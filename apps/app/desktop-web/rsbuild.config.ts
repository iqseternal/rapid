import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { pluginSourceBuild } from '@rsbuild/plugin-source-build';
import { DIRS, EnvBuilder } from '../../../config/node';
import { DefinePlugin } from '@rspack/core';
import { join } from 'path';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';
import { Printer } from '@suey/printer';

import tsConfigJson from './tsconfig.web.json';
import tailwindcss from 'tailwindcss'

const envBuilder = new EnvBuilder({
  checker: false
});

const rsbuildConfig = defineConfig(({ env, envMode, command }) => {

  return {

    source: {
      entry: {
        index: join(__dirname, './src/index.tsx')
      },
      alias: envBuilder.defineAlias(__dirname, tsConfigJson.compilerOptions.paths)
    },
    html: {
      meta: {

      }
    },
    plugins: [
      pluginSass(),
      pluginStyledComponents(),
      pluginTypedCSSModules(),
      pluginReact(),
      pluginSourceBuild()
    ],
    server: {
      port: 3002
    },
    output: {
      polyfill: 'off',
      assetPrefix: '.',
      distPath: {
        root: join(__dirname, '../out/renderer'),
      },
      cleanDistPath: true,
      minify: {
        js: true,
        jsOptions: {
          minimizerOptions: {
            format: {
              comments: false,
              ecma: 2016
            }
          }
        },
        css: true,
      }
    }
  }
})

export default rsbuildConfig;
