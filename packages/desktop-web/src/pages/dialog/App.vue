
<template>
  <Header isPane isDialog />
  <RouterView />
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import Header from '@components/Header';

const router = useRouter();
</script>
