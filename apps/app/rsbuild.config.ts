// @ts-nocheck
import { defineConfig, loadConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSourceBuild, getMonorepoSubProjects } from '@rsbuild/plugin-source-build';
import { isAbsolute, join, resolve } from 'path';
import { IS_DEV, IS_PROD } from '../../build';

import { createRsbuild, mergeRsbuildConfig, defineConfig as defineRsbuildConfig } from '@rsbuild/core';
import { Compiler, DefinePlugin, ProgressPlugin, rspack } from '@rspack/core';
import type { ConfigParams } from '@rsbuild/core/dist-types/config';

import { existsSync, statSync } from 'fs';
import { Printer } from '@suey/printer';
import type { ChildProcess } from 'child_process';
import { exec } from 'child_process';

import mainRspackConfig from './desktop-node/rspack.config';
import preloadRspackConfig from './desktop-node/preload/rspack.config';
import rendererRsbuildConfig from './desktop-web/rsbuild.config';

import treeKill from 'tree-kill';
import chokidar from 'chokidar';

const bin = join(__dirname, './node_modules/.bin/electron');
let electronProcess: ChildProcess;

;(async () => {
  const { content } = await loadConfig({
    cwd: join(__dirname, './desktop-web/'),
    envMode: 'production',
    path: join(__dirname, './desktop-web/rsbuild.config.ts'),
  });

  console.log(process.env.NODE_ENV);
  let isOpenServer = false;

  const rendererRsbuilder = await createRsbuild({
    cwd: join(__dirname, './desktop-web/'),
    rsbuildConfig: mergeRsbuildConfig(content, ({
      source: {
        define: {
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        }
      }
    }))
  });

  if (IS_DEV) {
    const server = await rendererRsbuilder.startDevServer();


    const preloadCompiler = rspack(preloadRspackConfig);
    preloadCompiler.run((err) => {
      if (err) {
        console.error(err);
      }
    });

    if (!mainRspackConfig.plugins) mainRspackConfig.plugins = [];

    class PluginWidthStartElectron {
      apply(compiler: Compiler) {
        if (IS_PROD) return;

        const envArgs = `set ELECTRON_RENDERER_URL=${server.urls[0]}&&`;
        const watcher = chokidar.watch(join(__dirname, './out/main/'), {
          awaitWriteFinish: true,
          ignored: /(^|[\/\\])\../, // 忽略隐藏文件
          persistent: true,
        });

        watcher.on('ready', () => {
          console.log(compiler.outputPath);

          if (electronProcess) {
            Printer.printWarn(`当前已经启动了electron`);
            return;
          }
          electronProcess = exec(`${envArgs} ${bin} ${compiler.outputPath}`);
          electronProcess?.stdout?.on('data', console.log);
          electronProcess.on('error', console.error);
          electronProcess.on('message', console.log);
          electronProcess.on('exit', () => {
            process.exit(1);
          })
        });

        watcher.on('change', () => {
          if (!electronProcess) return;

          if (typeof electronProcess.pid === 'undefined') {
            Printer.printError(`没有kill成功子进程, Electron重启失败`);
            process.exit(1);
          }
          // if (electronProcess.killed) return;

          treeKill(electronProcess.pid, 'SIGTERM', err => {
            if (err) {
              Printer.printError(err);
              Printer.printError(`没有kill成功子进程, Electron重启失败`);
              process.exit(1);
            }
            electronProcess = exec(`${envArgs} ${bin} ${compiler.outputPath}`);
            electronProcess?.stdout?.on('data', console.log);
            electronProcess.on('error', console.error);
            electronProcess.on('message', console.log);
          });
        });
      }
    }

    if (IS_DEV) {
      if (!mainRspackConfig.devServer) mainRspackConfig.devServer = {};
      if (!mainRspackConfig.devServer.devMiddleware) mainRspackConfig.devServer.devMiddleware = {};

      mainRspackConfig.devServer.devMiddleware.writeToDisk = true;
      mainRspackConfig.plugins.push(new PluginWidthStartElectron());
    }

    // mainRspackConfig.plugins?.push(new DefinePlugin({
    //   'process.env.NODE_ENV': process.env.NODE_ENV ?? 'production',
    //   'process.env.ELECTRON_RENDERER_URL': server.urls[0],
    //   [`process.env['ELECTRON_RENDERER_URL']`]: server.urls[0]
    // }));
    // mainRspackConfig.plugins.push(new ProgressPlugin({
    //   prefix: 'rapid',
    //   profile: true
    // }));

    Printer.printInfo(`正在编译`);
    const mainCompiler = rspack(mainRspackConfig);

    mainCompiler.run((err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
    })
    return;
  }

  if (IS_PROD) {
    Printer.printInfo(`正在编译`);
    const renderer = rendererRsbuilder.build();

    if (!mainRspackConfig.plugins) mainRspackConfig.plugins = [];
    mainRspackConfig.plugins.push(new ProgressPlugin({
      prefix: 'rapid',
      profile: true
    }));

    const main = rspack(mainRspackConfig);
    main.run((err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      // console.log(stats);
    })
  }
})();
