import { PlatformsOnDesktop, Env, RuntimePlatforms } from '../enums';
import { join } from 'path';
import { DIRS } from './dirs';
import { EnvChecker } from './checker';

export * from './index';

export interface BuilderOptions {
  checker?: boolean;
}

export class Builder {
  constructor(options?: BuilderOptions) {
    const { checker = true } = options || {};

    if (checker) EnvChecker.checkerAll();
  }

  toEnvs() {
    return EnvChecker.toEnvs();
  }

  defineAlias(basePath: string, paths: Record<`${string}/*`, string[]>) {
    const alias: Record<string, string> = {};

    const aliasMaps: [string, string][] = Object.keys(paths).map(key => {
      return [key.replace(/\/\*$/, ''), join(basePath, paths[key][0].replace('/*', ''))] as const;
    });

    aliasMaps.forEach(([aliasKey, aliasPath]) => {
      alias[aliasKey] = aliasPath;
    })
    return alias;
  }

  defineVars<Variables extends Partial<Omit<InjectionVariables, 'CURRENT_ENV'>>>(variables?: Variables): InjectionVariables {
    const vars: InjectionVariables = {
      CURRENT_PLATFORM: PlatformsOnDesktop.Windows,
      CURRENT_RUNTIME_PLATFORM: RuntimePlatforms.Desktop,
      CURRENT_ENV: Env.Dev,
      ...(variables ?? {})
    }

    const { IS_DEV, IS_PROD } = EnvChecker.toEnvs();
    if (IS_DEV) vars.CURRENT_ENV = Env.Dev;
    if (IS_PROD) vars.CURRENT_ENV = Env.Prod;

    return vars;
  }
}
