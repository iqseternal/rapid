<template>
  <ATabs class="graphics h-full">
    <ATabPane :key="1" tab="系统图形"><SystemGraphics /></ATabPane>
    <ATabPane :key="2" tab="我的图形"><CustomGraphics /></ATabPane>
  </ATabs>
</template>

<script lang="ts" setup>
import { meta2dState } from '@renderer/meta';

import SystemGraphics from './SystemGraphics.vue';
import CustomGraphics from './CustomGraphics.vue';

</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
