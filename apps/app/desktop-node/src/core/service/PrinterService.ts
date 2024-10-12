import { print, toColor, printClear, toPrintClear, STYLE, keyToAnsi, isPrintStyleMessage, isPrintStyleMessageArr } from '@suey/printer';
import { CONFIG } from '@rapid/config/constants';
import { isString } from '@suey/pkg-utils';

const AppName = CONFIG.PROJECT.toUpperCase();

export enum Thread {
  Main = 'MAIN',
  Renderer = 'RENDER'
}

export enum PrintType {
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
  Success = 'SUCCESS'
}

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

  static print(...message: unknown[]) {
    PrinterService.printInfo(...message);
  }


  static getPrintInfoMessageStyleArr(...message: unknown[]) {
    return [
      toColor(['magenta'], `[${AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${Thread.Main}]`),
      toColor(['blue', 'underline'], `[${PrintType.Info}]${toPrintClear()}:`),
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


  static getPrintWarnMessageStyleArr(...message: unknown[]) {
    return [
      toColor(['magenta', 'bright'], `[${AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${Thread.Main}]`),
      toColor(['yellow', 'underline'], `[${PrintType.Warn}]${toPrintClear()}:`),
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


  static getPrintSuccessMessageStyle(...message: unknown[]) {
    return [
      toColor(['magenta'], `[${AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${Thread.Main}]`),
      toColor(['green', 'underline'], `[${PrintType.Success}]${toPrintClear()}:`),
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

  static getPrintErrorMessageStyleArr(...message: unknown[]) {
    return [
      toColor(['magenta', 'bright'], `[${AppName}]`),
      toColor(['cyan', 'bright'], `[${new Date().toLocaleString()}]`),
      toColor(['cyan', 'bright'], `[${Thread.Main}]`),
      toColor(['red', 'underline'], `[${PrintType.Error}]${toPrintClear()}:`),
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
