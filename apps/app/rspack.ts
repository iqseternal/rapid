import { loadConfig, createRsbuild, mergeRsbuildConfig, RsbuildConfig, CreateRsbuildOptions } from '@rsbuild/core';
import { EnvBuilder, DIRS } from '../../config/node/builder';
import { DefinePlugin, ProgressPlugin, RspackOptions, rspack } from '@rspack/core';
import { Printer, print, printWarn } from '@suey/printer';
import type { ChildProcess } from 'child_process';
import { exec } from 'child_process';
import { join } from 'path';
import { writeFile, writeFileSync } from 'fs';

import treeKill from 'tree-kill';
import tailwindcss from 'tailwindcss';
import bytenode from 'bytenode';
import packageJson from './package.json';

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

const bin = join(__dirname, './node_modules/.bin/electron');


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

const state: State = {
  electronProcess: void 0,
  isKillDone: true,
}

/**
 * 退出当前进程
 */
const exitCurrentProcess = () => {
  process.exit(0);
}

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

  state.electronProcess.removeListener('exit', exitCurrentProcess);

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
 * 事件: 当当前进程即将结束时, 去结束 electron 进程
 */
const onCurrentProcessBeforeExit = () => exitCurrentProcess();

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
  state.electronProcess.addListener('exit', exitCurrentProcess);

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
}

// =====================================================================================
// 配置加载

const transformMainRspackConfig = async (): Promise<RspackOptions> => {
  const mainRspackConfig = (await import(join(__dirname, './desktop-node/rspack.config.ts'))).default as RspackOptions;

  if (!mainRspackConfig.plugins) mainRspackConfig.plugins = [];
  if (!mainRspackConfig.devServer) mainRspackConfig.devServer = {};
  if (!mainRspackConfig.devServer.devMiddleware) mainRspackConfig.devServer.devMiddleware = {};

  // 将结果写入到磁盘
  mainRspackConfig.devServer.devMiddleware.writeToDisk = true;

  const vars = envBuilder.defineVars();
  mainRspackConfig.plugins.push(new DefinePlugin(vars as Record<string, any>));

  if (IS_PROD) {
    // 构建时, 展示构建文件
    mainRspackConfig.plugins.push(new ProgressPlugin({
      prefix: 'rapid',
      profile: true
    }));
  }

  return mainRspackConfig;
}

const transformPreloadRspackConfig = async (): Promise<RspackOptions> => {
  const preloadRspackConfig = (await import(join(__dirname, './desktop-preload/rspack.config.ts'))).default as RspackOptions;

  if (!preloadRspackConfig.devServer) preloadRspackConfig.devServer = {};
  if (!preloadRspackConfig.devServer.devMiddleware) preloadRspackConfig.devServer.devMiddleware = {};

  // 将结果写入到磁盘
  preloadRspackConfig.devServer.devMiddleware.writeToDisk = true;

  const vars = envBuilder.defineVars();
  preloadRspackConfig.plugins.push(new DefinePlugin(vars as Record<string, any>));

  if (IS_PROD) {
    // 构建时, 展示构建文件
    preloadRspackConfig.plugins.push(new ProgressPlugin({
      prefix: 'rapid',
      profile: true
    }));
  }

  return preloadRspackConfig;
}

const transformRendererRsbuildConfig = async (): Promise<CreateRsbuildOptions> => {
  const desktopWebDir = join(__dirname, './desktop-web');
  const { content } = await loadConfig({
    cwd: desktopWebDir,
    envMode: 'production',
    path: join(desktopWebDir, './rsbuild.config.ts'),
  });

  const vars = envBuilder.defineVars();

  return {
    cwd: desktopWebDir,
    rsbuildConfig: mergeRsbuildConfig(content, ({
      source: {
        define: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          ...vars
        }
      }
    }))
  }
}

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

  print();
  Printer.printInfo(`加载编译配置文件....`);

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
        Printer.print(stats.toString());
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
        Printer.print(stats.toString());
        resolve();
      })
    })
  }

  const compilerRenderer = () => {
    return new Promise<void>(async (resolve, reject) => {
      await rendererRsbuilder.build();
      Printer.printInfo(`Compiler: web`);
      resolve();
    })
  }

  // 开发模式, 配置热更新
  if (IS_DEV) {
    Printer.printInfo(`加载开发时编译....`);
    print();

    // renderer 热更新服务启动
    Printer.printInfo(`Compiler: web`);
    const rendererServer = await rendererRsbuilder.startDevServer();

    // 服务启动地址
    const rendererServerUrl = rendererServer.urls[0];
    if (!rendererServerUrl) {
      Printer.printError(`renderer 服务启动失败`);
      process.exit(1);
    }

    // 环境变量

    // ELECTRON_RENDERER_URL: 在主进程代码中有动态判断, 如果是开发模式就加载指定 URL.
    const envs = [
      `ELECTRON_RENDERER_URL=${rendererServerUrl}`
    ] as const;

    // 只有 web 热更新
    if (IS_DEV_SERVER_WEB_ONLY) {

      // 编译一次 main 和 preload 就启动服务
      Promise.all([compilerMain(), compilerPreload()])
        .then(() => {
          restartElectron(envs, mainCompiler.outputPath);
        })
        .catch(exitCurrentProcess);
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

    Printer.printInfo(`Compiler: main`);
    mainCompiler.watch({ aggregateTimeout: 2000 }, (err, stats) => {
      if (err) {
        Printer.printError(err);
        process.exit(1);
      }

      Printer.printInfo(`Compiler Success: main`);
      Printer.print(stats.toString());

      // if (preloadCompiler.running) return;
      restartElectron(envs, mainCompiler.outputPath);
    })
    return;
  }

  // 生产模式, 只需要输出产物
  if (IS_PROD) {
    Printer.printInfo(`加载生产时编译....`);
    print();

    await Promise.all([compilerRenderer(), compilerMain(), compilerPreload()]);

    /**
     * 构建主进程字节码
     */
    const bytenodeMain = async () => {
      Printer.printInfo('bytenode main...');
      const dist = await bytenode.compileFile({
        filename: join(mainCompiler.outputPath, 'index.js'),
        compileAsModule: true,
        electron: true,
        createLoader: true,
        loaderFilename: 'index.js',
      });
      Printer.printInfo('主进程编译字节码', dist);
    }

    /**
     * 构建渲染进程字节码
     */
    const bytenodePreload = async () => {
      Printer.printInfo('bytenode preload...');
      const dist = await bytenode.compileFile({
        filename: join(preloadCompiler.outputPath, 'index.js'),
        compileAsModule: true,
        electron: true,
        createLoader: true,
        loaderFilename: 'index.js',
      });
      Printer.printInfo('预加载进程编译字节码', dist);
    }

    /**
     * 并行
     */
    await Promise.all([bytenodeMain(), bytenodePreload()]);

    // 检查是否需要预览
    if (IS_PREVIEW) {
      const envs = [] as const;

      restartElectron(envs, mainCompiler.outputPath);
    }
    return;
  }
})();
