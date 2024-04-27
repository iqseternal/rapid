<template>
  <AForm>
    <AFormItem name="" label="动画类型">
      <ASelect v-model:value="animate.frames" placeholder="选择事件类型">
        <template v-for="item in animateType" :key="item.key">
          <ASelectOption :value="item.frames">{{ item.name }}</ASelectOption>
        </template>
      </ASelect>
    </AFormItem>

    <AFormItem name="" label="动画时长">
      <AInput v-model:value="animate.duration" disabled />
    </AFormItem>

    <AFormItem name="" label="自动播放">
      <ASwitch v-model:checked="animate.autoPlay" />
    </AFormItem>

    <ASpace>
      <AButton type="primary" @click="startAnimate">开始动画</AButton>
      <AButton type="dashed" @click="pauseAnimate">暂停动画</AButton>
      <AButton type="dashed" @click="stopAnimate">停止动画</AButton>

    </ASpace>

  </AForm>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { animateType } from '@meta/preset';
import { useSelections } from '@meta/useSelections';

const { selections } = useSelections();

const animate = ref({
  name: '',
  frames: [],
  key: '',
  duration: 0,
  autoPlay: false,
  animateCycle: Infinity
})

function startAnimate(){
  if (!selections.pen) return;

  // @ts-ignore
  selections.pen.animateName = animate.value.name
  // @ts-ignore
  selections.pen.animateDuration = animate.value.frames[0].duration
  selections.pen.frames = animate.value.frames
  selections.pen.autoPlay = animate.value.autoPlay
  selections.pen.animateCycle = animate.value.animateCycle
  meta2d.startAnimate(selections.pen.id)
}

function pauseAnimate() {
  if (!selections.pen) return;

  meta2d.pauseAnimate(selections.pen.id)
}

function stopAnimate() {
  if (!selections.pen) return;

  meta2d.stopAnimate(selections.pen.id)
}
</script>

<style lang="scss" scoped>
</style>
