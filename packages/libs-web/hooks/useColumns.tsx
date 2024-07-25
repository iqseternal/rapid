

import type { TableProps as ATableProps, TablePaginationConfig as ATablePaginationConfig, ModalProps as AModalProps } from 'antd';
import { useState, useEffect } from 'react';






/**
 * 表格列的定义的获取 Hook
 * @param columnsProps
 */
export function useColumns<RecordType extends Record<string, unknown>, ColumnsType extends ATableProps<RecordType>['columns'] = ATableProps<RecordType>['columns']>(columnsProps: ColumnsType) {
  const [columns, setColumns] = useState<ColumnsType>(columnsProps);

  return { columns, setColumns };
}
