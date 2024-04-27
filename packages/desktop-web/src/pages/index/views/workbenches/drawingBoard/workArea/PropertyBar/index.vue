<template>
  <div class="propertyBar h-full overflow-x-hidden">
    <FileProps v-if="selections.mode === SelectionMode.File" />
    <PenProps v-else-if="selections.mode === SelectionMode.Pen" />
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
</style>
