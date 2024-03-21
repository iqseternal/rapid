
import { Exception } from '@rapid/framework';

export interface ExceptionErrorMsgData {

  label: string;

  time?: number;
}

export class RuntimeException extends Exception<ExceptionErrorMsgData> {}

export class TypeException extends Exception<ExceptionErrorMsgData> {}

export class AsyncException extends Exception<ExceptionErrorMsgData> {}

export class RequestException extends Exception<ExceptionErrorMsgData> {}

export class PermissionException extends Exception<ExceptionErrorMsgData> {}
