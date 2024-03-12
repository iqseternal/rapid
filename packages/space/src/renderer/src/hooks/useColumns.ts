
import { ref } from 'vue';
import type { TableColumnType, TableColumnsType } from 'ant-design-vue';

/**
 * antd table 列定义函数
 * @param cols
 * @returns
 */
export function useColumns<R, T = TableType.Columns<R>>(cols: T) {

  const colums = ref(cols);




  return colums;
}

