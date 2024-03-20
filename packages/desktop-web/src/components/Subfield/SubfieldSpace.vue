
<template>
  <div :style="{ flex: props.size }">
    <slot />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  size: { type: Number, default: 1 }
})

</script>
