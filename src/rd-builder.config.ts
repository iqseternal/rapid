import { defineConfig } from '@rapid/rd-builder';
import { join } from 'path';
import type { CreateRsbuildOptions } from '@rsbuild/core';
import { DefinePlugin, HotModuleReplacementPlugin, ProgressPlugin, RspackOptions, node, rspack, SwcJsMinimizerRspackPlugin } from '@rspack/core';
import { defineConfig as defineRspackConfig } from '@rspack/cli';
import { defineConfig as defineRsbuildConfig } from '@rsbuild/core';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { pluginSourceBuild } from '@rsbuild/plugin-source-build';
import { EnvBuilder } from '@rapid/rd-builder';

import tailwindcss from 'tailwindcss';
import tsconfigMainJson from './rd/tsconfig.main.json';
import tsconfigSandboxJson from './rd/tsconfig.sandbox.json';
import tsconfigBrowserJson from './rd/tsconfig.browser.json';

const ROOT_DIR = join(__dirname, '../');

const rendererRootDir = join(__dirname, './rd/code/browser');
const rendererEntry = join(rendererRootDir, './index.tsx');

const mainEntry = join(__dirname, './rd/app.ts');
const preloadEntry = join(__dirname, './rd/code/sandbox/index.ts');

const mainOutput = join(ROOT_DIR, './.rd-packer/out/main');
const preloadOutput = join(ROOT_DIR, './.rd-packer/out/preload');
const rendererOutput = join(ROOT_DIR, './.rd-packer/out/renderer');

const envBuilder = new EnvBuilder();

const { IS_DEV, IS_BUILD, IS_PREVIEW, IS_PROD } = envBuilder.toEnvs();

const defineVars = {
  IS_DEV: IS_DEV,
  IS_PROD: IS_PROD,
} as const;

async function transformMainRspackConfig(): Promise<RspackOptions> {
  const vars = envBuilder.defineVars();

  const mainRspackConfig = defineRspackConfig({
    target: 'electron-main',
    entry: mainEntry,
    mode: IS_DEV ? 'development' : 'production',
    output: {
      path: mainOutput,
      filename: 'index.js',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.cts', '.js', '.cjs'],
      alias: envBuilder.defineAlias(join(__dirname, 'rd'), tsconfigMainJson.compilerOptions.paths),
    },
    plugins: [
      new node.NodeTargetPlugin(),
      new node.NodeTemplatePlugin(),
      new HotModuleReplacementPlugin(),
      new DefinePlugin({
        ...vars,
        ...defineVars
      }),

      IS_BUILD && (new ProgressPlugin({
        prefix: 'rapid',
        profile: true
      })),

      IS_PREVIEW && (new RsdoctorRspackPlugin({

      }))
    ],
    module: {
      rules: [
        {
          resourceQuery: /(\?raw$)|(\.(png|jpe?g|gif|ico)$)/,
          exclude: [/node_modules/],
          type: 'asset/resource'
        },
        {
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
        }
      ],
    },
    devServer: {
      devMiddleware: {
        // 将结果写入到磁盘
        writeToDisk: true,

      },
    },
    optimization: {
      minimize: IS_PROD,
      minimizer: [
        new SwcJsMinimizerRspackPlugin({
          minimizerOptions: {
            minify: IS_PROD,
          }
        })
      ],
      usedExports: true,
      sideEffects: true,
      providedExports: true,
      innerGraph: true,
      moduleIds: 'deterministic',
      concatenateModules: true,
    },
  });

  return mainRspackConfig;
}

async function transformPreloadRspackConfig(): Promise<RspackOptions> {
  const vars = envBuilder.defineVars();

  const preloadRspackConfig = defineRspackConfig({
    target: 'electron-preload',
    entry: preloadEntry,
    mode: IS_DEV ? 'development' : 'production',
    output: {
      path: preloadOutput,
      filename: 'index.js',
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.cts', '.js', '.cjs'],
      alias: envBuilder.defineAlias(join(__dirname, 'rd'), tsconfigSandboxJson.compilerOptions.paths),
    },

    plugins: [
      new node.NodeTargetPlugin(),
      new node.NodeTemplatePlugin(),
      new DefinePlugin({
        ...vars,
        ...defineVars
      }),

      IS_BUILD && (new ProgressPlugin({
        prefix: 'rapid',
        profile: true
      })),

      IS_PREVIEW && (new RsdoctorRspackPlugin({

      }))
    ],
    module: {
      rules: [
        {
          resourceQuery: /(\?raw$)|(\.(png|jpe?g|gif|ico)$)/,
          exclude: [/node_modules/],
          type: 'asset/resource'
        },
        {
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
        }
      ],
    },
    devtool: IS_DEV ? 'source-map' : false,
    devServer: {
      devMiddleware: {
        writeToDisk: true
      },
    },
    optimization: {
      minimize: IS_PROD,
      minimizer: [
        new SwcJsMinimizerRspackPlugin({
          minimizerOptions: {
            minify: IS_PROD,

          }
        })
      ],
      usedExports: true,
      sideEffects: true,
      providedExports: true,
      innerGraph: true,
      moduleIds: 'deterministic',
      concatenateModules: true,
    }
  });

  return preloadRspackConfig;
}

async function transformRendererRsbuildConfig(): Promise<CreateRsbuildOptions> {
  const vars = envBuilder.defineVars();

  const rsbuildConfig = defineRsbuildConfig({
    source: {
      entry: {
        index: rendererEntry
      },
      alias: envBuilder.defineAlias(join(__dirname, 'rd'), tsconfigBrowserJson.compilerOptions.paths),
      tsconfigPath: join(__dirname, './rd/tsconfig.browser.json'),
      define: {
        // 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        ...vars,
        ...defineVars
      },
    },
    mode: IS_DEV ? 'development' : 'production',
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
    ],
    server: {
      port: 3002,
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
      distPath: {
        root: rendererOutput,
      },
      emitAssets: true,
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
        js: IS_DEV ? 'source-map' : false,
        css: IS_DEV,
      }
    },
    performance: {
      removeMomentLocale: true,
      bundleAnalyze: IS_BUILD ? {} : void 0,
    },
    tools: {
      postcss: {
        postcssOptions: {
          plugins: [
            tailwindcss({
              content: [
                join(rendererRootDir, `/**/*.{html,js,ts,jsx,tsx}`)
              ],
            }),
          ],
        },
      },
      swc: {
        jsc: {
          experimental: {
            cacheRoot: join(ROOT_DIR, './.rd-cache/src/rd/browser/swc')
          }
        }
      },
    },
  })

  return {
    cwd: rendererRootDir,
    rsbuildConfig: rsbuildConfig
  }
}


export default defineConfig({
  bin: join(ROOT_DIR, './node_modules/.bin/electron'),

  transformers: {
    transformerSandboxRspackConfig: transformPreloadRspackConfig,

    transformerMainRspackConfig: transformMainRspackConfig,

    transformerBrowserRsbuildConfig: transformRendererRsbuildConfig
  }
})
