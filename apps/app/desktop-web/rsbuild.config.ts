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
import tailwindcss from 'tailwindcss';

const envBuilder = new EnvBuilder({
  checker: false
});

const { IS_PROD } = envBuilder.toEnvs();

const rsbuildConfig = defineConfig(({ env, envMode, command }) => {

  return {
    source: {
      entry: {
        index: join(__dirname, './src/index.tsx')
      },
      alias: envBuilder.defineAlias(__dirname, tsConfigJson.compilerOptions.paths),
      tsconfigPath: join(__dirname, './tsconfig.web.json')
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
      pluginSourceBuild(),
      IS_PROD && pluginTailwindCSS()
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
    },
    tools: {
      postcss: {
        postcssOptions: {
          plugins: [
            // 为什么配置了 tailwind.config.ts 还需要在这里配置
            // 因为项目 cwd 为 /apps/app 并非 /apps/app/desktop-web
            // 所以为了修正路径, 需要在这里配置
            // tailwind.config.ts 文件是为了让编辑器读取配置, 从而进行类名提示
            tailwindcss({
              content: [
                './desktop-web/src/**/*.{html,js,ts,jsx,tsx}'
              ],
            }),
          ],
        },
      },
    },
  }
})

export default rsbuildConfig;
