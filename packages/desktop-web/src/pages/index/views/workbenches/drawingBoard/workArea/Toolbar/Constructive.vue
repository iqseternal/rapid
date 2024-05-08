<template>
  <div class="flex-left">
    <Tool title="撤销">
      <span @click="onUndo">
        <svg class="l-icon" aria-hidden="true"><use xlink:href="#l-undo" /></svg>
      </span>
    </Tool>
    <Tool title="重做">
      <span @click="onRedo">
        <svg class="l-icon" aria-hidden="true"><use xlink:href="#l-redo" /></svg>
      </span>
    </Tool>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Pen, PenType, deepClone } from '@meta2d/core';
import { message } from 'ant-design-vue';
import { DropdownMenu, MenuDriver, ComboBoxMenu, SingleMenu } from '@components/DropdownMenu';
import { onUndo, onRedo, onAddShape, onCopy, onDelete, onPaste, onScaleDefault, onScaleWindow } from '@/meta';
import Widget from '@components/Widget';
import IconFont from '@components/IconFont';
import Tool from './Tool.vue';

</script>

<style lang="scss" scoped>

</style>
