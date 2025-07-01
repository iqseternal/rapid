import { NodeCommand, RdBuilderConfigName } from '../constants';
import { printError, printInfo, print } from '../printer';
import { EnvBuilder } from '../service/EnvBuilder';
import type { RdBuilderConfig } from '../../index';
import { ElectronService } from '../service/ElectronService';
import { rspack } from '@rspack/core';
import { createRsbuild } from '@rsbuild/core';

/**
 * 转换配置文件中的编译配置
 */
export async function transformerConfig(rdBuilderConfig: RdBuilderConfig) {
  const { transformerBrowserRsbuildConfig, transformerMainRspackConfig, transformerSandboxRspackConfig } = rdBuilderConfig.transformers;

  const mainRspackConfig = await transformerMainRspackConfig();
  const preloadRspackConfig = await transformerSandboxRspackConfig();
  const rendererRsbuildConfig = await transformerBrowserRsbuildConfig();

  // compiler
  const mainCompiler = rspack(mainRspackConfig);
  const preloadCompiler = rspack(preloadRspackConfig);
  const rendererRsbuilder = await createRsbuild(rendererRsbuildConfig);

  // compiler once
  const compilerMain = () => {
    return new Promise<void>((resolve, reject) => {
      printInfo(`Compiler: main`);

      mainCompiler.run((err, stats) => {
        if (err) {
          printError(err.message);
          return reject();
        }
        printInfo(`Compiler Success: main`);
        if (stats) print(stats.toString());
        resolve();
      })
    })
  }

  /**
   * 编译 preload
   */
  const compilerPreload = () => {
    return new Promise<void>((resolve, reject) => {
      printInfo(`Compiler: preload`);

      preloadCompiler.run((err, stats) => {
        if (err) {
          printError(err.message);
          return reject();
        }
        printInfo(`Compiler Success: preload`);
        if (stats) print(stats.toString());
        resolve();
      })
    })
  }

  /**
   * 编译渲染进程
   */
  const compilerRenderer = () => {
    return new Promise<void>(async (resolve) => {
      await rendererRsbuilder.build();
      printInfo(`Compiler: web`);
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
  } as const;
}
