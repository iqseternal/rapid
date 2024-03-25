import { Catch, Exception, FrameworkFilter } from '@rapid/framework';
import { RuntimeException, TypeException, AsyncException, RequestException, PermissionException } from '../exceptions';

@Catch(RuntimeException)
export class RuntimeExceptionFilter extends FrameworkFilter {
  catch(err: RuntimeException): void {

    console.log('111');
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
