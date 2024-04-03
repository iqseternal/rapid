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
  width: calc($sMainCaptionBarHeight - 0px);
  height: calc($sMainCaptionBarHeight - 0px);
  aspect-ratio: 1 / 1;
  padding: 7px 5px 7px 9px;
  display: flex;
  justify-content: center;

  @include appRegion;
}
</style>
