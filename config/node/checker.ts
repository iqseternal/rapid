import { NodeCommand, NodeEnv, Env } from '../enums';
import { Printer } from '@suey/printer';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: NodeEnv;
      readonly COMMAND: NodeCommand;
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
   * @returns
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
      Printer.printError(`运行脚本前请先设置 COMMAND 环境变量`);
      process.exit(1);
    }

    if (!EnvChecker.COMMANDS.includes(process.env.COMMAND)) {
      Printer.printError(`未定义的 COMMAND 环境变量`);
      process.exit(1);
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
        // @ts-ignore
        process.env.NODE_ENV = NodeEnv.Development;
      }
      else if (process.env.COMMAND === NodeCommand.Build || process.env.COMMAND === NodeCommand.Preview) {
        // @ts-ignore
        process.env.NODE_ENV = NodeEnv.Production;
      }

      return;
    }

    if (process.env.COMMAND === NodeCommand.Dev && process.env.NODE_ENV === NodeEnv.Production) {
      Printer.printError(`错误的环境变量设置, 当前为 ${process.env.COMMAND} 环境, 那么 NODE_ENV 不能为 production`);
      process.exit(1);
    }

    if (
      (process.env.COMMAND === NodeCommand.Build || process.env.COMMAND === NodeCommand.Preview) &&
      process.env.NODE_ENV !== NodeEnv.Production
    ) {
      Printer.printError(`错误的环境变量设置, 当前为 ${process.env.COMMAND} 环境, 那么 NODE_ENV 只能是 production`);
      process.exit(1);
    }
  }
}
