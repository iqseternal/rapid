<template>
  <div id="frame_app" class="user-select-none">
    <Header isPane isDialog />

    在这里汇报 BUG
  </div>
</template>

<script setup>
import Header from '@components/Header';


</script>

<style lang="scss" scoped>
@import '@scss/var.scss';
@import '@scss/mixin.scss';

#frame_app {
  width: 100vw;
  height: 100vh;
  background-color: var(--s-main-frame-contain-color);
  @include overflow(hidden);
}
</style>
