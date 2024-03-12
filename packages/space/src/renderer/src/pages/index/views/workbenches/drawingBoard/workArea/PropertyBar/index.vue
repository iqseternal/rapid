<template>
  <div class="propertyBar h-full overflow-x-hidden">
     <FileProps v-if="selections.mode === SelectionMode.File" />
     <PenProps v-if="selections.mode === SelectionMode.Pen" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useSelection, SelectionMode } from '@renderer/meta';
import FileProps from './FileProps.vue';
import PenProps from './PenProps.vue';

const { selections } = useSelection();
</script>

<style lang="scss" scoped>
@import '@scss/mixin.scss';
@import '@scss/var.scss';

.propertyBar {
  width: 300px;
  z-index: 99;
  background-color: var(--s-main-frame-bg-normal-color);
  padding: 8px;
  @include beautifulBar;
}
</style>
