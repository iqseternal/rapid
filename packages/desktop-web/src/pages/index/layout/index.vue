<template>
  <div class="compose">
    <!-- <Sidebar class="sidebar" /> -->
    <div class="sidebarPlaceholder" />
    <Header class="header">
      <template #left>
        <Slogan ref="sloganInstance">
          <template #center>
            <Subfield class="navMenu w-full" style="justify-content: flex-start;">
              <template v-for="navMenu in navMenus" :key="navMenu.title">
                <AutoDropdownMenu :menu="navMenu.menu" trigger="click">
                  <span class="navItemTitle">{{ navMenu.title }}</span>
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
        <Search />
      </template>
    </Header>
    <main class="container">
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, nextTick, onBeforeMount, ref, onErrorCaptured, computed, reactive, onDeactivated, onBeforeUpdate, onActivated } from 'vue';
import type { Ref } from 'vue';
import type { DropdownDataType, ComboBoxMenuDataType } from '@components/DropdownMenu';
import { DropdownMenu, MenuDriver, SingleMenu, ComboBoxMenu, AutoDropdownMenu } from '@components/DropdownMenu';
import { UserOutlined, ReloadOutlined, BugOutlined } from '@ant-design/icons-vue';
import { hotKeys, windowReload, windowDevtool, copyText, pasteText, windowResizeAble, openSettingPage, WindowPopup, windowResetCustomSize } from '@/actions';
import { windowMaxSvg, windowCloseSvg } from '@/assets';
import { canCopyText } from '@rapid/libs/common';
import { useMousetrap, useFadeIn, useEventListener, useResizeObserver, useStorageStack } from '@/hooks';
import { fileMenu, editMenu, helpMenu } from '@/menus';
import type { HeaderInstance, SloganInstance } from '@components/Header';
import { Header, Indicator, Slogan, Search } from '@components/Header';
import { isDef } from '@suey/pkg-utils';

import Sidebar from './sidebar/index.vue';
import IconFont from '@components/IconFont';
import Widget from '@components/Widget';
import Subfield from '@components/Subfield';

const sloganInstance = ref<SloganInstance>();

interface NavMenuItem {
  /** 菜单附带的响应式数据,当原来的数据被更改的时候,这里跟着改 */
  menu: DropdownDataType | Ref<DropdownDataType>;
  title: string;
  /** 当容器宽度大于这个宽度的时候才能展示,否则被收纳进栈 */
  maxWidth: number;
  /** 被收纳的时候展示的mark */
  mark?: IconRealKey;
}

const { preStack: navMenus, nextStack: navMenusStack, pushStack, popStack } = useStorageStack<NavMenuItem>({
  preStack: [
    { menu: fileMenu, title: '文件', mark: 'FolderOutlined', maxWidth: 120 },
    { menu: editMenu, title: '编辑', mark: 'EditOutlined', maxWidth: 120 },
    { menu: helpMenu, title: '帮助', maxWidth: 160 }
  ],
  nextStack: []
});

/** 转换被收纳的菜单项,并作出展示数据 */
const navMenusStackMenu = computed<DropdownDataType>(() => navMenusStack.value.map(stackItem => ({
  title: stackItem.title,
  shortcut: 'Ctrl',
  mark: stackItem.mark,
  children: stackItem.menu
})));

useFadeIn();

useResizeObserver(computed(() => sloganInstance.value?.centerContainer), () => {
  const dom = sloganInstance.value?.centerContainer;
  if (!isDef(dom)) return;

  pushStack((current) => current.maxWidth >= dom.clientWidth);
  popStack((current) => current.maxWidth < dom.clientWidth);
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

  .sidebar {
    /* width: var(--s-main-frame-sidebar-width); */
    height: calc(100% - $sMainCaptionBarHeight);
    position: absolute;
    top: calc($sMainCaptionBarHeight);
    left: 0px;
  }

  .sidebarPlaceholder {
    position: absolute;
    width: 8px;
    height: calc(100% - $sMainCaptionBarHeight - 4px);
    /* background-color: red; */
    background: repeating-linear-gradient(
      48deg,
      rgba(68, 206, 246, 0.5),
      rgba(68, 206, 246, 0.5) 10px,
      white 10px,
      white 20px
    );
    top: calc($sMainCaptionBarHeight + 4px);
  }

  main.container {
    padding: 4px 5px;
    /* width: calc(100% - var(--s-main-frame-sidebar-width)); */
    width: calc(100% - 4px);
    height: calc(100% - $sMainCaptionBarHeight);
    background-color: var(--s-main-frame-bg-darkness-color);
    position: absolute;
    top: calc($sMainCaptionBarHeight);
    /* left: var(--s-main-frame-sidebar-width); */

    left: 8px;



    @include beautifulBar(auto);
    @include overflow;
  }
}
</style>
