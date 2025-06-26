// =======================================================================================
// 运行时声明
import { NodeCommand, NodeEnv } from '../constants';


declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: NodeEnv.Development | NodeEnv.Production;
      COMMAND: NodeCommand.Dev | NodeCommand.Preview | NodeCommand.Build;
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
   * 是否检查过运行有效性
   */
  private static checkedValidity = false;

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
    EnvChecker.checkerRuntimeValidity();
  }

  /**
   * 检查运行脚本是否设置了 COMMAND 环境
   * @returns
   */
  public static checkerRuntimeCommand() {
    if (EnvChecker.checkedCommand) return;

    if (!process.env.COMMAND || process.env.COMMAND.trim() === '') throw new Error('运行脚本前请先设置 COMMAND 环境变量');
    if (!EnvChecker.COMMANDS.includes(process.env.COMMAND)) throw new Error('未定义的 COMMAND 环境变量');

    EnvChecker.checkedCommand = true;
  }

  /**
   * 检查运行脚本是否设置了 NODE_ENV 环境
   * @returns
   */
  public static checkerRuntimeNodeEnv() {
    if (EnvChecker.checkedNodeEnv) return;

    if (!process.env.NODE_ENV) {
      const command = process.env.COMMAND;

      if (command === NodeCommand.Dev) process.env.NODE_ENV = NodeEnv.Development;
      else if (command === NodeCommand.Build || command === NodeCommand.Preview) process.env.NODE_ENV = NodeEnv.Production;
    }

    EnvChecker.checkedNodeEnv = true;
  }

  /**
   * 检查运行时的有效性
   */
  public static checkerRuntimeValidity() {
    if (EnvChecker.checkedValidity) return;

    const command = process.env.COMMAND;
    const nodeEnv = process.env.NODE_ENV;

    if (command === NodeCommand.Dev && nodeEnv === NodeEnv.Production) throw new Error(`错误的环境变量设置, 当前为 ${command} 环境, 那么 NODE_ENV 不能为 production`);
    if ((command === NodeCommand.Build || command === NodeCommand.Preview) && nodeEnv !== NodeEnv.Production) throw new Error(`错误的环境变量设置, 当前为 ${command} 环境, 那么 NODE_ENV 只能是 production`);

    EnvChecker.checkedValidity = true;
  }
}
