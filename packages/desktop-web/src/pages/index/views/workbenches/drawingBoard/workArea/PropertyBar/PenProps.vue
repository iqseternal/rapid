
<template>
  <ATabs class="propsPanel">
    <ATabPane :key="1" tab="位置与大小">
      <ACollapse>
        <ACollapsePanel :key="1.1" header="位置">
          <AForm>
            <AFormItem name="x" label="x">
              <AInput v-model:value="penPropsState.x" type="number" @change="setCurrentPenProps({ x: penPropsState.x })" />
            </AFormItem>
            <AFormItem name="y" label="y">
              <AInput v-model:value="penPropsState.y" type="number" @change="setCurrentPenProps({ y: penPropsState.y })" />
            </AFormItem>
          </AForm>
        </ACollapsePanel>

        <ACollapsePanel :key="1.2" header="大小">
          <AForm>
            <AFormItem name="width" label="宽度">
              <AInput v-model:value="penPropsState.width" type="number" @change="setCurrentPenProps({ width: penPropsState.width })" />
            </AFormItem>
            <AFormItem name="height" label="高度">
              <AInput v-model:value="penPropsState.height" type="number" @change="setCurrentPenProps({ height: penPropsState.height })" />
            </AFormItem>
          </AForm>
        </ACollapsePanel>

      </ACollapse>
    </ATabPane>

    <AForm v-if="pen">
      <h5>图元</h5>

      <AFormItem name="text" label="文本">
        <AInput v-model:value="pen.text" @change="changeValue('text')" />
      </AFormItem>

      <AFormItem name="color" label="颜色">
        <PickColors v-model:value="pen.color" @change="changeValue('color')" />
      </AFormItem>

      <AFormItem name="background" label="背景">
        <PickColors v-model:value="pen.background" @change="changeValue('background')" />
      </AFormItem>

      <AFormItem name="dash" label="线条">
        <ASelect v-model:value="pen.dash" @change="changeValue('dash')">
          <ASelectOption :key="0" :value="0" label="实线" />
          <ASelectOption :key="1" :value="1" label="虚线" />
        </ASelect>
      </AFormItem>

      <AFormItem name="borderRadius" label="圆角">
        <AInputNumber v-model:value="pen.borderRadius" :min="0" :max="1" :step="0.01" @change="changeValue('borderRadius')" />
      </AFormItem>

      <AFormItem name="globalAlpha" label="不透明度">
        <ASlider v-model:value="pen.globalAlpha" :min="0" :max="1" :step="0.01" @change="changeValue('globalAlpha')" />
      </AFormItem>

      <AFormItem name="x" label="X">
        <AInputNumber v-model:value="rect.x" @change="changeRect('x')" />
      </AFormItem>

      <AFormItem name="y" label="Y">
        <AInputNumber v-model:value="rect.y" @change="changeRect('y')" />
      </AFormItem>

      <AFormItem name="width" label="宽">
        <AInputNumber v-model:value="rect.width" @change="changeRect('width')" />
      </AFormItem>

      <AFormItem name="height" label="高">
        <AInputNumber v-model:value="rect.height" @change="changeRect('height')" />
      </AFormItem>

      <ADivider />

      <AFormItem name="textAlign" label="文字水平对齐">
        <ASelect v-model:value="pen.textAlign" @change="changeValue('textAlign')">
          <ASelectOption key="left" value="left" label="居左" />
          <ASelectOption key="center" value="center" label="居中" />
          <ASelectOption key="right" value="right" label="居右" />
        </ASelect>
      </AFormItem>

      <ADivider />

      <ASpace>
        <AButton @click="top">置顶</AButton>
        <AButton @click="bottom">置底</AButton>
        <AButton @click="up">上一层</AButton>
        <AButton @click="down">下一层</AButton>
      </ASpace>
    </AForm>
  </ATabs>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useSelections, useDataState, useMetaState, useOptionsState, usePenProps } from '@/meta';
import { isUndefined } from '@suey/pkg-utils';
import { SelectionMode } from '@meta/useSelections';

import { useEventListener, useStorageStack, useSurvivalCycle } from '@/hooks';

import PickColors from 'vue-pick-colors';

const { dataState, onChangeData, onChangeBkImage, onChangeGridRotate } = useDataState();
const { metaState, metaRefresh } = useMetaState();
const { optionsState, onChangeOptions } = useOptionsState();
const { penPropsState, setCurrentPenProps } = usePenProps();

const { selections } = useSelections();

const pen = ref();

const rect = ref();

const getPen = () => {
  if (selections.mode !== SelectionMode.Pen) return;

  pen.value = selections.pen;
  if (isUndefined(pen.value.globalAlpha)) pen.value.globalAlpha = 1;
  rect.value = meta2d.getPenRect(pen.value);
}


useSurvivalCycle({

  survival: () => {
    meta2d.on('valueUpdate', (e) => {


      console.log(e);
    })
  },
  extinction: () => {

  }
})


onMounted(getPen);

const lineDashs = [void 0, [5, 5]];

const changeValue = (prop: string) => {
  const v: any = { id: pen.value.id };
  v[prop] = pen.value[prop];
  if (prop === 'dash') {
    v.lineDash = lineDashs[v[prop]];
  }
  meta2d.setValue(v, { render: true });
};

const changeRect = (prop: string) => {
  const v: any = { id: pen.value.id };
  v[prop] = rect.value[prop];
  meta2d.setValue(v, { render: true });
};

const top = () => {
  meta2d.top();
  meta2d.render();
};
const bottom = () => {
  meta2d.bottom();
  meta2d.render();
};
const up = () => {
  meta2d.up();
  meta2d.render();
};
const down = () => {
  meta2d.down();
  meta2d.render();
};



const watcher = watch(() => selections.pen?.id, getPen);


onUnmounted(watcher);
</script>
