<template>
  <ASubMenu :popupClassName="'dropdown-sub-menu' + (isClose ? ' hidden' : '')">
    <template #icon>
      <template v-if="$slots.icon">
        <slot name="icon" />
      </template>
      <template v-else>
        <template v-if="props.mark"><IconFont :type="props.mark" /></template>
        <template v-else><div /></template>
      </template>
    </template>

    <template v-for="name in Object.keys($slots).filter(name => name !== 'icon')" #[name]>
      <slot :name="name" />
    </template>
  </ASubMenu>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { inject, computed } from 'vue';
import { DROPDOWN_STATUS } from './declare';

import IconFont from '../IconFont';

const props = defineProps({
  mark: { type: String as PropType<IconKey>, required: false }
})
const dropdownStatus = inject<Ref<boolean>>(DROPDOWN_STATUS);

const isClose = computed(() => dropdownStatus && !dropdownStatus.value);
</script>
