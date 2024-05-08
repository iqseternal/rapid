import type { Ref } from 'vue';
import { ref } from 'vue';
import type { TableColumnType, TableColumnsType } from 'ant-design-vue';

/**
 * antd table 列定义函数
 */
export function useColumns<R, T = TableType.Columns<R>>(cols: T) {

  const columns = ref(cols) as Ref<T>;




  return { columns };
}

