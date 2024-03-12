
<template>
  <ASpace style="display: flex;flex-direction: column;" :size="14">
    <template v-for="item in spaceRoutes.children" :key="item.meta.fullpath">
      <template v-if="item.meta.svg">
        <SidebarItem :src="item.meta.svg" @click="() => router.push(item.meta.fullpath)" />
      </template>
      <template v-else>
        <SidebarItem @click="() => router.push(item.meta.fullpath)">
          <IconFont :type="item.meta.icon" />
        </SidebarItem>
      </template>
    </template>
  </ASpace>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router';
import { Space } from 'ant-design-vue';
import { terminalSvg, dashboardSvg, settingSvg } from '@renderer/assets';
import { spaceRoutes } from '@pages/index/router/modules';

import SidebarItem from '@components/SidebarItem';
import IconFont from '@components/IconFont';

const router = useRouter();
</script>
