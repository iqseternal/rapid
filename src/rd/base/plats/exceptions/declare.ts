import { PrinterService } from 'rd/base/common/service/PrinterService';

/**
 * 产生自定义异常时，所需要携带的参数类型，可以做日志操作等等
 */
export interface ExceptionErrorMsgData {
  /**
   * 异常标签, 通常用于打印服务
   */
  readonly label: string;

  /**
   * 异常等级
   */
  readonly level: 'ERROR' | 'SUCCESS' | 'INFO' | 'WARN';

  /**
   * 异常产生时间
   */
  readonly time: number;

  readonly other: Record<string, any>;
}

/**
 * 异常基类
 */
export abstract class Exception<ErrMessageData extends ExceptionErrorMsgData> {
  public readonly errMessage: ErrMessageData;

  public constructor(public message: string, errMessage?: Pick<Partial<ErrMessageData>, 'level' | 'label'>) {
    const { label = 'GLOBAL', level = 'ERROR' } = errMessage ?? {};

    if (IS_DEV) {
      if (label.startsWith('<') && label.endsWith('>')) {
        PrinterService.printWarn(`Exception label属性传递不应该被 <> 包裹`);
      }
    }

    this.errMessage = {
      label: `<${label.trim()}>`,
      level,
      time: Date.now(),
      other: {}
    } as ErrMessageData;
  }
}

/**
* 判断目标是否一个自定义异常
*/
export const isException = <Error>(exp: Error | Exception<any>): exp is Exception<any> => exp instanceof Exception;

/**
* 异常捕捉器
*/
export abstract class ExceptionFilter {

  /**
   * 无参构造函数
   */
  public constructor() {}

  /**
   * 处理异常地回调函数
   * @param exp
   */
  public abstract catch(exp: Exception<any>): void | Promise<void>;
}
