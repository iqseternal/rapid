import { print, toColor, toPrintClear, isPrintStyleMessage, isPrintStyleMessageArr, STYLE, keyToAnsi } from '@suey/printer';
import { SingleInstanceService } from './SingleInstanceService';
import { FileService } from './FileService';
import { AppFileStorageService, logsDirStorageService } from './AppStorageService';
import { PrinterService, printMessageParser, PrinterMoreInfo } from './PrinterService';

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

  private readonly logFileStorageService: AppFileStorageService;

  constructor(filename: string) {
    this.logFileStorageService = logsDirStorageService.createFileService(filename);
  }

  /**
   * 打印本地日志
   */
  public async printLogAsLocal(...message: readonly any[]) {
    const { normalMessages } = printMessageParser(...message);
    await FileService.appendToFile(this.logFileStorageService.filePath, normalMessages.join(' ').concat('\n'));
  }

  public static async printLogAsLocal(...message: readonly any[]) {
    await LoggerService.logService.printLogAsLocal(...message);
  }

  /**
   * 获取本地日志
   */
  public readLogAsLocal(options: LoggerService.ReadLogAsLocalOptions) {
    const { pieces } = options;

    // TODO: 读取几行日志并解析返回
  }

  public static readLogAsLocal(options: LoggerService.ReadLogAsLocalOptions) {
    return LoggerService.logService.readLogAsLocal(options);
  }

  /**
   * 打印普通日志
   */
  public async info(...message: any[]) {
    const infoMessage = PrinterService.getPrintInfoMessageStyleArr(...message);
    print(...infoMessage);
    await this.printLogAsLocal(...infoMessage);
  }

  public static async info(...message: any[]) {
    await LoggerService.logService.info(...message);
  }

  /**
   * 打印警告日志
   */
  public async warn(...message: any[]) {
    const warnMessage = PrinterService.getPrintInfoMessageStyleArr(...message);
    print(...warnMessage);
    await this.printLogAsLocal(...warnMessage);
  }

  public static async warn(...message: any[]) {
    await LoggerService.logService.warn(...message);
  }

  /**
   * 打印成功日志
   */
  public async success(...message: any[]) {
    const successMessage = PrinterService.getPrintSuccessMessageStyle(...message);
    print(...successMessage);
    await this.printLogAsLocal(...successMessage);
  }

  public static async success(...message: any[]) {
    await LoggerService.logService.success(...message);
  }

  /**
   * 打印错误日志
   */
  public async error(...message: any[]) {
    const errorMessage = PrinterService.getPrintErrorMessageStyleArr(...message);
    print(...errorMessage);
    await this.printLogAsLocal(...errorMessage);
  }

  public static async error(...message: any[]) {
    await LoggerService.logService.error(...message);
  }
}

export const Logger = LoggerService;

export const fileLogger = new LoggerService('/file.log');

export const netLogger = new LoggerService('/net.log');

export const ipcLogger = new LoggerService('/ipc.log');


