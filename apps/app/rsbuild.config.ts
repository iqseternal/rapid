import { loadConfig } from '@rsbuild/core';
import { join } from 'path';
import { createRsbuild, mergeRsbuildConfig } from '@rsbuild/core';
import { DefinePlugin, ProgressPlugin, RspackOptions, rspack } from '@rspack/core';
import { Printer } from '@suey/printer';
import type { ChildProcess } from 'child_process';
import { exec } from 'child_process';
import { defineVars } from '../../build';

import treeKill from 'tree-kill';

// =====================================================================================
// 环境变量定义

type NODE_ENV = 'development' | 'production';
type COMMAND = 'dev' | 'build' | 'preview';
type DEV_SERVER_MODE = 'all' | 'dev:web:only';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NODE_ENV;

      COMMAND: COMMAND;

      DEV_SERVER_MODE: DEV_SERVER_MODE;
    }
  }
}

// =====================================================================================
// 环境变量设置

if (!process.env.COMMAND) {
  Printer.printError(`运行脚本前请先设置 COMMAND 环境变量, (dev | build | preview)`);
  process.exit(1);
}

const IS_DEV = process.env.COMMAND === 'dev';
const IS_PROD = process.env.COMMAND === 'build' || process.env.COMMAND === 'preview';
const IS_PREVIEW = process.env.COMMAND === 'preview';

if (!process.env.NODE_ENV) {
  if (IS_DEV) process.env.NODE_ENV = 'development';
  else if (IS_PROD || IS_PREVIEW) process.env.NODE_ENV = 'production';
}
else {
  if (IS_DEV && process.env.NODE_ENV === 'production') {
    Printer.printError(`错误的环境变量设置, 当前为 dev 环境, 那么 NODE_ENV 不能为 production`);
    process.exit(1);
  }

  if ((IS_PROD || IS_PREVIEW) && process.env.NODE_ENV !== 'production') {
    Printer.printError(`错误的环境变量设置, 当前为 ${process.env.COMMAND} 环境, 那么 NODE_ENV 只能是 production`);
    process.exit(1);
  }
}

if (!process.env.DEV_SERVER_MODE) process.env.DEV_SERVER_MODE = 'dev:web:only';
const IS_DEV_SERVER_WEB_ONLY = process.env.DEV_SERVER_MODE === 'dev:web:only';


// =====================================================================================
// 变量定义

const bin = join(__dirname, './node_modules/.bin/electron');


// =====================================================================================
// 服务

let electronProcess: ChildProcess;
let isKillDone = true;

const initStartElectron = (envArgs: readonly `${string}=${string | number}`[], startPath: string) => {
  const envs = `cross-env ${envArgs.join(' ')}`;

  // 设置环境变量并启动 electron
  electronProcess = exec(`${envs} ${bin} ${startPath}`);

  // 输出 stdout
  electronProcess?.stdout?.on('data', console.log);

  electronProcess.on('error', console.error);
  electronProcess.on('message', console.log);
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
  const mainRspackConfig = (await import(join(__dirname, './desktop-node/rspack.config.ts'))).default as RspackOptions;

  if (!mainRspackConfig.plugins) mainRspackConfig.plugins = [];
  if (!mainRspackConfig.devServer) mainRspackConfig.devServer = {};
  if (!mainRspackConfig.devServer.devMiddleware) mainRspackConfig.devServer.devMiddleware = {};

  // 将结果写入到磁盘
  mainRspackConfig.devServer.devMiddleware.writeToDisk = true;

  const vars = defineVars({ mode: process.env.NODE_ENV });
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
  const preloadRspackConfig = (await import(join(__dirname, './desktop-node/preload/rspack.config.ts'))).default as RspackOptions;

  if (!preloadRspackConfig.devServer) preloadRspackConfig.devServer = {};
  if (!preloadRspackConfig.devServer.devMiddleware) preloadRspackConfig.devServer.devMiddleware = {};

  // 将结果写入到磁盘
  preloadRspackConfig.devServer.devMiddleware.writeToDisk = true;

  const vars = defineVars({ mode: process.env.NODE_ENV });
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
    cwd: join(__dirname, './desktop-web/'),
    envMode: 'production',
    path: join(__dirname, './desktop-web/rsbuild.config.ts'),
  });

  const vars = defineVars({ mode: process.env.NODE_ENV });

  const rendererRsbuilder = await createRsbuild({
    cwd: join(__dirname, './desktop-web/'),
    rsbuildConfig: mergeRsbuildConfig(content, ({
      source: {
        define: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
          ...vars
        }
      }
    }))
  });

  return rendererRsbuilder;
}

// =====================================================================================
// 加载启动流
;(async () => {
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


    console.log(IS_DEV);
    // renderer 热更新服务启动
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
      Promise.all([
        compilerMain(),
        compilerPreload()
      ]).then(() => {
        startElectron(envs, mainCompiler.outputPath);
      }).catch(() => process.exit(1));
      return;
    }

    // 都热更新, 发生变化就 compile 并且重新启动 app
    preloadCompiler.watch({
      aggregateTimeout: 1000
    }, (err, stats) => {
      if (err) {
        Printer.printError(err);
        process.exit(1);
      }
      Printer.print(stats.toString());
      if (mainCompiler.running) return;

      startElectron(envs, mainCompiler.outputPath);
    })
    mainCompiler.watch({
      aggregateTimeout: 1000
    }, (err, stats) => {
      if (err) {
        Printer.printError(err);
        process.exit(1);
      }
      Printer.print(stats.toString());
      if (preloadCompiler.running) return;

      startElectron(envs, mainCompiler.outputPath);
    })
    return;
  }

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
