

import type { TableProps as ATableProps, TablePaginationConfig as ATablePaginationConfig, ModalProps as AModalProps } from 'antd';
import { useState, useEffect } from 'react';
import { usePagination } from './usePagination';

/**
 * table 事件，例如加载数据源
 */
export interface TableEvents<RecordType extends Record<string, unknown>> {
  loadDataFn: (next: (dataList?: RecordType[]) => void, pagination: Exclude<Required<ATableProps<RecordType>>['pagination'], boolean>) => any;
}
/**
 * 通过本函数创建表格数据源的获取函数
 */
export function useLoadDataFn<RecordType extends Record<string, unknown>>(loadDataFn: TableEvents<RecordType>['loadDataFn']) {
  return (next: Parameters<typeof loadDataFn>[0], pagination: Parameters<typeof loadDataFn>[1]) => {

    // 如果没有 next 函数, 那么就是在手动调用此函数，而不是 useTableAttrs。
    if (!next) {
      throw new Error(``);
    }

    return loadDataFn(next, pagination);
  };
}

/**
 * 获得表格的 props 参数
 * @param props 需要覆盖的表格参数
 * @param loadDataFn 表格数据源的获取函数
 */
export function useTableAttrs<RecordType extends Record<string, unknown>>(props: ATableProps<RecordType> = {}, loadDataFn: TableEvents<RecordType>['loadDataFn']) {
  const { pagination, setPagination } = usePagination(typeof props.pagination === 'boolean' ? {} : props.pagination);

  const [tableAttrs, setTableAttrs] = useState<ATableProps<RecordType>>(() => ({
    pagination,
    dataSource: [],
    loading: true,
    ...props
  }));

  /**
   * 加载数据的函数, 调用此函数会自动获取表格数据
   *
   * next 函数为 为表格数据源 dataSource 赋值又或者是取消加载动画
   */
  const loadData = async () => {
    const next = (dataList?: RecordType[]) => {
      if (typeof dataList === 'undefined') setTableAttrs(attrs => ({ ...attrs, loading: false }));
      else setTableAttrs(attrs => ({ ...attrs, dataSource: dataList, loading: false }))
    };

    return loadDataFn(next, tableAttrs.pagination as Exclude<Required<ATableProps<RecordType>>['pagination'], boolean>);
  }


  // 分页被更改时，需要联动修改 table 的参数
  useEffect(() => {
    setTableAttrs(attrs => ({
      ...attrs,
      pagination: {
        ...attrs.pagination,
        ...pagination
      }
    }))
  }, [pagination]);

  useEffect(() => {
    // 第一次进入页面时自动加载表格数据
    ;(async () => {
      loadData();
    })();
  }, []);

  return { loadData, tableAttrs, setTableAttrs, pagination, setPagination };
}

