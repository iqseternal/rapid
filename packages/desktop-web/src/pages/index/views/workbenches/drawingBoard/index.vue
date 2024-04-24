<template>
  <div class="h-full overflow user-select-none workbenches">
    <Toolbar />

    <div class="w-full flex-between overflow-hidden viewContainer">
      <Graphics v-resize-width="graphicsBindings" />
      <View :width="viewWidth" />
      <PropertyBar v-resize-width="propertyBindings" />
    </div>
  </div>
</template>

<script lang="tsx" setup>
import { reactive, computed, h } from 'vue';
import { PropertyBar, Toolbar, View, Graphics } from './workArea';
import { vResizeWidth } from '@rapid/libs/directives';

import type { VResizeWidthBindings } from '@rapid/libs/directives';
import { useSurvivalCycle } from '@/hooks';

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

useSurvivalCycle({
  survival: () => {
    graphicsBindings.canExec = true;
    propertyBindings.canExec = true;
  },
  extinction: () => {
    graphicsBindings.canExec = false;
    propertyBindings.canExec = false;
  }
})
</script>

<style lang="scss" scoped>

.workbenches {
  --tool-bar-height: 40px;
  --tool-bar-size: calc(var(--tool-bar-height) * 0.6);

  --tool-bar-widget-padding: 4px;
  /* --tool-bar-gap: 4px; */
  --tool-bar-margin: 4px;

  .viewContainer {
    margin-top: var(--tool-bar-margin);
    height: calc(100% - var(--tool-bar-height) - var(--tool-bar-margin));
  }
}
</style>
