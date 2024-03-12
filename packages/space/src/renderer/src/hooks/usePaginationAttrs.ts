
import { reactive, onBeforeMount } from 'vue';

import type { PaginationProps } from 'ant-design-vue';

/**
 * 表格分页参数的 Hook
 * @param props
 * @param callbackFn
 * @param autoload
 * @returns
 */
export function usePagination<T extends Partial<PaginationProps>>(props?: T, callbackFn?: () => void | Promise<void>, autoload = true) {

  const callback = {
    // onChange: [] as ((page: number, pageSize: number) => void)[],
    beforeCb: [] as  (() => void)[],
    afterCb: [] as (() => void)[]
  };

  const paginParams = reactive({
    limit: 0,
    offset: 0
  });

  const paginAttrs = reactive({
    current: 1,
    defaultPageSize: 10,
    total: 0,
    pageSize: 5,
    pageSizeOptions: ['5', '10', '15', '20'],
    showSizeChanger: true,
    showLessItems: false,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) => `共 ${total} 条`,
    async onChange(page: number, pageSize: number) {
      paginParams.limit = pageSize;
      paginParams.offset = pageSize * (page - 1);

      // callback.onChange.forEach(cb => cb(page, pageSize));
      const next = () => {
        paginAttrs.current = page;
        paginAttrs.pageSize = pageSize;
      }

      if (callbackFn) {
        callback.beforeCb.forEach(cb => cb());
        await callbackFn();

        next();
        callback.afterCb.forEach(cb => cb());
      }
      else next();
    },
    ...props
  });

  paginParams.limit = paginAttrs.pageSize;
  paginParams.offset = paginAttrs.pageSize * (paginAttrs.current - 1);

  onBeforeMount(async () => {
    if (autoload && callbackFn) {
      callback.beforeCb.forEach(cb => cb());
      await callbackFn();
      callback.afterCb.forEach(cb => cb());
    }
  });

  return { paginAttrs, paginParams, callback };
}
