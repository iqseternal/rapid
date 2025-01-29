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

const { IS_PROD, IS_DEV } = envBuilder.toEnvs();

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
      port: 3002,
      proxy: {
        '/rapi': {
          pathRewrite: (pathname, req) => {
            if (pathname.startsWith('/rapi')) return pathname.replace('/rapi', '/api');
            return pathname;
          },
          changeOrigin: true,

          target: 'http://localhost:3000',
        }
      }
    },
    output: {
      assetPrefix: '.',
      charset: 'utf8',
      cleanDistPath: true,
      copy: [

      ],
      cssModules: {
        auto: true,
        exportLocalsConvention: 'asIs',
        exportGlobals: false,
        mode: 'local',
        namedExport: false,
      },
      defaultDatUriLimit: {
        svg: 4096,
        font: 4096,
        image: 4096,
        media: 4096,
        assets: 4096,
      },
      distPath: {
        root: join(__dirname, '../out/renderer'),
      },

      emitAssets: true,
      emitCss: true,
      externals: {

      },
      filenameHash: true,
      injectStyles: IS_DEV,
      legalComments: 'linked',
      manifest: true,

      minify: {
        js: IS_PROD,
        jsOptions: {
          extractComments: false,
          minimizerOptions: {
            minify: IS_PROD,
            compress: {
              drop_console: IS_PROD,
              drop_debugger: IS_PROD
            },
            mangle: {
              keep_classnames: IS_DEV,
              keep_fnames: IS_DEV,
              keep_private_props: IS_DEV,
              reserved: []
            },
            format: {
              comments: IS_DEV ? 'all' : false,
              ecma: 2016
            }
          }
        },
        css: IS_PROD,
        cssOptions: {
          minimizerOptions: {

          }
        }
      },
      polyfill: 'off',
      sourceMap: {
        js: IS_DEV ? void 0 : false,
        css: IS_DEV,
      }
    },
    performance: {
      removeMomentLocale: true,
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
