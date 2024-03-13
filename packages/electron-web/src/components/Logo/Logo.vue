<template>
  <div class="logo overflow-hidden">
    <img :src="logoSvg" :alt="CONFIG.PROJECT" />
  </div>
</template>

<script lang="ts" setup>
import { CONFIG } from '@rapid/config/constants';
import { logoSvg } from '@/assets';

</script>

<style lang="scss" scoped>
.logo {
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
