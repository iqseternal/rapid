import { print, toColor, printClear, toPrintClear, STYLE, keyToAnsi, isPrintStyleMessage, isPrintStyleMessageArr } from '@suey/printer';
import { CONFIG } from '@rapid/config/constants';
import { isString } from '@rapid/libs';

/**
 * 对打印信息进行解析, 因为打印信息中包含了对控制台色彩的控制, 可能有需要对色彩进行剔除存储的需求
 * @returns
 */
export const printMessageParser = (...messages: unknown[]) => {
  const normalMessages: string[] = messages.map((message, index) => {
    if (isPrintStyleMessageArr(message)) {
      // 在打印中, 打印类型 [INFO] 存在下划线延长, 需要清除样式, 所以需要剔除 NORMAL 信息
      if (index === 3 && isString(message.data[1])) return message.data[1].replace(keyToAnsi[STYLE.NORMAL], '');
      return message.data[1];
    }
    if (isPrintStyleMessage(message)) message = message.data;
    if (typeof message === 'object') message = JSON.stringify(message);

    return message as string;
  }) as unknown as string[];

  return { normalMessages, messages };
}

/**
 * 信息打印服务
 */
export class PrinterService {
  private static readonly PrintType = {
    Info: 'INFO',
    Warn: 'WARN',
    Error: 'ERROR',
    Success: 'SUCCESS',
  } as const;

  /**
   * 主进程打印器
   */
  private static readonly instance: PrinterService = new PrinterService(
    CONFIG.PROJECT.toUpperCase(),
    'MAIN'
  );

  public constructor(
    public readonly AppName: string,
    public readonly Thread: 'MAIN' | 'RENDER' | 'PRELOAD'
  ) {}

  /**
   * 打印
   */
  public print(...message: unknown[]) {
    print(...this.getPrintInfoMessageStyleArr(...message));
  }

  /**
   * 打印
   */
  public static print(...message: unknown[]) {
    PrinterService.instance.print(...message);
  }

  /**
   * 打印普通日志信息的样式信息
   */
  public getPrintInfoMessageStyleArr(...message: unknown[]) {
    return [
      toColor(['magenta'], `[${this.AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${this.Thread}]`),
      toColor(['blue', 'underline'], `[${PrinterService.PrintType.Info}]${toPrintClear()}:`),
      ...message
    ];
  }

  /**
   * 打印普通日志信息的样式信息
   */
  public static getPrintInfoMessageStyleArr(...message: unknown[]) {
    return PrinterService.instance.getPrintInfoMessageStyleArr(...message);
  }

  public printInfo(...message: unknown[]) {
    print(...this.getPrintInfoMessageStyleArr(...message));
  }

  /**
   * 打印一条普通日志，蓝色
   * @param message
   */
  public static printInfo(...message: unknown[]) {
    print(...PrinterService.instance.getPrintInfoMessageStyleArr(...message));
  }

  /**
   * 打印警告日志信息的样式信息
   */
  public getPrintWarnMessageStyleArr(...message: unknown[]) {
    return [
      toColor(['magenta', 'bright'], `[${this.AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${this.Thread}]`),
      toColor(['yellow', 'underline'], `[${PrinterService.PrintType.Warn}]${toPrintClear()}:`),
      toColor(['yellow']),
      ...message
    ];
  }

  /**
   * 打印警告日志信息的样式信息
   */
  public static getPrintWarnMessageStyleArr(...message: unknown[]) {
    return PrinterService.instance.getPrintWarnMessageStyleArr(...message);
  }

  /**
   * 打印一条警告信息
   */
  public printWarn(...message: unknown[]) {
    print(...this.getPrintWarnMessageStyleArr(...message));
  }

  /**
   * 打印一条警告信息
   * @param message
   */
  public static printWarn(...message: unknown[]) {
    print(...PrinterService.instance.getPrintWarnMessageStyleArr(...message));
  }

  /**
   * 打印成功日志信息的样式信息
   */
  public getPrintSuccessMessageStyleArr(...message: unknown[]) {
    return [
      toColor(['magenta'], `[${this.AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${this.Thread}]`),
      toColor(['green', 'underline'], `[${PrinterService.PrintType.Success}]${toPrintClear()}:`),
      toColor(['green']),
     ...message
    ]
  }

  /**
   * 打印成功日志信息的样式信息
   */
  public static getPrintSuccessMessageStyleArr(...message: unknown[]) {
    return PrinterService.instance.getPrintSuccessMessageStyleArr(...message);
  }

  /**
   * 打印一条成功信息
   * @param message
   */
  public printSuccess(...message: unknown[]) {
    print(...this.getPrintSuccessMessageStyleArr(...message));
  }

  /**
   * 打印一条成功信息
   * @param message
   */
  public static printSuccess(...message: unknown[]) {
    print(...PrinterService.instance.getPrintSuccessMessageStyleArr(...message));
  }

  /**
   * 打印错误日志信息的样式信息
   */
  public getPrintErrorMessageStyleArr(...message: unknown[]) {
    return [
      toColor(['magenta', 'bright'], `[${this.AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${this.Thread}]`),
      toColor(['red', 'underline'], `[${PrinterService.PrintType.Error}]${toPrintClear()}:`),
      toColor(['red']),
     ...message
    ]
  }

  /**
   * 打印错误日志信息的样式信息
   */
  public static getPrintErrorMessageStyleArr(...message: unknown[]) {
    return PrinterService.instance.getPrintErrorMessageStyleArr(...message);
  }

  /**
   * 打印一条错误信息
   * @param message
   */
  public printError(...message: unknown[]) {
    print(...this.getPrintErrorMessageStyleArr(...message));
  }

  /**
   * 打印一条错误信息
   * @param message
   */
  public static printError(...message: unknown[]) {
    print(...PrinterService.instance.getPrintErrorMessageStyleArr(...message));
  }
}
