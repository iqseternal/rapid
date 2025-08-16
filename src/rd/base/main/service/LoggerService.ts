import { Ansi } from '@suey/pkg-utils';

export namespace LoggerService {

  export interface ReadLogAsLocalOptions {

    pieces: number;
  }
}

/**
 * 日志服务
 */
export class LoggerService {
  private static readonly logService = new LoggerService('/base.log');

  public constructor(filename: string) {

  }

  /**
   * 打印普通日志
   */
  public async info(...message: any[]) {
    Ansi.print(...message);
  }

  public static async info(...message: any[]) {
    await LoggerService.logService.info(...message);
  }

  /**
   * 打印警告日志
   */
  public async warn(...message: any[]) {
    Ansi.print(...message);
  }

  public static async warn(...message: any[]) {
    await LoggerService.logService.warn(...message);
  }

  /**
   * 打印成功日志
   */
  public async success(...message: any[]) {
    Ansi.print(...message);
  }

  public static async success(...message: any[]) {
    await LoggerService.logService.success(...message);
  }

  /**
   * 打印错误日志
   */
  public async error(...message: any[]) {
    Ansi.print(...message);
  }

  public static async error(...message: any[]) {
    await LoggerService.logService.error(...message);
  }
}

export const Logger = LoggerService;

export const fileLogger = new LoggerService('/file.log');

export const netLogger = new LoggerService('/net.log');

export const ipcLogger = new LoggerService('/ipc.log');


