import * as path from 'path';
import * as config from './tsconfig.json';

import type { AliasOptions, Alias, ProxyOptions } from 'vite';
import { loadEnv } from 'vite';

const aliasPath: Record<string, any> = config.compilerOptions.paths;

export const alias = ((): AliasOptions => {
  const alias: Alias[] = []

  for (const key in aliasPath) {
    alias.push({
      find: key.replace('/*', ''),
      replacement: path.join(__dirname, aliasPath[key][0].replace('/*', ''))
    })
  }
  return alias
})();

export const proxy = (mode: string): Record<string, string | ProxyOptions> => {
  const env = loadEnv(mode, __dirname, ['OUPRO_', 'VITE_']);

  return {
    [env.OUPRO_API_BASE_URL]: {
      target: env.OUPRO_API_TARGET_UTL,
      ws: true,
      secure: true,
      changeOrigin: true,
      rewrite: path => path.replace(env.OUPRO_API_BASE_URL, '')
    }
  }
};
