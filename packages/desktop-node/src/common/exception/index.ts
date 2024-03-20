
import { Exception } from '@/framework';

export class RuntimeException extends Exception {}

export class TypeException extends Exception {}

export class AsyncException extends Exception {}

export class RequestException extends Exception {}

export class PermissionException extends Exception {}
