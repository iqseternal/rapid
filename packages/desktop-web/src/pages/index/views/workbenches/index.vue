<template>
  <template v-if="docStore.isWork">
    <DrawingBoard />
  </template>
  <template v-else>
    <BulletinBoard />
  </template>
</template>

<script lang="tsx" setup>
import { useDocStore } from '@/store/modules/doc';

import BulletinBoard from './bulletinBoard/index.vue';
import DrawingBoard from './drawingBoard/index.vue';

const docStore = useDocStore();

</script>

