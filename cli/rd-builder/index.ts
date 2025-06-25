import type { CreateRsbuildOptions } from '@rsbuild/core';
import type { RspackOptions } from '@rspack/core';
import { printError, printInfo, printWarn, print } from './src/printer';
import { RdBuilderConfigName } from './src/constants';

export interface RdBuilderEnvs {
  readonly IS_DEV: boolean;
  readonly IS_PROD: boolean;

  readonly IS_BUILD: boolean;
  readonly IS_PREVIEW: boolean;
}

export interface RdBuilderConfig {
  transformerMainRspackConfig: (envs: RdBuilderEnvs) => Promise<RspackOptions>;

  transformerSandboxRspackConfig: (envs: RdBuilderEnvs) => Promise<RspackOptions>;

  transformerBrowserRsbuildConfig: (envs: RdBuilderEnvs) => Promise<CreateRsbuildOptions>;
}

export function defineConfig<T extends RdBuilderConfig>(config: T): T {

  if (typeof config !== 'object') {
    printError(`${RdBuilderConfigName} 配置文件必须默认导出一个对象`);
    process.exit(1);
  }

  if (!Reflect.has(config, 'dirs')) {
    printError(`${RdBuilderConfigName} 配置对象必须传递 dirs 属性`);
    process.exit(1);
  }

  if (typeof config.transformerMainRspackConfig !== 'function') {
    printError(`${RdBuilderConfigName} 配置对象必须传递 transformerMainRspackConfig 方法`);
    process.exit(1);
  }

  if (typeof config.transformerSandboxRspackConfig !== 'function') {
    printError(`${RdBuilderConfigName} 配置对象必须传递 transformerSandboxRspackConfig 方法`);
    process.exit(1);
  }

  if (typeof config.transformerBrowserRsbuildConfig !== 'function') {
    printError(`${RdBuilderConfigName} 配置对象必须传递 transformerBrowserRsbuildConfig 方法`);
    process.exit(1);
  }

  return config;
}

