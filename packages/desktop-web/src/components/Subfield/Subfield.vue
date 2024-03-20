<template>
  <div ref="container" class="subfield" :style="{ flex: props.flex, gap: typeof props.gap === 'number' ? props.gap + 'px' : props.gap, ...generatorStyle }">
    <template v-if="!$slots.left && !$slots.center && !$slots.right">
      <slot />
    </template>
    <template v-else>
      <div v-if="$slots.left" class="left" :style="generatorStyle"><slot name="left" /></div>
      <div v-if="$slots.center" class="center" :style="generatorStyle"><slot name="center" /></div>
      <div v-if="$slots.right" class="right" :style="generatorStyle"><slot name="right" /></div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { computed, ref, reactive } from 'vue';
import type { SubfieldInstance } from './index.d';

const props = defineProps({
  flex: { type: Number, default: 1 },
  direction: { type: String as PropType<'row' | 'col'>, default: 'row' },
  gap: { type: [Number, String] as PropType<number | `${number}${'px' | 'rem' | 'em' | 'rpx' | 'vw' | 'vh'}`>, default: 0 }
});

const container = ref<HTMLElement>();

const expose = reactive({
  container
})

const generatorStyle = computed<CSSProperties>(() => ({
  flexDirection: props.direction === 'row' ? 'row' : 'column'
}));

defineExpose<SubfieldInstance>(expose);
</script>

<style lang="scss" scoped>
.subfield {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;

  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow: hidden;
  }
  .center {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow: hidden;
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    overflow: hidden;
  }
}
</style>
