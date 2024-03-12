<template>
  <slot />
  <template v-if="$slots.title">
    <slot name="title" />
  </template>
  <p v-else class="options-title">{{ title }}</p>
</template>

<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>


<style lang="scss" scoped>
.options-title {
  font-size: 12px;
  line-height: 24px;
  color: #ccc;
  margin-left: 24px;
}
</style>
