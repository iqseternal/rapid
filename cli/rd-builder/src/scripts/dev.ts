import { NodeCommand, RdBuilderConfigName, Platforms } from '../constants';
import { printError, printInfo, print } from '../printer';
import type { RdBuilderConfig } from '../../index';
import { ElectronService } from '../service/ElectronService';
import { transformerConfig } from '../lib';

import * as path from 'path';
import * as fs from 'fs';

export interface DevActionOptions {
  /**
   * 配置文件名称/路径
   */
  readonly config?: string;

  /**
   * 是否监听主入口文件、实现能够重新加载 应用程序
   */
  readonly watch?: boolean;

  /**
   * TODO: 待实现
   */
  readonly platform?: 'windows' | 'linux' | 'mac';
}

export async function devAction(options: DevActionOptions) {
  printInfo('Dev Start.');

  process.env.COMMAND = NodeCommand.Dev;

  const configPath = path.join(process.cwd(), options.config ?? RdBuilderConfigName);

  // 配置文件检查
  if (!fs.existsSync(configPath) || !fs.statSync(configPath).isFile()) {
    printError(`配置文件 ${RdBuilderConfigName} 不存在`);
    process.exit(1);
  }

  const target = await import(configPath);

  if (!target.default) {
    printError(`配置文件 ${RdBuilderConfigName} 未默认导出配置对象`);
    process.exit(1);
  }

  const config = target.default as RdBuilderConfig;

  const { mainCompiler, preloadCompiler, rendererRsbuilder, compilerMain, compilerPreload, compilerRenderer } = await transformerConfig(config);

  const electronService = new ElectronService(config.bin);

  // renderer 热更新服务启动
  const rendererServer = await rendererRsbuilder.startDevServer();

  // 服务启动地址
  const rendererServerUrl = rendererServer.urls[0];
  if (!rendererServerUrl) {
    printError(`renderer 服务启动失败`);
    process.exit(1);
  }

  // 环境变量
  const envs = [
    `ELECTRON_RENDERER_URL=${rendererServerUrl}`
  ] as const;

  // 只有 web 热更新
  if (!options.watch) {
    await Promise.all([compilerMain(), compilerPreload()]);
    await electronService.restart(envs, mainCompiler.outputPath);
    return;
  }

  // 都热更新, 发生变化就 compile 并且重新启动 app
  // preloadCompiler.watch({
  //   aggregateTimeout: 2000
  // }, (err, stats) => {
  //   if (err) {
  //     printError(err);
  //     process.exit(1);
  //   }
  //   printInfo(`Compiler: preload`);
  //   print(stats.toString());

  //   // if (mainCompiler.running) return;
  //   startElectron(envs, mainCompiler.outputPath);
  // })
  await compilerPreload();

  mainCompiler.watch({ aggregateTimeout: 2000 }, async (err, stats) => {
    if (err) {
      process.exit(1);
    }
    if (stats) print(stats.toString({  }));

    // if (preloadCompiler.running) return;
    await electronService.restart(envs, mainCompiler.outputPath);
  })
  return;

}
