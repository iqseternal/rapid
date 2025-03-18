import { createRsbuild, CreateRsbuildOptions } from '@rsbuild/core';
import { EnvBuilder, DIRS, rules } from './rd-builder';
import { DefinePlugin, HotModuleReplacementPlugin, ProgressPlugin, RspackOptions, node, rspack, SwcJsMinimizerRspackPlugin } from '@rspack/core';
import { defineConfig as defineRspackConfig } from '@rspack/cli';
import { defineConfig as defineRsbuildConfig } from '@rsbuild/core';
import { Printer, printWarn } from '@suey/printer';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import type { ChildProcess } from 'child_process';
import { exec } from 'child_process';
import { join } from 'path';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules';
import { pluginSourceBuild } from '@rsbuild/plugin-source-build';
import { pluginTailwindCSS } from 'rsbuild-plugin-tailwindcss';

import treeKill from 'tree-kill';
import tailwindcss from 'tailwindcss';
import bytenode from 'bytenode';

import packageJson from '../package.json';

import tsconfigMainJson from './rd/tsconfig.main.json';
import tsconfigSandboxJson from './rd/tsconfig.sandbox.json';
import tsconfigBrowserJson from './rd/tsconfig.browser.json';

// =====================================================================================
// 环境变量定义

declare type DEV_SERVER_MODE = 'all' | 'dev:web:only';

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      DEV_SERVER_MODE: DEV_SERVER_MODE;
    }
  }
}

// =====================================================================================
// 环境变量设置
const envBuilder = new EnvBuilder();

const { IS_DEV, IS_PROD, IS_PREVIEW, IS_BUILD } = envBuilder.toEnvs();

if (!process.env.DEV_SERVER_MODE) process.env.DEV_SERVER_MODE = 'dev:web:only';
const IS_DEV_SERVER_WEB_ONLY = process.env.DEV_SERVER_MODE === 'dev:web:only';


// =====================================================================================
// 变量定义

const bin = join(__dirname, '../node_modules/.bin/electron');

const rendererRootDir = join(__dirname, './rd/code/browser');
const rendererEntry = join(rendererRootDir, './index.tsx');

const mainEntry = join(__dirname, './rd/app.ts');
const preloadEntry = join(__dirname, './rd/code/electron-sandbox/index.ts');


const mainOutput = join(DIRS.ROOT_DIR, './.rd-packer/out/main');
const preloadOutput = join(DIRS.ROOT_DIR, './.rd-packer/out/preload');
const rendererOutput = join(DIRS.ROOT_DIR, './.rd-packer/out/renderer');

const defineVars = {
  IS_DEV: IS_DEV,
  IS_PROD: IS_PROD,

  IS_WINDOWS: true,
  IS_MAC: false,
  IS_LINUX: false,

  IS_DESKTOP: true,
  IS_MOBILE: false,
  IS_BROWSER: false,
} as const;

// =====================================================================================
// 加载启动流
; (async () => {
  Printer.printInfo(`Electron 版本: ${packageJson?.devDependencies?.electron || packageJson?.dependencies?.['electron'] || '未知'}`);
  Printer.printInfo(`Electron-Builder 版本: ${packageJson?.devDependencies?.['electron-builder'] || packageJson?.dependencies?.['electron-builder'] || '未知'}`);

  Printer.printInfo('当前识别环境变量: ');

  printWarn(`  IS_DEV=${IS_DEV}`);
  printWarn(`  IS_PROD=${IS_PROD}`);
  printWarn(`  IS_BUILD=${IS_BUILD}`);
  printWarn(`  IS_PREVIEW=${IS_PREVIEW}`);
  printWarn(`  IS_DEV_SERVER_WEB_ONLY=${IS_DEV_SERVER_WEB_ONLY}`);

  const { mainCompiler, preloadCompiler, rendererRsbuilder, compilerMain, compilerPreload, compilerRenderer } = await transform();
  const { exit, restartElectron } = await initElectronServer();

  // 开发模式, 配置热更新
  if (IS_DEV) {
    // renderer 热更新服务启动
    const rendererServer = await rendererRsbuilder.startDevServer();

    // 服务启动地址
    const rendererServerUrl = rendererServer.urls[0];
    if (!rendererServerUrl) {
      Printer.printError(`renderer 服务启动失败`);
      return exit(1);
    }

    // 环境变量
    const envs = [
      `ELECTRON_RENDERER_URL=${rendererServerUrl}`
    ] as const;

    // 只有 web 热更新
    if (IS_DEV_SERVER_WEB_ONLY) {
      await Promise.all([compilerMain(), compilerPreload()]);
      restartElectron(envs, mainCompiler.outputPath);
      return;
    }

    // 都热更新, 发生变化就 compile 并且重新启动 app
    // preloadCompiler.watch({
    //   aggregateTimeout: 2000
    // }, (err, stats) => {
    //   if (err) {
    //     Printer.printError(err);
    //     process.exit(1);
    //   }
    //   Printer.printInfo(`Compiler: preload`);
    //   Printer.print(stats.toString());

    //   // if (mainCompiler.running) return;
    //   startElectron(envs, mainCompiler.outputPath);
    // })
    await compilerPreload();

    mainCompiler.watch({ aggregateTimeout: 2000 }, (err, stats) => {
      if (err) return exit(1);
      if (stats) Printer.print(stats.toString());
      // if (preloadCompiler.running) return;
      restartElectron(envs, mainCompiler.outputPath);
    })
    return;
  }

  // 生产模式, 只需要输出产物
  if (IS_PROD) {
    await Promise.all([compilerRenderer(), compilerMain(), compilerPreload()]);

    /**
     * 构建主进程字节码
     */
    const bytenodeMain = async () => {
      const dist = await bytenode.compileFile({
        filename: join(mainCompiler.outputPath, 'index.js'),
        compileAsModule: true,
        electron: true,
        createLoader: true,
        loaderFilename: 'index.js',
      });
      return dist;
    }

    const bytenodePreload = async () => {
      const dist = await bytenode.compileFile({
        filename: join(preloadCompiler.outputPath, 'index.js'),
        compileAsModule: true,
        electron: true,
        createLoader: true,
        loaderFilename: 'index.js',
      });
      return dist;
    }

    /**
     * 并行: 构建字节码
     */
    if (IS_BUILD) await Promise.all([bytenodeMain(), bytenodePreload()]);

    // 检查是否需要预览
    if (IS_PREVIEW) restartElectron([], mainCompiler.outputPath);
    return;
  }
})();





// =====================================================================================
// 配置加载

async function transform() {

  const mainRspackConfig = await transformMainRspackConfig();
  const preloadRspackConfig = await transformPreloadRspackConfig();
  const rendererRsbuildConfig = await transformRendererRsbuildConfig();

  // compiler
  const mainCompiler = rspack(mainRspackConfig);
  const preloadCompiler = rspack(preloadRspackConfig);
  const rendererRsbuilder = await createRsbuild(rendererRsbuildConfig);

  // compiler once
  const compilerMain = () => {
    return new Promise<void>((resolve, reject) => {
      Printer.printInfo(`Compiler: main`);

      mainCompiler.run((err, stats) => {
        if (err) {
          Printer.printError(err);
          return reject();
        }
        Printer.printInfo(`Compiler Success: main`);
        if (stats) Printer.print(stats.toString());
        resolve();
      })
    })
  }

  const compilerPreload = () => {
    return new Promise<void>((resolve, reject) => {
      Printer.printInfo(`Compiler: preload`);

      preloadCompiler.run((err, stats) => {
        if (err) {
          Printer.printError(err);
          return reject();
        }
        Printer.printInfo(`Compiler Success: preload`);
        if (stats) Printer.print(stats.toString());
        resolve();
      })
    })
  }

  const compilerRenderer = () => {
    return new Promise<void>(async (resolve) => {
      await rendererRsbuilder.build();
      Printer.printInfo(`Compiler: web`);
      resolve();
    })
  }

  return {
    mainRspackConfig,
    preloadRspackConfig,
    rendererRsbuildConfig,
    mainCompiler,
    preloadCompiler,
    rendererRsbuilder,
    compilerMain,
    compilerPreload,
    compilerRenderer,
  }
}


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
        rules.supportImportRaw,
        rules.supportTypescript
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
      rules: [rules.supportImportRaw, rules.supportTypescript],
    },
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
      }
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
      IS_PROD && pluginTailwindCSS()
    ],
    server: {
      port: 3002,
      proxy: {
        '/rapi': {
          pathRewrite: (pathname) => {
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
      distPath: {
        root: rendererOutput,
      },

      emitAssets: true,
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
      buildCache: {
        cacheDirectory: join(DIRS.ROOT_DIR, '/.rd-cache/.cache/'),
      },
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
    },
  })

  return {
    cwd: rendererRootDir,
    rsbuildConfig: rsbuildConfig
  }
}




// =====================================================================================
// 服务

declare interface State {
  /**
   * 存储启动的 electron 子进程
   */
  electronProcess?: ChildProcess;
  /**
   * 当前是否 kill 完成子进程
   */
  isKillDone: boolean;
}

async function initElectronServer() {
  const state: State = {
    electronProcess: void 0,
    isKillDone: true,
  }

  /**
   * 退出当前进程
   */
  const exit = (code: number = 0): never => process.exit(code);

  /**
   * 事件: 当当前进程即将结束时, 去结束 electron 进程
   */
  const onCurrentProcessBeforeExit = () => exit();

  /**
   * 退出在子进程运行的 electron 进程
   */
  const exitElectronProcess = (callback = () => { }) => {
    if (!state.electronProcess) return;

    if (typeof state.electronProcess.pid === 'undefined') {
      Printer.printError(`electron 进程 pid 丢失`);
      process.exit(1);
    }
    if (state.electronProcess.killed) return;

    // 重启过快, 上一次 kill 还没结束
    if (!state.isKillDone) return;

    Printer.printInfo(`进行结束 electron 进程`);

    // 开始 kill
    state.isKillDone = false;

    state.electronProcess.removeListener('exit', exit);

    // kill 上一次的 electron 进程
    treeKill(state.electronProcess.pid, 'SIGTERM', err => {
      if (err) {
        Printer.printError(`没有kill成功子进程, Electron重启失败`);
        Printer.printError(err);
        process.exit(1);
      }

      // 结束 kill
      state.isKillDone = true;
      Printer.printError(`electron 进程 kill 结束`);

      callback();
    })
  }

  /**
   * 初始化并启动 electron 进程
   */
  const initAndStartElectron = (envArgs: readonly `${string}=${string | number}`[], startPath: string) => {
    Printer.printInfo('启动程序');

    const envs = `cross-env ${envArgs.join(' ')}`;

    // 设置环境变量并启动 electron
    state.electronProcess = exec(`${envs} ${bin} ${startPath}`);

    state.electronProcess?.stdout?.on('data', (data) => {
      process.stdout.write(data.toString());
    });
    state.electronProcess.on('error', (err) => {
      process.stderr.write(err.toString());
    });
    state.electronProcess.on('message', (message) => {
      process.stderr.write(message.toString());
    });
    state.electronProcess.addListener('exit', exit);

    process.removeListener('beforeExit', onCurrentProcessBeforeExit);
    process.addListener('beforeExit', onCurrentProcessBeforeExit);
  }

  /**
   * 重启 electron 进程
   */
  const restartElectron = (envArgs: readonly `${string}=${string | number}`[], startPath: string) => {
    if (!state.electronProcess) return initAndStartElectron(envArgs, startPath);

    exitElectronProcess(() => {
      initAndStartElectron(envArgs, startPath);
    })
  };

  return {
    exit,
    restartElectron
  }
}


