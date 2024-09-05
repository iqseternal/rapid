import { PLATFORMS, ENV, CONFIG_ENV_COMMAND, CONFIG_ENV_NODE_ENV } from '../enums';
import { Printer } from '@suey/printer';
import { join } from 'path';
import { DIRS } from './dirs';

export * from './index';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: CONFIG_ENV_NODE_ENV;
      readonly COMMAND: CONFIG_ENV_COMMAND;
    }
  }
}

if (!process.env.COMMAND) {
  Printer.printError(`运行脚本前请先设置 COMMAND 环境变量, (dev | build | preview)`);
  process.exit(1);
}
else {
  if (
    process.env.COMMAND !== CONFIG_ENV_COMMAND.DEV &&
    process.env.COMMAND !== CONFIG_ENV_COMMAND.BUILD &&
    process.env.COMMAND !== CONFIG_ENV_COMMAND.PREVIEW
  ) {
    Printer.printError(`运行脚本 COMMAND 环境变量只能是 (dev | build | preview)`);
    process.exit(1);
  }
}

if (!process.env.NODE_ENV) {
  if (process.env.COMMAND === CONFIG_ENV_COMMAND.DEV) {
    // @ts-ignore
    process.env.NODE_ENV = CONFIG_ENV_NODE_ENV.DEVELOPMENT;
  }
  else if (
    process.env.COMMAND === CONFIG_ENV_COMMAND.BUILD ||
    process.env.COMMAND === CONFIG_ENV_COMMAND.PREVIEW
  ) {
    // @ts-ignore
    process.env.NODE_ENV = CONFIG_ENV_NODE_ENV.PRODUCTION;
  }
}
else {
  if (process.env.COMMAND === CONFIG_ENV_COMMAND.DEV && process.env.NODE_ENV === 'production') {
    Printer.printError(`错误的环境变量设置, 当前为 dev 环境, 那么 NODE_ENV 不能为 production`);
    process.exit(1);
  }

  if (
    (process.env.COMMAND === CONFIG_ENV_COMMAND.BUILD || process.env.COMMAND === CONFIG_ENV_COMMAND.PREVIEW) &&
    process.env.NODE_ENV !== 'production'
  ) {
    Printer.printError(`错误的环境变量设置, 当前为 ${process.env.COMMAND} 环境, 那么 NODE_ENV 只能是 production`);
    process.exit(1);
  }
}

export function defineVars(): InjectionVariables {
  const vars: InjectionVariables = {
    CURRENT_PLATFORM: PLATFORMS.WINDOWS,
    CURRENT_ENV: ENV.DEV
  }

  if (process.env.COMMAND === CONFIG_ENV_COMMAND.DEV) {
    vars.CURRENT_ENV = ENV.DEV;
  }
  else if (
    process.env.COMMAND === CONFIG_ENV_COMMAND.BUILD ||
    process.env.COMMAND === CONFIG_ENV_COMMAND.PREVIEW
  ) {
    vars.CURRENT_ENV = ENV.PROD;
  }

  return vars;
}

