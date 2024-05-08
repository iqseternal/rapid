<template>
  <div class="flex-left">
    <Tool title="锁定" :active="metaState.locked" @click="useLock">
      <IconFont :type="metaState.locked ? 'LockOutlined' : 'UnlockOutlined'" />
    </Tool>
    <!-- <UnlockOutlined /> -->
    <!-- <Tool title="预览" :active="metaState.preview" @click="usePreview">
      <IconFont :type="metaState.preview ? 'EyeOutlined' : 'EyeInvisibleOutlined'" />
    </Tool> -->

    <Tool title="刷新" @click="metaRefresh">
      <IconFont type="ReloadOutlined" />
    </Tool>
    <Tool :autoHover="false">
      <div style="width: 64px" />
    </Tool>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Pen, PenType, deepClone } from '@meta2d/core';
import { message } from 'ant-design-vue';
import { DropdownMenu, MenuDriver, ComboBoxMenu, SingleMenu } from '@components/DropdownMenu';
import { lineTypes, fromArrows, toArrows } from '@meta/preset';
import { onUndo, onRedo, onAddShape, onCopy, onDelete, onPaste, onScaleDefault, onScaleWindow, useMetaState } from '@/meta';

import Widget from '@components/Widget';
import IconFont from '@components/IconFont';
import Tool from './Tool.vue';

const { metaState, metaRefresh, useLock, usePreview } = useMetaState();
</script>

<style lang="scss" scoped>

</style>
