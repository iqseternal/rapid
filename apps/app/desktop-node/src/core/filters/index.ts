import { Catch, Exception, FrameworkFilter } from '@rapid/framework';
import { RuntimeException, TypeException, AsyncException, RequestException, PermissionException } from '../exceptions';
import { PrinterService } from '@/service/PrinterService';

@Catch(RuntimeException)
export class RuntimeExceptionFilter extends FrameworkFilter {
  catch(err: RuntimeException): void {
    if (err.errMsgData.level) {
      switch (err.errMsgData.level) {
        case 'info':
          PrinterService.printInfo('RuntimeException ==>', err.errMsgData.label, err.stack);
          break;
        case 'warning':
          PrinterService.printWarn('RuntimeException ==>', err.errMsgData.label, err.stack);
          break;
        case 'error':
          PrinterService.printError('RuntimeException ==>', err.errMsgData.label, err.stack);
          break;
      }

      return;
    }

    PrinterService.printError('RuntimeException ==>', err.errMsgData.label, err.stack);
  }
}


@Catch(TypeException)
export class TypeExceptionFilter extends FrameworkFilter {


  catch(err: TypeException): void {
    if (err.errMsgData.level) {
      switch (err.errMsgData.level) {
        case 'info':
          PrinterService.printInfo('TypeException ==>', err.errMsgData.label, err.stack);
          break;
        case 'warning':
          PrinterService.printWarn('TypeException ==>', err.errMsgData.label, err.stack);
          break;
        case 'error':
          PrinterService.printError('TypeException ==>', err.errMsgData.label, err.stack);
          break;
      }
      return;
    }

    PrinterService.printError('TypeException ==>', err.errMsgData.label, err.stack);
  }

}


@Catch(AsyncException)
export class AsyncExceptionFilter extends FrameworkFilter {


  catch(err: AsyncException): void {
    if (err.errMsgData.level) {
      switch (err.errMsgData.level) {
        case 'info':
          PrinterService.printInfo('AsyncException ==>', err.errMsgData.label, err.stack);
          break;
        case 'warning':
          PrinterService.printWarn('AsyncException ==>', err.errMsgData.label, err.stack);
          break;
        case 'error':
          PrinterService.printError('AsyncException ==>', err.errMsgData.label, err.stack);
          break;
      }
      return;
    }

    PrinterService.printError('AsyncException ==>', err.errMsgData.label, err.stack);
  }

}


@Catch(RequestException)
export class RequestExceptionFilter extends FrameworkFilter {

  catch(err: RequestException): void {

    if (err.errMsgData.level) {
      switch (err.errMsgData.level) {
        case 'info':
          PrinterService.printInfo('RequestException ==>', err.errMsgData.label, err.stack);
          break;
        case 'warning':
          PrinterService.printWarn('RequestException ==>', err.errMsgData.label, err.stack);
          break;
        case 'error':
          PrinterService.printError('RequestException ==>', err.errMsgData.label, err.stack);
          break;
      }
      return;
    }

    PrinterService.printError('RequestException ==>', err.errMsgData.label, err.stack);
  }

}


@Catch(PermissionException)
export class PermissionExceptionFilter extends FrameworkFilter {


  catch(err: PermissionException): void {
    if (err.errMsgData.level) {
      switch (err.errMsgData.level) {
        case 'info':
          PrinterService.printInfo('PermissionException ==>', err.errMsgData.label, err.stack);
          break;
        case 'warning':
          PrinterService.printWarn('PermissionException ==>', err.errMsgData.label, err.stack);
          break;
        case 'error':
          PrinterService.printError('PermissionException ==>', err.errMsgData.label, err.stack);
          break;
      }
      return;
    }


    PrinterService.printError('PermissionException ==>', err.errMsgData.label, err.stack);
  }

}
