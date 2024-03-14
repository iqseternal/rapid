import type { UserConfig, UserConfigFn, UserConfigSchema } from 'electron-vite';
import type { AliasOptions, Alias } from 'vite';

import * as path from 'path';

export type ConfigEnv = Parameters<UserConfigFn>[0];

export type ConfigFn = (env: ConfigEnv) => UserConfigSchema;

export function defineElectronMainConfig(configFn: (env: ConfigEnv) => UserConfig['main']) {
  return configFn;
}

export function defineElectronPreloadConfig(configFn: (env: ConfigEnv) => UserConfig['preload']) {
  return configFn;
}

export function defineElectronRendererConfig(configFn: (env: ConfigEnv) => UserConfig['renderer']) {
  return configFn;
}

/**
 * 解析 tsconfig paths 为vite的路径别名，实现自动化
 * @param aliasPath
 * @returns
 */
export function resolveAlias(aliasPath: Record<string, string[]>): AliasOptions {
  if (!aliasPath) return [];
  const alias: Alias[] = [];
  for (const key in aliasPath)
    alias.push({ find: key.replace('/*', ''), replacement: path.resolve(__dirname, aliasPath[key][0].replace('/*', '')) });
  return alias;
}
