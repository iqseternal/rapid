import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { pluginSourceBuild } from '@rsbuild/plugin-source-build';
import { DIRS, Builder } from '../../../config/node';
import { DefinePlugin } from '@rspack/core';
import { join } from 'path';

import tsConfigJson from './tsconfig.web.json';

const builder = new Builder({
  checker: false
});

const rsbuildConfig = defineConfig(({ env, envMode, command }) => {

  return {
    source: {
      entry: {
        index: join(DIRS.DEV_DESKTOP_WEB_DIR, './src/index.tsx')
      },
      alias: builder.defineAlias(__dirname, tsConfigJson.compilerOptions.paths)
    },
    plugins: [
      pluginSass(),
      pluginStyledComponents(),
      pluginTypedCSSModules(),
      pluginReact(),
      pluginSourceBuild(),
    ],
    server: {
      port: 3002
    },
    output: {
      polyfill: 'off',
      assetPrefix: '.',
      distPath: {
        root: DIRS.OUT_DESKTOP_RENDERER_DIR,
      },
      cleanDistPath: true,
      minify: {
        js: true,
        jsOptions: {
          minimizerOptions: {
            format: {
              comments: false,
              ecma: 2015
            }
          }
        },
        css: true,
      }
    }
  }
})

export default rsbuildConfig;
