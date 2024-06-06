<template>
  <div class="compose">
    <Header class="header">
      <template #left>
        <Slogan ref="sloganInstance">
          <template #center>
            <Subfield class="navMenu w-full" style="justify-content: flex-start;">
              <template v-for="navMenu in navMenus" :key="navMenu.title">
                <AutoDropdownMenu :menu="navMenu.value.menuList" trigger="click">
                  <span class="navItemTitle">{{ navMenu.value.title }}</span>
                </AutoDropdownMenu>
              </template>
              <AutoDropdownMenu :menu="navMenusStackMenu" trigger="click">
                <span v-show="navMenusStack.length" class="navItemTitle">
                  <IconFont type="MenuOutlined" />
                </span>
              </AutoDropdownMenu>
            </Subfield>
          </template>
          <template #right>
            <Widget title="历史记录">
              <IconFont type="HistoryOutlined" />
            </Widget>
          </template>
        </Slogan>
      </template>
      <template #center>
        <Search disabledSearch :searchTitle="StringFilters.toValidStr(dataState.name, '未命名文档')" />
      </template>

      <template #right>
        <Widget v-if="!genericStore.appearance.showLeftSideBar" icon="SettingOutlined" title="设置" />
      </template>
    </Header>

    <section class="composeMain">
      <template v-if="globalStatusState.isLoading">
        <Loading1 />
      </template>
      <template v-else>

        <template v-if="genericStore.appearance.showLeftSideBar"><Sidebar class="sidebar" /></template>
        <template v-else><div class="sidebarPlaceholder" /></template>

        <main class="container full">
          <RouterView v-slot="{ Component }">
            <KeepAlive>
              <component :is="Component" />
            </KeepAlive>
          </RouterView>
        </main>
      </template>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, onBeforeMount, ref, onErrorCaptured, computed, reactive, onDeactivated, onBeforeUpdate, onActivated } from 'vue';
import type { Ref } from 'vue';
import type { DropdownDataType, ComboBoxMenuDataType } from '@components/DropdownMenu';
import { DropdownMenu, MenuDriver, SingleMenu, ComboBoxMenu, AutoDropdownMenu } from '@components/DropdownMenu';
import { hotKeys, windowReload, windowDevtool, copyText, pasteText, windowResizeAble, openSettingPage, WindowPopup, windowResetCustomSize } from '@/actions';
import { canCopyText } from '@rapid/libs/common';
import { useMousetrap, useFadeIn, useEventListener, useResizeObserver, useStorageStack, useFadeOut } from '@/hooks';
import { headerMenus } from '@/menus';
import type { AppNavigationMenu } from '@/menus';
import type { HeaderInstance, SloganInstance } from '@components/Header';
import { Header, Indicator, Slogan, Search } from '@components/Header';
import { useGenericStore, useDocStore } from '@/store/modules';
import { useDataState } from '@/meta';
import { isDef } from '@suey/pkg-utils';
import { useRouter } from 'vue-router';
import { loginRoute } from '@pages/index/router/modules';
import { StringFilters } from '@rapid/libs/filters';
import { Loading1 } from '@components/Loading';
import { useGlobalStatusState } from '@/state/modules';

import Sidebar from './sidebar/index.vue';
import IconFont from '@components/IconFont';
import Widget from '@components/Widget';
import Subfield from '@components/Subfield';

const { dataState } = useDataState();
const { globalStatusState } = useGlobalStatusState();

const router = useRouter();

const docStore = useDocStore();
const genericStore = useGenericStore();
const sloganInstance = ref<SloganInstance>();

const { preStack: navMenus, nextStack: navMenusStack, pushStack, popStack } = useStorageStack({
  preStack: [...headerMenus],
  otherStack: [80, 110, 150, 160, 170],
  nextStack: []
});

/** 转换被收纳的菜单项,并作出展示数据 */
const navMenusStackMenu = computed<DropdownDataType>(() => navMenusStack.value.map((stackItem) => ({
  title: stackItem.value.title,
  shortcut: '',
  disabled: stackItem.value.disabled,
  mark: stackItem.value.mark,
  children: stackItem.value.menuList
})));

const logout = () => useFadeOut(() => {
  router.push(loginRoute.meta.fullpath);
});

onMounted(() => {
  globalStatusState.isLoading = false;
})

useFadeIn();

useResizeObserver(computed(() => sloganInstance.value?.centerContainer), () => {
  const dom = sloganInstance.value?.centerContainer;
  if (!isDef(dom)) return;

  pushStack((_, maxWidth = dom.clientHeight + 1) => maxWidth >= dom.clientWidth);
  popStack((_, maxWidth = dom.clientHeight - 1) => maxWidth < dom.clientWidth);
});

useMousetrap(hotKeys.reload.allKey, windowReload);
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

div.compose {
  position: relative;
  width: 100%;
  height: 100%;

  .header {
    width: 100%;
    padding: 0px;
    height: calc($sMainCaptionBarHeight);
    min-height: $sMainCaptionBarHeight;
    position: absolute;
    top: 0px;
    left: 0px;
    user-select: none;

    .navMenu {
      color: rgba(0, 0, 0, .6);
      height: 100%;
      font-size: 12px;
      transition: all .5s linear;

      .navItemTitle {
        width: 40px;
        display: inline-block;
        flex-shrink: 0;
        height: $sMainCaptionBarHeight;
        line-height: calc($sMainCaptionBarHeight - 8px);
        padding: 4px 8px;
        text-align: center;
        font-size: 12px;
        @include appRegionNo;

        &:hover {
          background-color: rgba(0, 0, 0, .05);
        }
      }
    }
  }

  section.composeMain {
    position: absolute;
    top: $sMainCaptionBarHeight;
    width: 100%;
    height: calc(100% - $sMainCaptionBarHeight);
    display: flex;
    justify-content: left;
    align-items: center;

    .sidebar {
      width: var(--s-main-frame-sidebar-width);
      height: 100%;
    }

    .sidebarPlaceholder {
      width: 8px;
      margin-top: 4px;
      height: calc(100% - 4px);
      background: repeating-linear-gradient(
        48deg,
        rgba(68, 206, 246, 0.5),
        rgba(68, 206, 246, 0.5) 10px,
        white 10px,
        white 20px
      );
    }

    main.container {
      padding: 4px 0px 7px 5px;
      background-color: var(--s-main-frame-bg-darkness-color);
      @include beautifulBar(auto);
      @include overflow;
    }
  }
}
</style>
