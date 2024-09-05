
import { join } from 'path';

export { default as DIRS } from './dirs';
export { PLATFORMS, ENV, CONFIG_ENV_COMMAND, CONFIG_ENV_NODE_ENV } from '../enums';

export * as rules from './rules';

export const resolveAlias = (basePath: string, aliasPath: Record<string, string[]>) => {
  const alias: Record<string, string> = {};

  for (const key in aliasPath) {
    alias[key.replace('/*', '')] = join(basePath, aliasPath[key][0].replace('/*', ''));
  }

  return alias;
}
