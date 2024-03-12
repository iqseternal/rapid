<template>
  <ASpace class="personal" :size="14">
    <DropdownMenu>
      <SidebarItem text="Profile">
        <AAvatar :size="autoSize" style="background-color: #87d068">
          <template #icon>
            <UserOutlined />
          </template>
        </AAvatar>
      </SidebarItem>

      <template #overlay>
        <SingleMenu mark="AccountBookOutlined" disabled>切换账户</SingleMenu>
        <SingleMenu mark="MonitorOutlined" disabled>修改密码</SingleMenu>
        <SingleMenu disabled>注销账户</SingleMenu>
        <MenuDriver />
        <SingleMenu mark="LogoutOutlined" @click="logout">退出登录</SingleMenu>
      </template>
    </DropdownMenu>

    <DropdownMenu>
      <SidebarItem :src="settingSvg" text="设置2" />

      <template #overlay>
        <SingleMenu mark="FileOutlined" disabled>配置文件</SingleMenu>
        <MenuDriver />
        <SingleMenu mark="SettingOutlined" @click="() => openSettingPage()">设置</SingleMenu>
        <SingleMenu mark="KeyOutlined" disabled>键盘快捷方式</SingleMenu>
        <ComboBoxMenu title="主题">
          <SingleMenu mark="BgColorsOutlined" disabled>颜色主题</SingleMenu>
        </ComboBoxMenu>
        <MenuDriver />
        <SingleMenu disabled>检查更新...</SingleMenu>
      </template>
    </DropdownMenu>
  </ASpace>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Dropdown, Avatar, Space, Popover, Button, Menu, MenuItem, SubMenu } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { settingSvg } from '@renderer/assets';
import { loginRoute } from '@pages/index/router/modules';

import { Subfield } from '@components/Subfield';
import { DropdownMenu, ComboBoxMenu, SingleMenu, MenuDriver } from '@components/DropdownMenu';
import { windowShow, openSettingPage, windowReload, windowURLBackDisabled } from '@renderer/actions';

import { useFadeOut } from '@renderer/hooks';

import SidebarItem from '@components/SidebarItem';
import IconFont from '@components/IconFont';

const router = useRouter();
const route = useRoute();

const autoSize = ref(0);

const logout = () => useFadeOut(() => {
  router.push(loginRoute.meta.fullpath);
});

onMounted(() => {
  const r = getComputedStyle(document.querySelector(':root') as Element).getPropertyValue('--s-main-frame-sidebar-width');
  autoSize.value = parseInt(r) - 16;
});

</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.personal {
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  gap: 10px;
}
</style>
