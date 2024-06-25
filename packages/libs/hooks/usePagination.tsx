
import type { TableProps as ATableProps, TablePaginationConfig as ATablePaginationConfig, ModalProps as AModalProps } from 'antd';
import { useState, useEffect } from 'react';

/**
 * 表格分页参数的获取 Hook
 */
export function usePagination<PaginationConfig extends ATablePaginationConfig>(paginationProps: PaginationConfig = ({} as PaginationConfig)) {
  const [pagination, setPagination] = useState<ATablePaginationConfig>({
    defaultCurrent: 1,
    defaultPageSize: 10,
    showQuickJumper: true,
    showPrevNextJumpers: true,
    showLessItems: true,
    showTotal: (total, range) => <>共 {total} 条</>,
    showSizeChanger: true,
    size: 'default',
    ...paginationProps
  });


  return { pagination, setPagination } as const;
}
