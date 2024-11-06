import { loadConfig, createRsbuild, mergeRsbuildConfig } from '@rsbuild/core';

import { DefinePlugin, ProgressPlugin, RspackOptions, rspack } from '@rspack/core';
import { Printer } from '@suey/printer';
import type { ChildProcess } from 'child_process';
import { exec } from 'child_process';
import { join } from 'path';

import treeKill from 'tree-kill';

import { Builder, DIRS } from '../../config/node/builder';

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
const builder = new Builder();

const { IS_DEV, IS_PROD, IS_PREVIEW } = builder.toEnvs();

if (!process.env.DEV_SERVER_MODE) process.env.DEV_SERVER_MODE = 'dev:web:only';
const IS_DEV_SERVER_WEB_ONLY = process.env.DEV_SERVER_MODE === 'dev:web:only';


// =====================================================================================
// 变量定义

const bin = join(__dirname, './node_modules/.bin/electron');


// =====================================================================================
// 服务

let electronProcess: ChildProcess;
let isKillDone = true;

const exitElectron = () => {
  process.exit(0);
}

const initStartElectron = (envArgs: readonly `${string}=${string | number}`[], startPath: string) => {
  Printer.printInfo('启动程序');

  const envs = `cross-env ${envArgs.join(' ')}`;

  // 设置环境变量并启动 electron
  electronProcess = exec(`${envs} ${bin} ${startPath}`);

  electronProcess?.stdout?.on('data', (data) => {
    process.stdout.write(data.toString());
  });
  electronProcess.on('error', (err) => {
    process.stderr.write(err.toString());
  });
  electronProcess.on('message', (message) => {
    process.stderr.write(message.toString());
  });
  electronProcess.addListener('exit', exitElectron);
}

const startElectron = (envArgs: readonly `${string}=${string | number}`[], startPath: string) => {
  if (!electronProcess) return initStartElectron(envArgs, startPath);

  if (typeof electronProcess.pid === 'undefined') {
    Printer.printError(`electron 进程 pid 丢失`);
    process.exit(1);
  }

  if (electronProcess.killed) return;
  // 重启过快, 上一次 kill 还没结束
  if (!isKillDone) return;

  Printer.printInfo(`结束 electron 进程`);

  // 开始 kill
  isKillDone = false;

  electronProcess.removeListener('exit', exitElectron);

  // kill 上一次的 electron 进程
  treeKill(electronProcess.pid, 'SIGTERM', err => {
    if (err) {
      Printer.printError(`没有kill成功子进程, Electron重启失败`);
      Printer.printError(err);
      process.exit(1);
    }

    initStartElectron(envArgs, startPath);

    // 结束 kill
    isKillDone = true;
  })
}

// =====================================================================================
// 配置加载

const transformMainRspackConfig = async () => {
  const mainRspackConfig = (await import(join(DIRS.DEV_DESKTOP_MAIN_DIR, './rspack.config.ts'))).default as RspackOptions;

  if (!mainRspackConfig.plugins) mainRspackConfig.plugins = [];
  if (!mainRspackConfig.devServer) mainRspackConfig.devServer = {};
  if (!mainRspackConfig.devServer.devMiddleware) mainRspackConfig.devServer.devMiddleware = {};

  // 将结果写入到磁盘
  mainRspackConfig.devServer.devMiddleware.writeToDisk = true;

  const vars = builder.defineVars();
  mainRspackConfig.plugins.push(new DefinePlugin(vars as Record<string, any>));

  // mainRspackConfig.plugins?.push(new DefinePlugin({
  //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? 'production'),
  //   'process.env.ELECTRON_RENDERER_URL': JSON.stringify(1),
  //   [`process.env['ELECTRON_RENDERER_URL']`]: JSON.stringify(1)
  // }));

  if (IS_PROD) {
    // 构建时, 展示构建文件
    mainRspackConfig.plugins.push(new ProgressPlugin({
      prefix: 'rapid',
      profile: true
    }));
  }

  return mainRspackConfig;
}

const transformPreloadRspackConfig = async () => {
  const preloadRspackConfig = (await import(join(DIRS.DEV_DESKTOP_PRELOAD_DIR, './rspack.config.ts'))).default as RspackOptions;

  if (!preloadRspackConfig.devServer) preloadRspackConfig.devServer = {};
  if (!preloadRspackConfig.devServer.devMiddleware) preloadRspackConfig.devServer.devMiddleware = {};

  // 将结果写入到磁盘
  preloadRspackConfig.devServer.devMiddleware.writeToDisk = true;

  const vars = builder.defineVars();
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

const transformRendererRsbuilder = async () => {
  const { content } = await loadConfig({
    cwd: DIRS.DEV_DESKTOP_WEB_DIR,
    envMode: 'production',
    path: join(DIRS.DEV_DESKTOP_WEB_DIR, './rsbuild.config.ts'),
  });

  const vars = builder.defineVars();

  return createRsbuild({
    cwd: DIRS.DEV_DESKTOP_WEB_DIR,
    rsbuildConfig: mergeRsbuildConfig(content, ({
      source: {
        define: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          ...vars
        }
      }
    }))
  });
}

// =====================================================================================
// 加载启动流
;(async () => {
  Printer.printInfo(`加载编译....`);

  const mainRspackConfig = await transformMainRspackConfig();
  const preloadRspackConfig = await transformPreloadRspackConfig();

  const rendererRsbuilder = await transformRendererRsbuilder();



  // compiler
  const mainCompiler = rspack(mainRspackConfig);
  const preloadCompiler = rspack(preloadRspackConfig);

  // compiler once
  const compilerMain = () => {
    return new Promise<void>((resolve, reject) => {
      mainCompiler.run((err, stats) => {
        if (err) {
          Printer.printError(err);
          return reject();
        }
        Printer.printInfo(`Compiler: main`);
        Printer.print(stats.toString());
        resolve();
      })
    })
  }
  const compilerPreload = () => {
    return new Promise<void>((resolve, reject) => {
      preloadCompiler.run((err, stats) => {
        if (err) {
          Printer.printError(err);
          return reject();
        }
        Printer.printInfo(`Compiler: preload`);
        Printer.print(stats.toString());
        resolve();
      })
    })
  }

  // 开发模式, 配置热更新
  if (IS_DEV) {
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
    const envs = [
      `ELECTRON_RENDERER_URL=${rendererServerUrl}`
    ] as const;

    // 只有 web 热更新
    if (IS_DEV_SERVER_WEB_ONLY) {

      // 编译一次 main 和 preload 就启动服务
      Promise.all([compilerMain(), compilerPreload()]).then(() => {
        startElectron(envs, mainCompiler.outputPath);
      }).catch(() => {
        process.exit(1)
      });
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

    mainCompiler.watch({
      aggregateTimeout: 2000
    }, (err, stats) => {
      if (err) {
        Printer.printError(err);
        process.exit(1);
      }
      Printer.printInfo(`Compiler: main`);
      Printer.print(stats.toString());
      // if (preloadCompiler.running) return;

      startElectron(envs, mainCompiler.outputPath);
    })
    return;
  }

  Printer.printInfo(`加载编译....`);

  // 生产模式, 只需要输出产物
  if (IS_PROD) {
    const envs = [

    ] as const;

    Promise.all([
      rendererRsbuilder.build(),
      compilerMain(),
      compilerPreload(),
    ]).then(() => {

      // 检查是否需要预览
      if (IS_PREVIEW) startElectron(envs, mainCompiler.outputPath);
    }).catch(() => {
      process.exit(1)
    });
    return;
  }
})();
