<template>
  <ACard>
    <Subfield>
      <div>
        <AButton @click="handleCreate">新建</AButton>
      </div>
      <div>
        <AInputSearch />
      </div>
    </Subfield>

    <ATable
      :dataSource="dataList"
      :columns="columns"
      :rowKey="row => row.name"
      :pagination="pagination"
    >
      <template #bodyCell="{ column }">
        <template v-if="column.dataIndex === 'operator'">
          <AButton @click="handleEdit">编辑</AButton>
        </template>
      </template>
    </ATable>
  </ACard>

  <NewLi :visiable="visiable" @ok="handleOk" @cancel="handleCancel" />
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue';
import type { TableColumnType, TableProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { getListApi } from './api';
import Subfield from '@components/Subfield';
import NewLi from './NewLi.vue';

const dataList = ref<unknown[]>([]);
const columns: TableColumnType[] = [
  { title: '名称', dataIndex: 'name' },
  { title: '年龄', dataIndex: 'age' },
  { title: '源地址', dataIndex: ['data', 's_addr'] },
  { title: '目的地址', dataIndex: ['data', 'd_addr'] },
  { title: '操作', dataIndex: 'operator' }
];
const visiable = ref(false);

const selectedKeys = ref([]);
const selectedRowKeys = ref([]);

const mode = ref('create');

const loadData = () => {
  getListApi().then((res) => {
    dataList.value = res;
  })
}

const pagination: TableProps['pagination'] = {
  onChange() {
    loadData()
  }
}

const handleCreate = () => {
  mode.value = 'create';
  visiable.value = true;
  console.log('click')
}
const handleEdit = () => {
  mode.value = 'edit';
  visiable.value = true;
}

const handleOk = () => {
  visiable.value = false;
  loadData()
}
const handleCancel = () => {
  visiable.value = false;
}

onBeforeMount(loadData);
</script>
