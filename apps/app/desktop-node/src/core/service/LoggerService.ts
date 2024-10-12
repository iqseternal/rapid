import { CONFIG } from '@rapid/config/constants';
import { print, toColor, toPrintClear, isPrintStyleMessage, isPrintStyleMessageArr, STYLE, keyToAnsi } from '@suey/printer';
import { SingleInstanceService } from './SingleInstanceService';
import { FileService } from './FileService';
import { AppFileStorageService, logsDirStorageService } from './AppStorageService';
import { PrinterService, printMessageParser, Thread, PrintType } from './PrinterService';

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
  printLogAsLocal(...message: readonly any[]) {
    const { normalMessages } = printMessageParser(...message);

    FileService.appendToFile(this.logFileStorageService.filePath, normalMessages.join(' ').concat('\n'));
  }

  static printLogAsLocal(...message: readonly any[]) {
    LoggerService.logService.printLogAsLocal(...message);
  }

  /**
   * 获取本地日志
   */
  readLogAsLocal(options: LoggerService.ReadLogAsLocalOptions) {
    const { pieces } = options;

    // TODO: 读取几行日志并解析返回
  }

  static readLogAsLocal(options: LoggerService.ReadLogAsLocalOptions) {
    return LoggerService.logService.readLogAsLocal(options);
  }

  /**
   * 打印普通日志
   */
  info(...message: any[]) {
    const infoMessage = PrinterService.getPrintInfoMessageStyleArr(...message);
    print(...infoMessage);
    this.printLogAsLocal(...infoMessage);
  }

  static info(...message: any[]) {
    LoggerService.logService.info(...message);
  }

  /**
   * 打印警告日志
   */
  warn(...message: any[]) {
    const warnMessage = PrinterService.getPrintInfoMessageStyleArr(...message);
    print(...warnMessage);
    this.printLogAsLocal(...warnMessage);
  }

  static warn(...message: any[]) {
    LoggerService.logService.warn(...message);
  }

  /**
   * 打印成功日志
   */
  success(...message: any[]) {
    const successMessage = PrinterService.getPrintSuccessMessageStyle(...message);
    print(...successMessage);
    this.printLogAsLocal(...successMessage);
  }

  static success(...message: any[]) {
    LoggerService.logService.success(...message);
  }

  /**
   * 打印错误日志
   */
  error(...message: any[]) {
    const errorMessage = PrinterService.getPrintErrorMessageStyleArr(...message);
    print(...errorMessage);
    this.printLogAsLocal(...errorMessage);
  }

  static error(...message: any[]) {
    LoggerService.logService.error(...message);
  }
}

export const Logger = LoggerService;

export const fileLogger = new LoggerService('/file.log');

export const netLogger = new LoggerService('/net.log');

export const ipcLogger = new LoggerService('/ipc.log');


