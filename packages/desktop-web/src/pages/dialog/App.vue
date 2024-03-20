
<template>
  <Header isPane isDialog />
  <RouterView />
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { IPC_RENDER_DIALOG_WINDOW } from '@rapid/config/constants';
import { useErrorCaptured } from '@/hooks';
import Header from '@components/Header';

const router = useRouter();

useErrorCaptured();
</script>
