<template>
  <div class="toolBar flex-between">
    <Constructive />

    <Creativity />

    <Modifiability />
  </div>
</template>

<script lang="ts" setup>
import Modifiability from './Modifiability.vue';
import Creativity from './Creativity.vue';
import Constructive from './Constructive.vue';
</script>

<style lang="scss" scoped>
@import '@scss/var.scss';
@import '@scss/mixin.scss';

@mixin full {
  width: 100%;
  height: 100%;
}

.toolBar {
  height: var(--tool-bar-height);
  padding: 0 10px;
  background-color: var(--s-main-frame-bg-normal-color);
  border-radius: var(--s-block-border-radius);

  &:deep(.widget) {
    width: var(--tool-bar-size);
    height: var(--tool-bar-size);
    padding: var(--tool-bar-widget-padding);

    span {
      display: inline-block;
      @include full();
    }
    svg {
      @include full();
    }
  }
}
</style>
