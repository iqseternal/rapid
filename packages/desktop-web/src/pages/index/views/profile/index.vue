<template>
  <Sample1 />
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { ref, watch, onBeforeMount, inject, provide } from 'vue';
import { message } from 'ant-design-vue';

import Sample1 from '../dynamics/Sample1.vue';

const props = defineProps({
  loadData: { type: Function as PropType<() => Promise<void>>, default: () => Promise.resolve() }
})
</script>

<style lang="scss" scoped>

</style>
