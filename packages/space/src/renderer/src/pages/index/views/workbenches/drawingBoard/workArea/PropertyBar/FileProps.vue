
<template>
  <div class="propsPanel">
    <AForm>
      <h5>图纸</h5>

      <AFormItem name="name" label="图纸名称">
        <AInput v-model:value="data.name" @change="onChangeData" />
      </AFormItem>
      <AFormItem name="grid" label="网格">
        <ASwitch v-model:checked="options.grid" @change="onChangeOptions" />
      </AFormItem>
      <AFormItem name="gridSize" label="网格大小">
        <AInput v-model:value="options.gridSize" @change="onChangeOptions" />
      </AFormItem>
      <AFormItem name="gridRotate" label="网格角度">
        <AInput v-model:value="options.gridRotate" @change="onChangeOptions" />
      </AFormItem>

      <AFormItem name="gridColor" label="网格颜色">
        <PickColors v-model:value="options.gridColor" showAlpha :width="30" :format="colorFormat" @change="onChangeOptions" />
      </AFormItem>

      <AFormItem name="rule" label="标尺">
        <ASwitch v-model:checked="options.rule" @change="onChangeOptions" />
      </AFormItem>

      <AFormItem name="background" label="背景颜色">
        <PickColors v-model:value="data.background" showAlpha :width="30" :format="colorFormat"  @change="onChangeData" />
      </AFormItem>

      <AFormItem name="color" label="图元默认颜色">
        <PickColors v-model:value="data.color" showAlpha :width="30" :format="colorFormat"  @change="onChangeData" />
      </AFormItem>
    </AForm>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref } from 'vue';

import {  } from '@renderer/meta';

import PickColors, { Format } from 'vue-pick-colors';

import RFormItem from '@components/RFormItem';
import RInput from '@components/RInput';
import IconFont from '@components/IconFont';

const data = reactive({
  name: '',
  background: void 0,
  color: void 0
})

const options = reactive({
  grid: false,
  gridSize: 10,
  gridRotate: void 0,
  gridColor: '#f00',
  rule: true
})
const colorFormat = ref<Format>('hex');


const onChangeData = () => {
  Object.assign(meta2d.store.data, data);

  // @ts-ignore
  meta2d.store.patchFlagsBackground = true;
  meta2d.render();
};

const onChangeOptions = () => {
  meta2d.setOptions(options);
  meta2d.store.patchFlagsTop = true;

  // @ts-ignore
  meta2d.store.patchFlagsBackground = true;
  meta2d.render();
};

onMounted(() => {
  const d: any = meta2d.data();
  data.name = d.name || '';
  data.background = d.background;
  data.color = d.color;

  Object.assign(options, meta2d.getOptions());
});

</script>

<style lang="scss" scoped>
@import '@scss/var.scss';

.propsPanel {





}
</style>
