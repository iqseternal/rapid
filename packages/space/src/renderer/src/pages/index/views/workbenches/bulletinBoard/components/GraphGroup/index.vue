<template>
  <div class="graphGroup overflow-x-hidden w-full">
    <IconFont type="LeftOutlined" class="graphGroupButton graphGroupButtonLeft" />
    <Subfield ref="graphGroup" gap="10px" class="graphGroupContainer">
      <slot name="default" />
    </Subfield>
    <IconFont type="RightOutlined" class="graphGroupButton graphGroupButtonRight" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useEventListener, useEventListenerForElement } from '@renderer/hooks';
import type { SubfieldInstance } from '@components/Subfield';
import { isUnDef, isDef } from '@suey/pkg-utils';
import Graph from '../Graph';
import Subfield from '@components/Subfield';
import IconFont from '@components/IconFont';

const graphGroup = ref<SubfieldInstance>();

onMounted(() => {
  if (!graphGroup.value?.container) return;

  useEventListenerForElement(graphGroup.value.container, 'wheel', e => {
    if (!graphGroup.value || !graphGroup.value.container) return;
    graphGroup.value.container.scrollLeft += e.deltaY;
  })
})
</script>

<style lang="scss" scoped>
@import '@scss/var.scss';
@import '@scss/mixin.scss';

.graphGroup {
  position: relative;
  padding: 0 20px;
  /* background-color: rgba(0, 0, 0, .3); */
  border-radius: var(--s-block-border-radius);

  .graphGroupButton {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    font-size: 16px;
    padding: 5px 10px;
    background-color: var(--s-main-frame-bg-normal-color);
  }
  .graphGroupButtonLeft {
    left: 0;
    color: blue;
  }
  .graphGroupButtonRight {
    right: 0;
  }

  .graphGroupContainer {
    padding: 10px 10px;

    overflow-x: auto;
    border-radius: var(--s-block-border-radius);
    @include beautifulBar(hidden);
  }
}
</style>
