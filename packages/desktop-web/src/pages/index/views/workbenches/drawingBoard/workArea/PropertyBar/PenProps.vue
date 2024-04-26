
<template>
  <ATabs>
    <ATabPane :key="appearanceTab.key" :tab="appearanceTab.tab">
      <ACollapse>
        <template v-for="item in appearanceTab.list" :key="item.key">
          <ACollapsePanel :header="item.header">
            <AForm>
              <template v-for="(prop, index) in item.list" :key="index">
                <AFormItem :name="prop.prop" :label="prop.label">
                  <template v-if="prop.showType === ShowTypeMode.InputNumber">
                    <AInput v-model:value="penPropsState[prop.prop]" v-bind="prop.attrs" @change="() => prop.onChange(penPropsState[prop.prop])" />
                  </template>
                  <template v-else-if="prop.showType === ShowTypeMode.InputString">
                    <AInput v-model:value="penPropsState[prop.prop]" v-bind="prop.attrs" @change="() => prop.onChange(penPropsState[prop.prop])" />
                  </template>
                  <template v-else-if="prop.showType === ShowTypeMode.Switch">
                    <ASwitch v-model:checked="penPropsState[prop.prop]" v-bind="prop.attrs" @change="() => prop.onChange(penPropsState[prop.prop])" />
                  </template>

                  <template v-else-if="prop.showType === ShowTypeMode.Color">
                    <PickColors v-model:value="penPropsState[prop.prop]" v-bind="prop.attrs" @change="() => prop.onChange(penPropsState[prop.prop])" />
                  </template>

                </AFormItem>
              </template>
            </AForm>
          </ACollapsePanel>
        </template>
      </ACollapse>
    </ATabPane>
  </ATabs>


  <ATabs class="propsPanel" v-if="false">
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
            <AFormItem name="ratio" label="锁定宽高比">
              <ASwitch v-model:checked="penPropsState.ratio" @change="setCurrentPenProps({ ratio: penPropsState.ratio })" />
            </AFormItem>

            <AFormItem name="borderRadius" label="圆角">
              <AInput v-model:value="penPropsState.borderRadius" type="number" :min="0" @change="setCurrentPenProps({ borderRadius: penPropsState.borderRadius })" />
            </AFormItem>

            <AFormItem name="rotate" label="旋转">
              <AInput v-model:value="penPropsState.rotate" type="number" @change="setCurrentPenProps({ rotate: penPropsState.rotate })" />
            </AFormItem>


            <AFormItem name="paddingTop" label="内边距上">
              <AInput v-model:value="penPropsState.paddingTop" type="number" @change="setCurrentPenProps({ paddingTop: penPropsState.paddingTop })" />
            </AFormItem>
            <AFormItem name="paddingBottom" label="内边距下">
              <AInput v-model:value="penPropsState.paddingBottom" type="number" @change="setCurrentPenProps({ paddingBottom: penPropsState.paddingBottom })" />
            </AFormItem>
            <AFormItem name="paddingLeft" label="内边距左">
              <AInput v-model:value="penPropsState.paddingLeft" type="number" @change="setCurrentPenProps({ paddingLeft: penPropsState.paddingLeft })" />
            </AFormItem>
            <AFormItem name="paddingRight" label="内边距右">
              <AInput v-model:value="penPropsState.paddingRight" type="number" @change="setCurrentPenProps({ paddingRight: penPropsState.paddingRight })" />
            </AFormItem>
            <AFormItem name="progress" label="进度">
              <AInput v-model:value="penPropsState.progress" type="number" @change="setCurrentPenProps({ progress: penPropsState.progress })" />
            </AFormItem>
            <AFormItem name="verticalProgress" label="垂直进度">
              <ASwitch v-model:checked="penPropsState.verticalProgress" @change="setCurrentPenProps({ verticalProgress: penPropsState.verticalProgress })" />
            </AFormItem>
            <AFormItem name="flipX" label="水平翻转">
              <ASwitch v-model:checked="penPropsState.flipX" @change="setCurrentPenProps({ flipX: penPropsState.flipX })" />
            </AFormItem>
            <AFormItem name="flipY" label="垂直翻转">
              <ASwitch v-model:checked="penPropsState.flipY" @change="setCurrentPenProps({ flipY: penPropsState.flipY })" />
            </AFormItem>
          </AForm>
        </ACollapsePanel>


        <ACollapsePanel :key="1.3" header="样式">
          <AForm>
            <AFormItem name="lineDash" label="线条样式">
              <ASelect v-model:value="penPropsState.lineDash" @change="setCurrentPenProps({ lineDash: penPropsState.lineDash })">
                <ASelectOption :value="0">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height: 20px;width: 80px;">
                    <g fill="none" stroke="black" stroke-width="1">
                      <path d="M0 9 l85 0" />
                    </g>
                  </svg>
                </ASelectOption>
                <ASelectOption :value="1">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height: 20px;width: 80px;">
                    <g fill="none" stroke="black" stroke-width="1">
                      <path stroke-dasharray="5 5" d="M0 9 l85 0" />
                    </g>
                  </svg>
                </ASelectOption>
                <ASelectOption :value="2">
                  <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="height: 20px;width: 80px;">
                    <g fill="none" stroke="black" stroke-width="1">
                      <path stroke-dasharray="10 10 2 10" d="M0 9 l85 0" />
                    </g>
                  </svg>
                </ASelectOption>
              </ASelect>
            </AFormItem>







          </AForm>
        </ACollapsePanel>
      </ACollapse>
    </ATabPane>

    <AForm v-if="false">
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

import { ShowTypeMode, appearanceTab } from '@meta/preset';

import { useEventListener, useStorageStack, useSurvivalCycle } from '@/hooks';

import PickColors from 'vue-pick-colors';
import { bind } from 'mousetrap';

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
