import { RuntimeException } from '@/common/exception';
import { Catch, Logger } from './base';

export class ExceptionFilter {
  catch() {

  }
}

@Catch(RuntimeException)
export class RuntimeExceptionFilter extends ExceptionFilter {

  @Logger.error('asdasdas')
  catch(): void {

  }
}


