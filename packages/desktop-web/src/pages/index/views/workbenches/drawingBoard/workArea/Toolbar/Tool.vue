<template>
  <Widget v-bind="$attrs" full class="tool" :class="props.active ? 'activedTool': 'deactiveTool'">
    <template v-for="name in Object.keys($slots).filter(name => name !== 'icon')" #[name]>
      <slot :name="name" />
    </template>
  </Widget>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Widget from '@components/Widget';

const props = defineProps({
  active: { type: Boolean, default: false }
})

</script>

<style lang="scss" scoped>
.tool {
  height: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;

  &:deep(.widgetImg) {
    transform: translateY(-1000px);
    filter: drop-shadow(black 0 1000px);
  }

  &:hover {
    &:deep(.widgetImg) {
      transform: translateY(-100px);
      filter: drop-shadow(blue 0 1000px);
    }
  }
}
</style>

<style>
.deactiveTool:hover svg {
  fill: blue;
}
.deactiveTool:hover .widgetImg {
  transform: translateY(-1000px);
  filter: drop-shadow(blue 0 1000px);
}

.activedTool {
  color: blue;
}
.activedTool .widgetImg {
  transform: translateY(-1000px);
  filter: drop-shadow(blue 0 1000px);
}
</style>
