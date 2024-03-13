
import type { UnwrapNestedRefs } from 'vue';
import { reactive } from 'vue';
import type { TableProps } from 'ant-design-vue';

import { usePagination } from './usePaginationAttrs';
import { useModalAttrs } from './useModal';

export type InitTableFn<R> = (
  next: BaseCb,
  refent: {
    params: ReturnType<typeof usePagination>['paginParams'],
    pagination: ReturnType<typeof usePagination>,
    modal: ReturnType<typeof useModalAttrs<R>>,
    tableAttrs: UnwrapNestedRefs<Partial<TableProps<R>>>
  }
) => void | R[] | Promise<void> | Promise<R[]>;

export function useTableAttrs<
  R,
  T = Partial<TableProps<R>>,
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
    loading: false,
    ...props
  });

  async function loadData() {
    tableAttrs.loading = true;
    const next = () => { tableAttrs.loading = false; }
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
