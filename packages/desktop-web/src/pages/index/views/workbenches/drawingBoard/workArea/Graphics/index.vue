<template>
  <ATabs class="graphics h-full" :animated="false">
    <ATabPane :key="1" tab="系统图形"><SystemGraphics /></ATabPane>
    <ATabPane :key="2" tab="我的图形"><CustomGraphics /></ATabPane>
    <!-- <ATabPane :key="3" tab="组"><AEmpty /></ATabPane> -->
  </ATabs>
</template>

<script lang="ts" setup>
import { useMetaState } from '@/meta';

import SystemGraphics from './SystemGraphics.vue';
import CustomGraphics from './CustomGraphics.vue';

</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
