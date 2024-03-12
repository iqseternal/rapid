<template>
  <Subfield>
    <template v-if="$slots.left"><slot name="left" /></template>
    <template v-else>
      <Subfield gap="10px" class="navMenu" style="justify-content: flex-start;width: unset;flex: unset;flex-shrink: 0;">
        <Indicator />
      </Subfield>
    </template>

    <template v-if="$slots.center">
      <div ref="centerContainer" class="flex-start w-full overflow-x-hidden"><slot name="center" /></div>
    </template>
    <template v-else><span class="slogan animate__animated animate__slideInLeft">{{ 'SPACE' }}</span></template>

    <Subfield gap="2px" style="width: unset;flex: unset;flex-shrink: 0;">
      <Widget title="后退 Alt+LeftArrow" @click="() => router.back()">
        <IconFont type="LeftOutlined" :size="14" />
      </Widget>
      <Widget title="前进 Alt+RightArrow" @click="() => router.forward()">
        <IconFont type="RightOutlined" :size="14" />
      </Widget>
      <slot name="right" />
      <div style="width: 6px;" />
    </Subfield>
  </Subfield>
</template>

<script lang="ts" setup>
import { ref, onMounted, h, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ConfigProvider, Tooltip, Space } from 'ant-design-vue';
import { CONFIG } from '#/constants';
import { useMousetrap } from '@renderer/hooks';
import { useAutoAnimate, vAutoAnimate } from '@formkit/auto-animate/vue';
import { DropdownMenu, ComboBoxMenu, SingleMenu, MenuDriver } from '@components/DropdownMenu';
import type { SloganInstance } from './declare';
import Widget from '@components/Widget';
import Indicator from './Indicator.vue';
import Subfield from '@components/Subfield';
import IconFont from '@components/IconFont';

const router = useRouter();

const centerContainer = ref<SloganInstance['centerContainer']>();

const expose = reactive({
  centerContainer
})

useMousetrap([
  ['alt+left', () => router.back(), 'keyup'],
  ['alt+right', () => router.forward(), 'keyup']
]);

defineExpose<SloganInstance>(expose);
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";

.slogan {
  background-image: -webkit-linear-gradient(left, #e26846, #d75d10, #ebab7a, #f7a76b);
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  font-size: 18px;
  white-space: nowrap;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color:transparent;
}

.navMenu {
  color: rgba(0, 0, 0, .6);
  font-size: 12px;
  transition: all .5s linear;
  user-select: none;
  @include appRegionNo;

  &:hover { color: rgba(0, 0, 0, 1); }
}
</style>
