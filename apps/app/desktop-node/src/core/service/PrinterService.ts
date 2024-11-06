import { print, toColor, printClear, toPrintClear, STYLE, keyToAnsi, isPrintStyleMessage, isPrintStyleMessageArr } from '@suey/printer';
import { CONFIG } from '@rapid/config/constants';
import { isString } from '@rapid/libs';

/**
 * 打印的制定信息
 */
export const PrinterMoreInfo = {
  AppName: CONFIG.PROJECT.toUpperCase(),
  Thread: {
    Main: 'MAIN',
    Renderer: 'RENDER'
  },
  PrintType: {
    Info: 'INFO',
    Warn: 'WARN',
    Error: 'ERROR',
    Success: 'SUCCESS',
  }
} as const;

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

  /**
   * 打印
   */
  static print(...message: unknown[]) {
    PrinterService.printInfo(...message);
  }

  /**
   * 打印普通日志信息的样式信息
   */
  static getPrintInfoMessageStyleArr(...message: unknown[]) {
    return [
      toColor(['magenta'], `[${PrinterMoreInfo.AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${PrinterMoreInfo.Thread.Main}]`),
      toColor(['blue', 'underline'], `[${PrinterMoreInfo.PrintType.Info}]${toPrintClear()}:`),
      ...message
    ]
  }

  /**
   * 打印一条普通日志，蓝色
   * @param message
   */
  static printInfo(...message: unknown[]) {
    print(...PrinterService.getPrintInfoMessageStyleArr(...message));
  }

  /**
   * 打印警告日志信息的样式信息
   */
  static getPrintWarnMessageStyleArr(...message: unknown[]) {
    return [
      toColor(['magenta', 'bright'], `[${PrinterMoreInfo.AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${PrinterMoreInfo.Thread.Main}]`),
      toColor(['yellow', 'underline'], `[${PrinterMoreInfo.PrintType.Warn}]${toPrintClear()}:`),
      toColor(['yellow']),
      ...message
    ]
  }

  /**
   * 打印一条警告信息
   * @param message
   */
  static printWarn(...message: unknown[]) {
    print(...PrinterService.getPrintWarnMessageStyleArr(...message));
  }

  /**
   * 打印成功日志信息的样式信息
   */
  static getPrintSuccessMessageStyle(...message: unknown[]) {
    return [
      toColor(['magenta'], `[${PrinterMoreInfo.AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${PrinterMoreInfo.Thread.Main}]`),
      toColor(['green', 'underline'], `[${PrinterMoreInfo.PrintType.Success}]${toPrintClear()}:`),
      toColor(['green']),
     ...message
    ]
  }

  /**
   * 打印一条成功信息
   * @param message
   */
  static printSuccess(...message: unknown[]) {
    print(...PrinterService.getPrintSuccessMessageStyle(...message));
  }

  /**
   * 打印错误日志信息的样式信息
   */
  static getPrintErrorMessageStyleArr(...message: unknown[]) {
    return [
      toColor(['magenta', 'bright'], `[${PrinterMoreInfo.AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${PrinterMoreInfo.Thread.Main}]`),
      toColor(['red', 'underline'], `[${PrinterMoreInfo.PrintType.Error}]${toPrintClear()}:`),
      toColor(['red']),
     ...message
    ]
  }

  /**
   * 打印一条错误信息
   * @param message
   */
  static printError(...message: unknown[]) {
    print(...PrinterService.getPrintErrorMessageStyleArr(...message));
  }
}
