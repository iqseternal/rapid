
import { resolve, join } from 'path';
import { OUT_DESKTOP_MAIN_DIR } from '../packages/config/dirs';
import { PLATFORMS, ENV, CONFIG_ENV_MODE } from '../target.config';
import { mode, command, IS_DEV, IS_PROD } from './env';



export const resolveAlias = (basePath: string, aliasPath: Record<string, string[]>) => {
  const alias: Record<string, string> = {};

  for (const key in aliasPath) {
    alias[key.replace('/*', '')] = resolve(basePath, aliasPath[key][0].replace('/*', ''));
  }

  return alias;
}

export const defineVars = () => {
  const vars = {
    CURRENT_PLATFORM: PLATFORMS.WINDOWS,
    CURRENT_ENV: ENV.DEV
  }

  if (mode === CONFIG_ENV_MODE.DEVELOPMENT) vars.CURRENT_ENV = ENV.DEV;
  else if (mode === CONFIG_ENV_MODE.PRODUCTION) vars.CURRENT_ENV = ENV.PROD;

  return vars;
}
