<template>
  <div class="loginPage">
    <Header isPane />
    <div class="contain">
      <template v-if="stage === DEFINE_PROVIDE_PROP_KEYS.R_CPT_REQUEST_STAGE">
        <LoginLoading @cancel="() => (stage = preStageKey)" />
      </template>
      <template v-else>
        <Subfield style="margin-top: 40px;">
          <div />
          <ASpace>
            <Logo style="display: inline-block;width: 40px;height: 40px;" />
            <BlendedText text="SPACE FOR YOUR PLATFORM" :distSpacing="4" style="display: inline-block;font-size: 40px;line-height: 40px;" />
          </ASpace>
          <div />
        </Subfield>

        <Subfield v-if="stage === DEFINE_PROVIDE_PROP_KEYS.R_CPT_LOGIN_STAGE" style="margin-top: 10px;height: 70%;">
          <Subfield>
            <div />
            <img alt="" :src="loginTakeFilePng" />
          </Subfield>
          <div />
          <Subfield>
            <Login />
          </Subfield>
        </Subfield>
        <Subfield v-else-if="stage === DEFINE_PROVIDE_PROP_KEYS.R_CPT_REGISTER_STAGE">
          <div />
          <Register />
          <div />
        </Subfield>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue';
import { onBeforeMount, onBeforeUnmount, onMounted, ref, computed, provide } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { IPC_MAIN_WINDOW, CONFIG } from '#/constants';
import { useMousetrap, useFadeIn, useDisableRouterBack } from '@renderer/hooks';
import { loginTakeFilePng } from '@renderer/assets';
import { useStage, DEFINE_PROVIDE_PROP_KEYS } from './useStage';

import {
  windowSetSize, windowResizeAble, windowRelaunch, windowShow, windowSetPosition,
  windowResetCustomSize, hotKeys, windowReload, openSettingPage
} from '@renderer/actions';

import { Subfield, SubfieldSpace } from '@components/Subfield';
import Widget from '@components/Widget';
import IconFont from '@components/IconFont';
import BlendedText from '@components/BlendedText';

import Header from '@components/Header';
import Logo from '@components/Logo';

import Login from './Login.vue';
import LoginLoading from './LoginLoading.vue';
import Register from './Register.vue';

const [stage, preStageKey] = useStage();

useFadeIn(async () => {
  const setSize = await windowSetSize(850, 550);
  const setResizeable = await windowResizeAble(false);
  if (!setSize.data || !setResizeable.data) windowRelaunch();
  // 如果一切没有问题, 那么就准备就绪, 就可以展示页面了
  // windowSetPosition('center');
  windowShow(true);
});
useDisableRouterBack();

onBeforeUnmount(() => {
  windowResizeAble(true);
  windowResetCustomSize('mainWindow');
});

useMousetrap(hotKeys.reload.allKey, windowReload);
</script>

<style lang="scss" scoped>
@import "@scss/mixin.scss";
@import "@scss/var.scss";

.loginPage {
  width: 100vw;
  height: 100vh;
  background-color: var(--s-main-frame-contain-color);

  .contain {
    height: calc(100vh - $sMainCaptionBarHeight);
  }
}
</style>
