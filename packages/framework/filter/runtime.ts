
import { IS_DEV } from '@rapid/config/constants';
import type { SetupOptions, DescendantClass } from '../core';
import { Printer } from '../core';
import { Exception } from '../exception';

import { Catch, FILTER_META_CATCH } from './decorator';

@Catch(Exception)
export class FrameworkFilter {
  catch(err: Exception) {

  }
}

export interface SetupFilterOptions<T extends DescendantClass<FrameworkFilter>> extends Omit<SetupOptions<never, T>, 'use'> {

}

export const runtimeContext = {
  modules: [] as {
    filter: FrameworkFilter;
    Exception: DescendantClass<Exception>
  }[]
}

export const setupFilters = async <T extends DescendantClass<FrameworkFilter>>(options: SetupFilterOptions<T>) => {
  const { modules } = options;

  if (IS_DEV) {
    if (!Array.isArray(modules)) {
      Printer.printError(`\`modules\` value must be a array of IpcMainHandler.`);
      return;
    }
  }

  modules.forEach(Filter => {
    const filter = new Filter();

    const Exception = Reflect.getMetadata(FILTER_META_CATCH, filter.constructor);

    if (!Exception) {
      if (IS_DEV) Printer.printError(`Catch decorator must receive an Exception.`);
      return;
    }

    runtimeContext.modules.push({ filter, Exception })
  })
}





