
import { IS_DEV } from '@rapid/config/constants';
import type { SetupOptions, DescendantClass } from '../core';
import { Printer } from '../core';
import { Exception } from '../exception';

import { Catch, FILTER_META_CATCH } from './decorator';

/**
 * 捕捉 Exception 异常的拦截器 Filter
 */
@Catch(Exception)
export abstract class FrameworkFilter {
  /**
   * 当发生异常并被此拦截器拦截，会调用当前 catch 方法
   * @param err
   */
  abstract catch(err: Exception): void;
}

export interface SetupFilterOptions<T extends DescendantClass<FrameworkFilter>> extends Omit<SetupOptions<never, T>, 'use'> {

}

export const runtimeContext = {
  modules: [] as {
    filter: FrameworkFilter;
    Exception: DescendantClass<Exception>
  }[]
}

/**
 * 创建 filter 的上下文
 * @param options
 * @returns
 */
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
      if (IS_DEV) Printer.printError(`\`Catch\` decorator must receive an Exception.`);
      return;
    }

    runtimeContext.modules.push({ filter, Exception })
  })
}

export const filterCatch = <Err extends Error>(err: Err): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    if (!(err instanceof Exception)) return reject();

    let isResolved = false;

    for (let i = 0;i < runtimeContext.modules.length;i ++) {

      const { filter, Exception } = runtimeContext.modules[i];

      if (err instanceof Exception) {
        filter.catch(err);
        isResolved = true;
      }
    }

    if (isResolved) resolve();
    else reject();
  })
}



