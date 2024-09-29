import { CONFIG_ENV_COMMAND, CONFIG_ENV_NODE_ENV, ENV } from '../enums';
import { Printer } from '@suey/printer';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: CONFIG_ENV_NODE_ENV;
      readonly COMMAND: CONFIG_ENV_COMMAND;
    }
  }
}

export class EnvChecker {
  private static COMMANDS = [CONFIG_ENV_COMMAND.DEV, CONFIG_ENV_COMMAND.BUILD, CONFIG_ENV_COMMAND.PREVIEW];

  private static checkedCommand = false;
  private static checkedNodeEnv = false;

  /**
   * 获取运行环境
   * @returns
   */
  public static toEnvs() {
    const IS_DEV = process.env.NODE_ENV === CONFIG_ENV_NODE_ENV.DEVELOPMENT;
    const IS_PROD = process.env.NODE_ENV === CONFIG_ENV_NODE_ENV.PRODUCTION;

    const IS_BUILD = process.env.COMMAND === CONFIG_ENV_COMMAND.BUILD;
    const IS_PREVIEW = process.env.COMMAND === CONFIG_ENV_COMMAND.PREVIEW;

    return {
      IS_DEV,
      IS_PROD,
      IS_BUILD,
      IS_PREVIEW
    };
  }

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
      // @ts-ignore
      if (process.env.COMMAND === CONFIG_ENV_COMMAND.DEV) process.env.NODE_ENV = CONFIG_ENV_NODE_ENV.DEVELOPMENT;
      else if (process.env.COMMAND === CONFIG_ENV_COMMAND.BUILD || process.env.COMMAND === CONFIG_ENV_COMMAND.PREVIEW) {
        // @ts-ignore
        process.env.NODE_ENV = CONFIG_ENV_NODE_ENV.PRODUCTION;
      }

      return;
    }

    if (process.env.COMMAND === CONFIG_ENV_COMMAND.DEV && process.env.NODE_ENV === CONFIG_ENV_NODE_ENV.PRODUCTION) {
      Printer.printError(`错误的环境变量设置, 当前为 ${process.env.COMMAND} 环境, 那么 NODE_ENV 不能为 production`);
      process.exit(1);
    }

    if (
      (process.env.COMMAND === CONFIG_ENV_COMMAND.BUILD || process.env.COMMAND === CONFIG_ENV_COMMAND.PREVIEW) &&
      process.env.NODE_ENV !== CONFIG_ENV_NODE_ENV.PRODUCTION
    ) {
      Printer.printError(`错误的环境变量设置, 当前为 ${process.env.COMMAND} 环境, 那么 NODE_ENV 只能是 production`);
      process.exit(1);
    }
  }
}
