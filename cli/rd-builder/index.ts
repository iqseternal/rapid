import type { CreateRsbuildOptions } from '@rsbuild/core';
import type { RspackOptions } from '@rspack/core';
import { printError, printInfo, printWarn, print } from './src/printer';
import { RdBuilderConfigName } from './src/constants';

import * as fs from 'fs';

export { EnvChecker } from './src/service/EnvChecker';
export { EnvBuilder } from './src/service/EnvBuilder';

export interface RdBuilderEnvs {
  readonly IS_DEV: boolean;
  readonly IS_PROD: boolean;

  readonly IS_BUILD: boolean;
  readonly IS_PREVIEW: boolean;
}

export interface RdBuilderConfig {
  bin: string;

  transformers: {
    transformerMainRspackConfig: () => Promise<RspackOptions>;

    transformerSandboxRspackConfig: () => Promise<RspackOptions>;

    transformerBrowserRsbuildConfig: () => Promise<CreateRsbuildOptions>;
  }
}

/**
 * 定义 ts-packer 配置
 */
export function defineConfig<T extends RdBuilderConfig>(config: T): T {
  if (typeof config !== 'object') {
    printError(`${RdBuilderConfigName} 配置文件必须默认导出一个对象`);
    process.exit(1);
  }

  if (typeof config.bin !== 'string') {
    printError(`${RdBuilderConfigName} 配置对象必须传递 bin 字段`);
    process.exit(1);
  }
  if (!fs.existsSync(config.bin)) {
    printError(`${RdBuilderConfigName} 配置对象传递的 bin 字段目标不存在`);
    process.exit(1);
  }

  if (typeof config.transformers !== 'object') {
    printError(`${RdBuilderConfigName} 配置对象必须传递 transformers 字段`);
    process.exit(1);
  }

  if (typeof config.transformers.transformerMainRspackConfig !== 'function') {
    printError(`${RdBuilderConfigName} 配置对象必须传递 transformerMainRspackConfig 方法`);
    process.exit(1);
  }

  if (typeof config.transformers.transformerSandboxRspackConfig !== 'function') {
    printError(`${RdBuilderConfigName} 配置对象必须传递 transformerSandboxRspackConfig 方法`);
    process.exit(1);
  }

  if (typeof config.transformers.transformerBrowserRsbuildConfig !== 'function') {
    printError(`${RdBuilderConfigName} 配置对象必须传递 transformerBrowserRsbuildConfig 方法`);
    process.exit(1);
  }

  return config;
}

