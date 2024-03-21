import { Catch, Exception, FrameworkFilter } from '@rapid/framework';
import { RuntimeException } from '../exception';

@Catch(RuntimeException)
export class RuntimeExceptionFilter extends FrameworkFilter {


  catch(err: RuntimeException): void {

  }

}
