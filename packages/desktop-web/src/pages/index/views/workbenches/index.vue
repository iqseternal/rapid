<template>
  <DrawingBoard />

  <!-- <template v-if="docStore.isWork">
    <DrawingBoard />
  </template>
  <template v-else>
    <BulletinBoard />
  </template> -->
</template>

<script lang="tsx" setup>
import { onBeforeMount, ref } from 'vue';
import { ENV, IS_DEV, IS_LINUX, IS_MAC, IS_PROD } from '@rapid/config/constants';
import { isUnDef } from '@suey/pkg-utils';
import { setupIndexedDB } from '@/indexedDB';
import type { Meta2dData } from '@meta2d/core';
import { useDocStore } from '@/store/modules/doc';

import BulletinBoard from './bulletinBoard/index.vue';
import DrawingBoard from './drawingBoard/index.vue';

const docStore = useDocStore();

</script>

