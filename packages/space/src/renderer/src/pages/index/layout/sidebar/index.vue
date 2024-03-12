<template>
  <Subfield direction="col" class="sidebars">
    <div />
    <Navigation />
    <Personal />
  </Subfield>
</template>

<script lang="ts" setup>
import { Subfield } from '@components/Subfield';

import Navigation from './Navigation.vue';
import Personal from './Personal.vue';
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.sidebars {
  background-color: var(--s-main-frame-bg-normal-color);
  user-select: none;
}
</style>
