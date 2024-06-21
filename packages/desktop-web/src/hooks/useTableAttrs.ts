
import type { UnwrapNestedRefs } from 'vue';
import { reactive } from 'vue';
import type { TableProps } from 'ant-design-vue';

import { usePagination } from './usePaginationAttrs';
import { useModalAttrs } from './useModal';
import { isUndefined } from '@suey/pkg-utils';

export type InitTableFn<R> = (
  next: (dataSource?: R[], callback?: () => void) => Promise<void>,
  refent: {
    params: ReturnType<typeof usePagination>['paginParams'],
    pagination: ReturnType<typeof usePagination>,
    modal: ReturnType<typeof useModalAttrs<R>>,
    tableAttrs: Partial<TableProps<R>>
  }
) => void | R[] | Promise<void> | Promise<R[]>;

export function useTableAttrs<
  R extends object,
  T extends Partial<TableProps<R>> = Partial<TableProps<R>>,
  FN extends InitTableFn<R> = InitTableFn<R>
>(
  props: T,
  /** 数据的初始化函数, 返回一个 Promise */
  loadDataFn: FN,
  /** 加载一个 Modal */
  loadModal?: (loadData: () => void | Promise<void>) => ReturnType<typeof useModalAttrs<R>>,
  /** 加载一个 Pagination */
  loadPagination?: (loadData: () => void | Promise<void>) => ReturnType<typeof usePagination>
) {
  const pagination = loadPagination ? loadPagination(loadData) : usePagination({}, loadData);
  const modal = loadModal ? loadModal(loadData) : useModalAttrs<R>({}, {
    ok: loadData
  });

  const tableAttrs = reactive({
    pagination: pagination.paginAttrs,
    dataSource: [],
    // sticky: true,
    tableLayout: 'fixed',
    scroll: {
      x: true
    },
    loading: false,
    ...props
  }) as unknown as (
    typeof props & {
      pagination: typeof pagination.paginAttrs;
      loading: boolean;
    }
  );

  async function loadData() {
    tableAttrs.loading = true;
    const next = async (dataSource?: R[], callback?: () => void) => {
      if (!isUndefined(dataSource)) tableAttrs.dataSource = dataSource;
      tableAttrs.loading = false;

      if (callback) callback();
    }


    const res = await loadDataFn(next, {
      params: pagination.paginParams,
      pagination,
      modal,
      tableAttrs
    }) as unknown as Promise<void>;

    return res;
  }

  return {
    /**
     * 加载数据, 自动调用
     */
    loadData,
    refresh: loadData,
    tableAttrs,
    ...pagination,
    ...modal
  }
}
