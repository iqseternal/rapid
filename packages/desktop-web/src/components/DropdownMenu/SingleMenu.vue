<template>
  <AMenuItem v-bind="$attrs" class="dropdown-menu-single" @click="itemClick">
    <template #icon>
      <template v-if="$slots.icon">
        <slot name="icon" />
      </template>
      <template v-else>
        <template v-if="props.mark"><IconFont :type="props.mark" /></template>
        <template v-else><div /></template>
      </template>
    </template>

    <template #default>
      <Subfield class="dropdown-menu-single-text" gap="15px">
        <slot name="default" />

        <span class="dropdown-menu-single-text-shortcut" style="min-width: 50px;text-align: right;">{{ props.shortcut }}</span>
      </Subfield>
    </template>

    <template v-for="name in Object.keys($slots).filter(slotName => !['default', 'icon'].includes(slotName))" #[name]>
      <slot :name="name" />
    </template>
  </AMenuItem>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { inject, computed, watchEffect, watch } from 'vue';
import { UserOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import { DROPDOWN_STATUS } from './declare';
import type { SingleMenuProps } from './declare';
import { Subfield } from '@components/Subfield';
import IconFont from '../IconFont';

const props = defineProps({
  mark: { type: String as PropType<IconKey>, required: false },
  shortcut: { type: String, default: () => '' }
})

const emits = defineEmits(['click']);

const dropdownStatus = inject<Ref<boolean>>(DROPDOWN_STATUS);

const itemClick = () => {
  if (dropdownStatus?.value === true) dropdownStatus.value = false;
  emits('click');
}
</script>
