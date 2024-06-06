<template>
  <div class="propertyBar h-full overflow-x-hidden">
    <FileProps v-show="selections.mode === SelectionMode.File" />
    <PenProps v-show="selections.mode === SelectionMode.Pen || selections.mode === SelectionMode.Rect" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useSelections, SelectionMode } from '@/meta';
import FileProps from './FileProps.vue';
import PenProps from './PenProps';

const { selections } = useSelections();
</script>

<style lang="scss" scoped>
@import './index.scss';
.propertyBar {
  touch-action: none;
}
</style>
