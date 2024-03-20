<template>
  <SidebarItem class="indicator">
    <Logo />
  </SidebarItem>
</template>

<script lang="ts" setup>
import SidebarItem from '@components/SidebarItem';
import Logo from '@components/Logo/Logo.vue';
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.indicator {
  width: var(--s-main-frame-sidebar-width);
  height: $sMainCaptionBarHeight;
  aspect-ratio: 1 / 1;
  padding: 5px;
  display: flex;
  justify-content: center;

  @include appRegion;
}
</style>
