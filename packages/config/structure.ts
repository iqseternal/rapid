import type { UserConfig, ElectronViteConfigFnObject } from 'electron-vite';
import type { AliasOptions, Alias } from 'vite';
import { mergeConfig } from 'vite';

import * as path from 'path';

export type ConfigEnv = Parameters<ElectronViteConfigFnObject>[0];
export type ConfigFn = ElectronViteConfigFnObject;

export type MainConfig = Required<UserConfig>['main'];
export type PreloadConfig = Required<UserConfig>['preload'];
export type RendererConfig = Required<UserConfig>['renderer'];

export function defineElectronMainConfig(configFn: (env: ConfigEnv) => MainConfig) {
  return configFn;
}

export function defineElectronPreloadConfig(configFn: (env: ConfigEnv) => PreloadConfig) {
  return configFn;
}

export function defineElectronRendererConfig(configFn: (env: ConfigEnv) => RendererConfig) {
  return configFn;
}

/**
 * 解析 tsconfig paths 为vite的路径别名，实现自动化
 * @param basePath
 * @param aliasPath
 * @returns
 */
export function resolveAlias(basePath: string, aliasPath: Record<string, string[]>) {
  const alias: Record<string, string> = {};

  for (const key in aliasPath) {
    alias[key.replace('/*', '')] = path.resolve(basePath, aliasPath[key][0].replace('/*', ''));
  }

  return alias;


  // if (!aliasPath) return [];
  // const alias: Alias[] = [];
  // for (const key in aliasPath)
  //   alias.push({ find: key.replace('/*', ''), replacement: path.resolve(basePath, aliasPath[key][0].replace('/*', '')) });
  // return alias;
}

