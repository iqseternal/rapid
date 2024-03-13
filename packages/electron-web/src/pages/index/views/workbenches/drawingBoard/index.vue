<template>
  <div class="h-full overflow user-select-none workbenches">
    <Toolbar />

    <div class="w-full flex-between overflow-hidden viewContainer">
      <Graphics v-ResizeWidth="graphicsBindings" />
      <View :width="viewWidth" />
      <PropertyBar v-ResizeWidth="propertyBindings" />
    </div>

    <AFloatButtonGroup trigger="click" type="primary" :style="{ right: '24px' }">
      <template #icon>
        <IconFont type="CustomerServiceOutlined" />
      </template>

      <AFloatButton />
    </AFloatButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onBeforeMount, ref, getCurrentInstance, reactive, computed, watchEffect, watch, onActivated, onDeactivated, onBeforeUnmount } from 'vue';
import { PropertyBar, Toolbar, View, Graphics } from './workArea';
import { setupIndexedDB } from '@/indexedDB';
import { setupMeta2dView, setupMeta2dEvts, saveMeta2dData } from '@/meta';
import { vResizeWidth } from '@rapid/libs/directives';
import type { VResizeWidthBindings } from '@rapid/libs/directives';

import IconFont from '@components/IconFont';

const instance = getCurrentInstance();

const graphicsBindings: VResizeWidthBindings = reactive({
  minWidth: 190,
  width: 300,
  canExec: true
});

const propertyBindings: VResizeWidthBindings = reactive({
  width: 300,
  direction: 'left',
  canExec: true
});

const viewWidth = computed(() => graphicsBindings.width + propertyBindings.width);

onActivated(() => {
  graphicsBindings.canExec = true;
  propertyBindings.canExec = true;
})
onDeactivated(() => {
  graphicsBindings.canExec = false;
  propertyBindings.canExec = false;
})
onBeforeUnmount(() => {
  graphicsBindings.canExec = false;
  propertyBindings.canExec = false;
})
</script>

<style lang="scss" scoped>


.workbenches {
  --tool-bar-height: 40px;
  --tool-bar-size: calc(var(--tool-bar-height) * 0.6);
  --tool-bar-widget-padding: 4px;
  --tool-bar-gap: 4px;
  --tool-bar-margin: 4px;

  .viewContainer {
    margin-top: var(--tool-bar-margin);
    height: calc(100% - var(--tool-bar-height) - var(--tool-bar-margin));
  }
}
</style>
