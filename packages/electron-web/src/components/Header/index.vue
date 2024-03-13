<template>
  <Subfield ref="subfiledInstance" class="captionBar">
    <template v-if="$slots.left"><slot name="left" /></template>
    <template v-else><Slogan v-if="props.isPane === false" /></template>
    <template v-if="$slots.center"><slot name="center" /></template>
    <template v-else><Search v-if="props.isPane === false" /></template>


    <Control :isPane="props.isPane" :isDialog="props.isDialog">
      <template v-if="$slots.control" #control>
        <slot name="control" />
      </template>
    </Control>
  </Subfield>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, toRefs } from 'vue';
import type { Ref } from 'vue';
import type { SubfieldInstance } from '@components/Subfield';
import { Subfield, SubfieldSpace } from '@components/Subfield';
import type { HeaderInstance } from './declare';

import Slogan from './Slogan.vue';
import Search from './Search.vue';
import Control from './Control.vue';

const props = defineProps({
  isPane: { type: Boolean, default: false }, // 面板
  isDialog: { type: Boolean, default: false } // 弹窗, 警告类型
});

const subfiledInstance = ref<SubfieldInstance>();

const expose = reactive({
  container: computed(() => subfiledInstance.value?.container) as unknown as Ref<HTMLDivElement>
});

defineExpose<HeaderInstance>(expose);
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.captionBar {
  will-change: width;
  user-select: none;
  background-color: var(--s-main-frame-bg-normal-color);
  @include appRegion;
}
</style>

