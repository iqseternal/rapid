<template>
  <ADropdown v-model:open="open" v-bind="$attrs" :arrow="false" trigger="click" overlayClassName="dropdown-menu">
    <template v-for="name in Object.keys($slots)" #[name]>
      <template v-if="name === 'overlay'">
        <AMenu :key="name" :subMenuOpenDelay="0" triggerSubMenuAction="click" class="dropdown-menu-main">
          <slot :name="name" />
        </AMenu>
      </template>
      <template v-else>
        <slot :name="name" />
      </template>
    </template>
  </ADropdown>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { DROPDOWN_STATUS, setupDropdownOpenModel } from './declare';
import { useEventListener, useEventListenerForElement, useMousetrap, useThrottle } from '@/hooks';

const open = setupDropdownOpenModel();

useEventListenerForElement(window, 'resize', useThrottle(() => {
  open.value = false;
}));
</script>
