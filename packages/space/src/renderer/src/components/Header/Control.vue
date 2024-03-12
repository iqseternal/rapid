<template>
  <Subfield class="overflow-hidden">
    <div />
    <Subfield :gap="4" style="margin: 0 8px;justify-content: flex-end;" class="control overflow-hidden">
      <slot name="control" />
      <template v-if="!props.isDialog && !props.isPane">
        <Widget title="全屏" icon="FullscreenOutlined" @click="() => windowAutoFullScreen()" />
      </template>
      <DeBugWidget />
      <template v-if="!props.isDialog">
        <Widget title="最小化" :src="windowMinSvg" @click="() => minWindow()" />
      </template>
      <template v-if="!props.isPane">
        <Widget title="还原窗口" :src="windowRegionSvg" @click="() => reductionWindow()" />
      </template>
      <Widget title="关闭窗口" :src="windowCloseSvg" @click="() => closeWindow()" />
    </Subfield>
  </Subfield>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { IPC_MAIN_WINDOW, IPC_RENDER_WINDOW, CONFIG, IS_DEV, IS_PROD } from '#/constants';
import { windowCloseSvg, windowMaxSvg, windowMinSvg, windowRegionSvg } from '@renderer/assets';
import { useMousetrap } from '@renderer/hooks/useMousetrap';
import { windowMax, windowMin, windowClose, windowReduction, windowDevtool, windowAutoFullScreen } from '@renderer/actions';

import Subfield from '@components/Subfield';
import Widget from '@components/Widget';

const props = defineProps({
  isPane: { type: Boolean, default: false },
  isDialog: { type: Boolean, default: false } // 弹窗, 警告类型
});

const isMaximized = ref(false);

const openDevTool = () => windowDevtool(true, { mode: 'detach' });
const maxWindow = () => windowMax();
const minWindow = () => windowMin();
const reductionWindow = () => windowReduction();
const closeWindow = () => windowClose();

const DeBugWidget = IS_DEV ? <Widget title="打开开发者工具" icon="BugFilled" onClick={openDevTool} /> : <div></div>;

useMousetrap(['ctrl+shift+i', 'command+shift+i'], () => openDevTool());
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";
</style>
