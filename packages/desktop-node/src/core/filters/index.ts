import { Catch, Exception, FrameworkFilter } from '@rapid/framework';
import { RuntimeException, TypeException, AsyncException, RequestException, PermissionException } from '../exceptions';
import { PrinterService } from '@/service/PrinterService';

@Catch(RuntimeException)
export class RuntimeExceptionFilter extends FrameworkFilter {
  catch(err: RuntimeException): void {

    PrinterService.printError('RuntimeException ==>', err.errMsgData.label, err.stack);
  }
}


@Catch(TypeException)
export class TypeExceptionFilter extends FrameworkFilter {


  catch(err: TypeException): void {
    PrinterService.printError('TypeException ==>', err.stack);
  }

}


@Catch(AsyncException)
export class AsyncExceptionFilter extends FrameworkFilter {


  catch(err: AsyncException): void {
    PrinterService.printError('AsyncException ==>', err.stack);
  }

}


@Catch(RequestException)
export class RequestExceptionFilter extends FrameworkFilter {


  catch(err: RequestException): void {
    PrinterService.printError('RequestException ==>', err.stack);
  }

}


@Catch(PermissionException)
export class PermissionExceptionFilter extends FrameworkFilter {


  catch(err: PermissionException): void {
    PrinterService.printError('PermissionException ==>', err.stack);
  }

}
