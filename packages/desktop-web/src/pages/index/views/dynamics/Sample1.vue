<template>
  <ACard>
    <Subfield>
      <div>
        <AButton @click="handleCreate">新建1</AButton>
      </div>
      <div>
        <AInputSearch />
      </div>
    </Subfield>

    <ATable v-bind="tableAttrs" :columns="columns">
      <template #bodyCell="{ record, column }">

        <template v-if="column.dataIndex === 'operator'">
          <AButton @click="handleEdit(record as Response)">编辑</AButton>
        </template>

      </template>
    </ATable>

    <NewLi v-bind="modalAllAttrs" />
  </ACard>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useTableAttrs, useColumns, useModalAttrs } from '@/hooks';
import type { Response } from './api';
import { getListApi } from './api';
import { useRouter } from 'vue-router';
import { loginRoute } from '@pages/index/router/modules';

import Subfield from '@components/Subfield';
import NewLi from './NewLi.vue';

const router = useRouter();

const { columns } = useColumns<Response>([
  { title: '名称', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '源地址', dataIndex: ['data', 's_addr'], width: 100 },
  { title: '目的地址', dataIndex: ['data', 'd_addr'] },
  { title: '操作', dataIndex: 'operator' }
]);

// 创建表格需要的 attrs，并且其中定义了一些动作行为回调
const { tableAttrs, modalAllAttrs, open, loadData } = useTableAttrs<Response>({
  // 创建每一行的 Key
  rowKey: row => row.name
}, next => { // 表格请求有时还需要一些其他参数，可以从第二个参数中解构
  // 调用 next 进行下一步
  getListApi().then(res => {

    next(res);
  })
});

const handleCreate = () => open('新建', 'create', {}); // 页面新建动作

const handleEdit = (record: Response) => open('编辑', 'edit', { ...record }); // 页面编辑动作
</script>
