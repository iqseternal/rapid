
<template>
  <div class="thumbnail" @click="() => emits('click')">
    <template v-if="$slots.thumbnail"><slot name="thumbnail" /></template>
    <template v-else>
      <div class="thumbnailBlock">
        <IconFont type="FolderAddOutlined" size="80" />
      </div>
    </template>

    <div style="text-align: center;">{{ props.text }}</div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { GraphProps } from './index.d';
import Subfield from '@components/Subfield';
import IconFont from '@components/IconFont';

const props = withDefaults(defineProps<GraphProps>(), {
  thumbnailUrl: void 0
});

const emits = defineEmits(['click']);
</script>

<style lang="scss" scoped>
@import '@scss/var.scss';
@import '@scss/mixin.scss';

.thumbnail {
  width: 150px;
  height: 150px;
  border-radius: var(--s-block-border-radius);
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0);
  background-color: var(--s-main-frame-bg-darkness-color);
  flex-shrink: 0;

  &:hover {
    border: 1px solid rgba(0, 0, 245, .5);
  }

  .thumbnailBlock {
    color: rgb(81, 150, 235);
    display: flex;
    justify-content: center;
    height: 70%;
  }
}
</style>
