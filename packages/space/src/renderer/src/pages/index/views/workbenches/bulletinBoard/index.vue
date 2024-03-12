<template>
  <div class="bulletinBoard">
    <Subfield :gap="20">
      <!-- <div class="flex-col-center" @click="handleWork">
        <Graph text="新建空白文档" />
      </div> -->
      <Graph text="新建空白文档" @click="handleCreateDoc" />

      <GraphGroup>
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
        <Graph text="新建空白文档" />
      </GraphGroup>
    </Subfield>

    <ATabs v-model:activeKey="activeKey">
      <ATabPane :key="TABPANE_KEYS.RecentFiles">
        <template #tab><IconFont type="FileOutlined" />最近文件</template>
        <RecentFiles />
      </ATabPane>
      <ATabPane :key="TABPANE_KEYS.RecommendedTemplates">
        <template #tab><IconFont type="InteractionOutlined" />推荐模板</template>
        <RecommendedTemplates />
      </ATabPane>
      <ATabPane :key="TABPANE_KEYS.PersonalTemplates">
        <template #tab><IconFont type="PercentageOutlined" />个人模板</template>
        <PersonalTemplates />
      </ATabPane>
    </ATabs>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { spaceRoutes } from '@pages/index/router/modules';
import { Graph, GraphGroup } from './components';
import { useDocStore } from '@renderer/store/modules/doc';
import { setupIndexedDB, getDocsAllList } from '@renderer/indexedDB';
import { TABLES, TABLE_DOCUMENT, DATABASES_META2D } from '#constants/indexDB';
import { WindowPopup } from '@renderer/actions';

import IconFont from '@components/IconFont';
import Subfield from '@components/Subfield';

import RecentFiles from './RecentFiles.vue';
import RecommendedTemplates from './RecommendedTemplates.vue';
import PersonalTemplates from './PersonalTemplates.vue';


const router = useRouter();

enum TABPANE_KEYS {
  // 最近文件
  RecentFiles,
  // 推荐模板
  RecommendedTemplates,
  // 个人模板
  PersonalTemplates
}
const activeKey = ref(TABPANE_KEYS.RecentFiles);


const { createDoc, setDocId } = useDocStore();

const handleCreateDoc = async () => {
  const doc = await createDoc().catch(err => err);


  setDocId(2);
}

onMounted(async () => {
  const res = await getDocsAllList();

})
</script>

<style lang="scss" scoped>

.bulletinBoard {
  padding: 0 10px;
}
</style>
