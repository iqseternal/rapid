<template>
  <div ref="blended" class="blended">{{ props.text }}</div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { onMounted, ref } from 'vue';
import { getCssVar, setCssVars, CssValueConverts } from '@rapid/libs/common';

// 交融文字
const props = defineProps({
  text: { type: String, required: true },
  distSpacing: { type: Number, default: 0}
});

const blended = ref() as Ref<HTMLElement>;

onMounted(() => {
  setCssVars(blended.value, {
    '--spacing': parseInt(getCssVar(blended.value, 'fontSize')) * -1,
    '--dist-spacing': props.distSpacing
  }, {
    convert: [CssValueConverts.toPixel]
  })
});
</script>

<style lang="scss" scoped>

.blended {
  --spacing: 0px;
  --dist-spacing: 0px;

  background-image: -webkit-linear-gradient(-20deg, #238b9973, #eb894d);
  -webkit-text-fill-color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  user-select: none;
  font-family: fantasy;

  transition: run 3s ease-out 1s;
  animation: run 1s ease-out forwards;
}

@keyframes run {
  from {
    letter-spacing: var(--spacing);
    filter: blur(10px) contrast(6);
  }
  to {
    letter-spacing: var(--dist-spacing);
    filter: blur(1px) contrast(6);
  }
}

</style>
