
import { Catch, Exception, FrameworkFilter } from '@rapid/framework';

export interface ExceptionErrorMsgData {

  label: string;

  time?: number;
}

export class RuntimeException extends Exception<ExceptionErrorMsgData> {}

export class TypeException extends Exception<ExceptionErrorMsgData> {}

export class AsyncException extends Exception<ExceptionErrorMsgData> {}

export class RequestException extends Exception<ExceptionErrorMsgData> {}

export class PermissionException extends Exception<ExceptionErrorMsgData> {}


@Catch(RuntimeException)
export class RuntimeExceptionFilter extends FrameworkFilter {


  catch(err: RuntimeException): void {

  }

}


@Catch(TypeException)
export class TypeExceptionFilter extends FrameworkFilter {


  catch(err: TypeException): void {

  }

}


@Catch(AsyncException)
export class AsyncExceptionFilter extends FrameworkFilter {


  catch(err: AsyncException): void {

  }

}


@Catch(RequestException)
export class RequestExceptionFilter extends FrameworkFilter {


  catch(err: RequestException): void {

  }

}


@Catch(PermissionException)
export class PermissionExceptionFilter extends FrameworkFilter {


  catch(err: PermissionException): void {

  }

}
