import { PlatformsOnDesktop, Env, RuntimePlatforms } from '../enums';
import { join } from 'path';
import { DIRS } from './dirs';
import { EnvChecker } from './checker';

export * from './index';

export interface BuilderOptions {
  /**
   * 是否检查和自动校正当前环境变量到运行要求
   */
  checker?: boolean;
}

/**
 * 构建
 */
export class EnvBuilder {
  /**
   * 构造函数, 传递参数 checker 可控制是否自动判断和修正当前环境变量
   *
   */
  constructor(options?: BuilderOptions) {
    const { checker = true } = options || {};

    if (checker) EnvChecker.checkerAll();
  }

  /**
   * 获得环境的判别常量
   */
  toEnvs() {
    return EnvChecker.toEnvs();
  }

  /**
   * 创建构建工具别名对象,
   * {
   *    "@": "./src"
   * }
   */
  defineAlias(basePath: string, paths: Record<`${string}/*`, string[]>) {
    const alias: Record<string, string> = {};

    const aliasMaps: [string, string][] = Object.keys(paths).map((key: `${string}/*`) => {
      return [key.replace(/\/\*$/, ''), join(basePath, paths[key][0].replace('/*', ''))] as const;
    });

    aliasMaps.forEach(([aliasKey, aliasPath]) => {
      alias[aliasKey] = aliasPath;
    })
    return alias;
  }

  /**
   * 为构建项目注入变量: 可以做到环境判别作用
   *
   * @example
   * const IS_DEV = CURRENT_ENV === Env.Dev;
   */
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
