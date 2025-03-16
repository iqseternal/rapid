import { join } from 'path';
import { EnvChecker } from './checker';

export * from './index';

/**
 * 注入变量的接口, 用于创建注入变量集合
 */
export type InjectionVariables = {
  readonly IS_DEV: boolean;
  readonly IS_PROD: boolean;
  [key: string]: any;
}

export interface BuilderOptions {
  /**
   * 是否检查和自动校正当前环境变量到运行要求
   *
   * @default true
   */
  readonly checker?: boolean;
}

/**
 * 构建
 */
export class EnvBuilder {
  /**
   * 构造函数, 传递参数 checker 可控制是否自动判断和修正当前环境变量
   *
   */
  public constructor(options?: BuilderOptions) {
    const { checker = true } = options || {};

    if (checker) EnvChecker.checkerAll();
  }

  /**
   * 获得环境的判别常量
   */
  public toEnvs() {
    return EnvChecker.toEnvs();
  }

  /**
   * 创建构建工具别名对象,
   * {
   *    "@": "./src"
   * }
   */
  public defineAlias(basePath: string, paths: Record<string, string[]>) {
    const alias: Record<string, string> = {};

    const aliasMaps: [string, string][] = Object.keys(paths).filter((key) => paths[key].length > 0).map((key) => {
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
  public defineVars<Variables extends InjectionVariables>(variables?: Variables): InjectionVariables {
    const { IS_DEV, IS_PROD } = EnvChecker.toEnvs();

    const vars: InjectionVariables = {
      IS_DEV: IS_DEV,
      IS_PROD: IS_PROD,
      ...(variables ?? {})
    }

    return vars;
  }
}
