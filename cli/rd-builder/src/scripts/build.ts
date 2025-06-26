import { NodeCommand, RdBuilderConfigName } from '../constants';
import { printError, printInfo, print } from '../printer';
import type { RdBuilderConfig } from '../../index';
import { ElectronService } from '../service/ElectronService';
import { transformerConfig } from '../lib';

import bytenode from 'bytenode';

import * as path from 'path';
import * as fs from 'fs';

export interface BuildActionOptions {
  /**
   * 配置文件名称/路径
   */
  config?: string;

  /**
   * 是否开启预览模式
   */
  preview?: boolean;

  /**
   * TODO: 待实现
   */
  platform?: 'windows' | 'linux' | 'mac';
}

export async function buildAction(options: BuildActionOptions) {
  process.env.COMMAND = NodeCommand.Build;

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

  await Promise.all([compilerRenderer(), compilerMain(), compilerPreload()]);

  /**
   * 构建主进程字节码
   */
  const bytenodeMain = async () => {
    const dist = await bytenode.compileFile({
      filename: path.join(mainCompiler.outputPath, 'index.js'),
      compileAsModule: true,
      electron: true,
      createLoader: true,
      loaderFilename: 'index.js',
    });
    return dist;
  }

  const bytenodePreload = async () => {
    const dist = await bytenode.compileFile({
      filename: path.join(preloadCompiler.outputPath, 'index.js'),
      compileAsModule: true,
      electron: true,
      createLoader: true,
      loaderFilename: 'index.js',
    });
    return dist;
  }

  if (!options.preview) {
    await Promise.all([bytenodeMain(), bytenodePreload()]);
  }

  if (options.preview) {
    await electronService.restart([], mainCompiler.outputPath);
  }
}
