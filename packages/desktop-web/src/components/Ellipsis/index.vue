<template>
  <ATooltip :mouseEnterDelay="CONFIG.VIEW.TOOLTIP_ENTER_TIME">
    <template v-if="show" #title>
      <span>{{ text }}</span>
    </template>
    <component :is="tag" ref="ellipsis" class="ellipsis">
      <span>{{ text }}</span>
    </component>
  </ATooltip>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch, onMounted } from 'vue';
import { CONFIG } from '@rapid/config/constants';
import { useResizeObserver, useDebounce } from '@/hooks';

const props = defineProps({
  tag: { type: String, default: 'span' },
  text: { type: String, default: '' }
});

const show = ref(false);
const ellipsis = ref<HTMLElement>();

const resizeWidth = () => {
  const fatherWidth = ellipsis.value?.offsetWidth ?? 0;
  const childWidth = (ellipsis.value?.firstChild as HTMLElement).offsetWidth;
  show.value = fatherWidth < childWidth;
}

useResizeObserver(ellipsis, useDebounce(() => {
  resizeWidth();
}, 20))

onMounted(()=>{
  resizeWidth();
});

watch(() => props.text, () => {
  nextTick(() => {
    resizeWidth();
  })
})
</script>


<style lang="scss" scoped>
.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
