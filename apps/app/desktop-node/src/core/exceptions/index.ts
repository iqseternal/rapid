
import { Exception } from '@rapid/framework';

/**
 * 产生自定义异常时，所需要携带的参数类型，可以做日志操作等等
 */
export interface ExceptionErrorMsgData {

  label: string;

  level: 'error' | 'warning' | 'info';

  time: number;
}

/**
 * 运行时异常
 * 例如：
 * 运行时数据不符合预期
 */
export class RuntimeException extends Exception<Partial<ExceptionErrorMsgData>> {}

/**
 * 类型异常
 * 例如：
 * 传递参数不符合当前函数的预期
 */
export class TypeException extends Exception<Partial<ExceptionErrorMsgData>> {}

/** 异步异常 */
export class AsyncException extends Exception<Partial<ExceptionErrorMsgData>> {}

/** 请求异常 */
export class RequestException extends Exception<Partial<ExceptionErrorMsgData>> {}

/**
 * 权限异常
 * 例如：
 * ipc 请求状态不正确，在运行时想要打开开发时才拥有的功能
 * 访问了没有权限的资源
 * 等等。
 */
export class PermissionException extends Exception<Partial<ExceptionErrorMsgData>> {}

