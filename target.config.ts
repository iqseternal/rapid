import type { ConfigEnv, MainConfig, PreloadConfig, RendererConfig } from './packages/config/structure';
import type { DefinePluginOptions } from '@rspack/core';

export enum PLATFORMS { WINDOWS, LINUX, MAC, WEB }

export enum ENV { DEV, PROD }

export enum CONFIG_ENV_MODE {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export enum CONFIG_ENV_COMMAND {
  DEV = 'dev',
  BUILD = 'build'
}

export function defineVars({ mode }: { mode: string;command: string; }) {
  const vars = {
    CURRENT_PLATFORM: PLATFORMS.WINDOWS,
    CURRENT_ENV: ENV.DEV
  }

  if (mode === CONFIG_ENV_MODE.DEVELOPMENT) vars.CURRENT_ENV = ENV.DEV;
  else if (mode === CONFIG_ENV_MODE.PRODUCTION) vars.CURRENT_ENV = ENV.PROD;

  return vars;
}
