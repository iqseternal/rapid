<template>
  <div>
    <div v-if="title" class="title">{{ title }}</div>
    <slot />
    <ADivider v-if="showLine" />
  </div>
</template>

<script lang="ts" setup>

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  showLine: {
    type: Boolean,
    default: true
  }
});
</script>


<style lang="scss" scoped>
.title {
  font-size: 14px;
  margin-bottom: 20px;
}
</style>
