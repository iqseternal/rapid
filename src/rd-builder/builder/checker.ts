import { NodeCommand, NodeEnv, Env } from './enums';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnv;
      COMMAND: NodeCommand;
    }
  }
}

/**
 * 环境检查器
 */
export class EnvChecker {
  private static COMMANDS = [NodeCommand.Dev, NodeCommand.Build, NodeCommand.Preview];

  /**
   * 是否检查过运行脚本
   */
  private static checkedCommand = false;

  /**
   * 是否检查过运行环境
   */
  private static checkedNodeEnv = false;

  /**
   * 获取运行环境
   * @example
   *
   * const { IS_DEV, IS_PROD, IS_BUILD, IS_PRIVATE } = EnvChecker.toEnvs();
   */
  public static toEnvs() {
    const IS_DEV = process.env.NODE_ENV === NodeEnv.Development;
    const IS_PROD = process.env.NODE_ENV === NodeEnv.Production;

    const IS_BUILD = process.env.COMMAND === NodeCommand.Build;
    const IS_PREVIEW = process.env.COMMAND === NodeCommand.Preview;

    return {
      IS_DEV,
      IS_PROD,
      IS_BUILD,
      IS_PREVIEW
    } as const;
  }

  /**
   * 检查所有运行环境
   */
  public static checkerAll() {
    EnvChecker.checkerRuntimeCommand();
    EnvChecker.checkerRuntimeNodeEnv();
  }

  /**
   * 检查运行脚本是否设置了 COMMAND 环境
   * @returns
   */
  public static checkerRuntimeCommand() {
    if (EnvChecker.checkedCommand) return;
    EnvChecker.checkedCommand = true;

    if (!process.env.COMMAND) {
      throw new Error('运行脚本前请先设置 COMMAND 环境变量');
    }

    if (!EnvChecker.COMMANDS.includes(process.env.COMMAND)) {
      throw new Error('未定义的 COMMAND 环境变量');
    }
  }

  /**
   * 检查运行脚本是否设置了 NODE_ENV 环境
   * @returns
   */
  public static checkerRuntimeNodeEnv() {
    if (EnvChecker.checkedNodeEnv) return;
    EnvChecker.checkedNodeEnv = true;

    if (!process.env.NODE_ENV) {

      if (process.env.COMMAND === NodeCommand.Dev) {
        process.env.NODE_ENV = NodeEnv.Development;
      }
      else if (process.env.COMMAND === NodeCommand.Build || process.env.COMMAND === NodeCommand.Preview) {
        process.env.NODE_ENV = NodeEnv.Production;
      }

      return;
    }

    if (process.env.COMMAND === NodeCommand.Dev && process.env.NODE_ENV === NodeEnv.Production) {
      throw new Error(`错误的环境变量设置, 当前为 ${process.env.COMMAND} 环境, 那么 NODE_ENV 不能为 production`);
    }

    if (
      (process.env.COMMAND === NodeCommand.Build || process.env.COMMAND === NodeCommand.Preview) &&
      process.env.NODE_ENV !== NodeEnv.Production
    ) {
      throw new Error(`错误的环境变量设置, 当前为 ${process.env.COMMAND} 环境, 那么 NODE_ENV 只能是 production`);
    }
  }
}
