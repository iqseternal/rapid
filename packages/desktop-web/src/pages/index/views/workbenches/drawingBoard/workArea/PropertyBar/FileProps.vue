<template>
  <ATabs>
    <ATabPane :key="1" tab="图纸">
      <ACollapse>
        <ACollapsePanel :key="1.1" header="图纸">
          <AForm>
            <AFormItem name="name" label="图纸名称">
              <AInput v-model:value="dataState.name" @change="onChangeData('name')" />
            </AFormItem>
          </AForm>
        </ACollapsePanel>
        <ACollapsePanel :key="1.2" header="画布">
          <AForm>
            <AFormItem name="color" label="图元默认颜色">
              <PickColors v-model:value="optionsState.color" v-bind="pickColorsAttrs" @change="onChangeOptions('color')" />
            </AFormItem>
            <AFormItem name="penBackground" label="画笔填充颜色">
              <PickColors v-model:value="dataState.penBackground" @change="onChangeData('penBackground')" />
            </AFormItem>
            <AFormItem name="background" label="背景颜色">
              <PickColors v-model:value="optionsState.background" v-bind="pickColorsAttrs" @change="onChangeOptions('background')" />
            </AFormItem>


            <AFormItem name="bkImage" label="图片背景">
              <AInput :placeholder="dataState.bkImage" type="file" @change="onChangeBkImage" />
            </AFormItem>

            <AFormItem name="rule" label="标尺">
              <ASwitch v-model:checked="optionsState.rule" @change="onChangeOptions('rule')" />
            </AFormItem>

            <AFormItem name="ruleColor" label="标尺颜色">
              <PickColors v-model:value="optionsState.ruleColor" v-bind="pickColorsAttrs" @change="onChangeOptions('ruleColor')" />
            </AFormItem>

            <AFormItem name="grid" label="网格">
              <ASwitch v-model:checked="optionsState.grid" @change="onChangeOptions('grid')" />
            </AFormItem>
            <AFormItem name="gridColor" label="网格颜色">
              <PickColors v-model:value="optionsState.gridColor" v-bind="pickColorsAttrs" @change="onChangeOptions('gridColor')" />
            </AFormItem>
            <AFormItem name="gridSize" label="网格大小">
              <AInput v-model:value="optionsState.gridSize" @change="onChangeOptions('gridSize')" />
            </AFormItem>
            <AFormItem name="gridRotate" label="网格角度">
              <!-- 奇怪的属性分类 -->
              <AInput v-model:value="dataState.gridRotate" type="number" @change="onChangeGridRotate" />
            </AFormItem>
          </AForm>
        </ACollapsePanel>
      </ACollapse>
    </ATabPane>

    <ATabPane :key="2" tab="全局配置">
      <ACollapse>
        <ACollapsePanel :key="2.1" header="画笔">
          <AFormItem name="color" label="默认颜色">
            <PickColors v-model:value="optionsState.color" v-bind="pickColorsAttrs" @change="onChangeOptions('color')" />
          </AFormItem>

          <AFormItem name="activeColor" label="选中颜色">
            <PickColors v-model:value="optionsState.activeColor" v-bind="pickColorsAttrs" @change="onChangeOptions('activeColor')" />
          </AFormItem>

          <AFormItem name="hoverColor" label="hover颜色">
            <PickColors v-model:value="optionsState.hoverColor" v-bind="pickColorsAttrs" @change="onChangeOptions('hoverColor')" />
          </AFormItem>

          <AFormItem name="hoverBackground" label="hover背景颜色">
            <PickColors v-model:value="optionsState.hoverBackground" v-bind="pickColorsAttrs" @change="onChangeOptions('hoverBackground')" />
          </AFormItem>

        </ACollapsePanel>


        <ACollapsePanel :key="2.2" header="锚点">
          <AFormItem name="anchorColor" label="锚点颜色">
            <PickColors v-model:value="optionsState.anchorColor" v-bind="pickColorsAttrs" @change="onChangeOptions('anchorColor')" />
          </AFormItem>

          <AFormItem name="anchorRadius" label="锚点半径">
            <AInput v-model:value="optionsState.anchorRadius" type="number" @change="onChangeOptions('anchorRadius')" />
          </AFormItem>

          <AFormItem name="anchorBackground" label="锚点背景颜色">
            <PickColors v-model:value="optionsState.anchorBackground" v-bind="pickColorsAttrs" @change="onChangeOptions('anchorBackground')" />
          </AFormItem>
        </ACollapsePanel>

        <ACollapsePanel :key="2.3" header="辅助线">
          <AFormItem name="dockColor" label="锚点颜色">
            <PickColors v-model:value="optionsState.dockColor" v-bind="pickColorsAttrs" @change="onChangeOptions('dockColor')" />
          </AFormItem>

          <AFormItem name="dragColor" label="框选颜色">
            <PickColors v-model:value="optionsState.dragColor" v-bind="pickColorsAttrs" @change="onChangeOptions('dragColor')" />
          </AFormItem>

          <AFormItem name="animateColor" label="连线动画颜色">
            <PickColors v-model:value="optionsState.animateColor" v-bind="pickColorsAttrs" @change="onChangeOptions('animateColor')" />
          </AFormItem>
        </ACollapsePanel>


        <ACollapsePanel :key="2.4" header="文字">
          <AFormItem name="textColor" label="文字颜色">
            <PickColors v-model:value="optionsState.textColor" v-bind="pickColorsAttrs" @change="onChangeOptions('textColor')" />
          </AFormItem>


          <AFormItem name="fontFamily" label="字体">
            <AInput v-model:value="optionsState.fontFamily" @change="onChangeOptions('fontFamily')" />
          </AFormItem>

          <AFormItem name="fontSize" label="文字大小">
            <AInput v-model:value="optionsState.fontSize" type="number" @change="onChangeOptions('fontSize')" />
          </AFormItem>

          <AFormItem name="lineHeight" label="文字行高">
            <AInput v-model:value="optionsState.lineHeight" type="number" @change="onChangeOptions('lineHeight')" />
          </AFormItem>

          <AFormItem name="textAlign" label="文字水平对齐方式">
            <ASelect v-model:value="optionsState.textAlign" @change="onChangeOptions('textAlign')">
              <ASelectOption key="left">left</ASelectOption>
              <ASelectOption key="center">center</ASelectOption>
              <ASelectOption key="right">right</ASelectOption>
            </ASelect>
          </AFormItem>

          <AFormItem name="textBaseline" label="文字水平对齐方式">
            <ASelect v-model:value="optionsState.textBaseline" @change="onChangeOptions('textBaseline')">
              <ASelectOption key="top">top</ASelectOption>
              <ASelectOption key="middle">middle</ASelectOption>
              <ASelectOption key="bottom">bottom</ASelectOption>
            </ASelect>
          </AFormItem>
        </ACollapsePanel>

        <ACollapsePanel :key="2.5" header="鼠标样式">
          <AFormItem name="rotateCursor" label="旋转控制点的">
            <AInput v-model:value="optionsState.rotateCursor" @change="onChangeOptions('rotateCursor')" />
          </AFormItem>
          <AFormItem name="hoverCursor" label="hover样式">
            <AInput v-model:value="optionsState.hoverCursor" @change="onChangeOptions('hoverCursor')" />
          </AFormItem>
        </ACollapsePanel>


        <ACollapsePanel :key="2.6" header="禁止">
          <AFormItem name="disableInput" label="禁止双击弹出输入框">
            <ASwitch v-model:checked="optionsState.disableInput" @change="onChangeOptions('disableInput')" />
          </AFormItem>

          <AFormItem name="disableRotate" label="禁止旋转">
            <ASwitch v-model:checked="optionsState.disableRotate" @change="onChangeOptions('disableRotate')" />
          </AFormItem>
          <AFormItem name="disableAnchor" label="禁止显示锚点">
            <ASwitch v-model:checked="optionsState.disableAnchor" @change="onChangeOptions('disableAnchor')" />
          </AFormItem>
          <AFormItem name="disableEmptyLine" label="禁止存在两端关联缺少的连线">
            <ASwitch v-model:checked="optionsState.disableEmptyLine" @change="onChangeOptions('disableEmptyLine')" />
          </AFormItem>
          <AFormItem name="disableRepeatLine" label="禁止存在关联重复的连线">
            <ASwitch v-model:checked="optionsState.disableRepeatLine" @change="onChangeOptions('disableRepeatLine')" />
          </AFormItem>
          <AFormItem name="disableScale" label="禁止画布缩放">
            <ASwitch v-model:checked="optionsState.disableScale" @change="onChangeOptions('disableScale')" />
          </AFormItem>


          <AFormItem name="disableLineDock" label="禁止辅助线">
            <ASwitch v-model:checked="optionsState.disableLineDock" @change="onChangeOptions('disableLineDock')" />
          </AFormItem>
          <AFormItem name="disableTranslate" label="禁止画布移动">
            <ASwitch v-model:checked="optionsState.disableTranslate" @change="onChangeOptions('disableTranslate')" />
          </AFormItem>
        </ACollapsePanel>

        <ACollapsePanel :key="2.7" header="画布设置">
          <AFormItem name="minScale" label="画布最小缩放比例">
            <ASwitch v-model:checked="optionsState.minScale" @change="onChangeOptions('minScale')" />
          </AFormItem>
          <AFormItem name="maxScale" label="画布最大缩放比例">
            <ASwitch v-model:checked="optionsState.maxScale" @change="onChangeOptions('maxScale')" />
          </AFormItem>
        </ACollapsePanel>

        <ACollapsePanel :key="2.8" header="其他设置">
          <AFormItem name="autoAnchor" label="自动选中节点锚点">
            <ASwitch v-model:checked="optionsState.autoAnchor" @change="onChangeOptions('autoAnchor')" />
          </AFormItem>

          <AFormItem name="interval" label="绘制帧时长">
            <AInput v-model:value="optionsState.interval" type="number" @change="onChangeOptions('interval')" />
          </AFormItem>
          <AFormItem name="animateInterval" label="动画帧时长">
            <AInput v-model:value="optionsState.animateInterval" type="number" @change="onChangeOptions('animateInterval')" />
          </AFormItem>

          <AFormItem name="textRotate" label="文字是否选择">
            <ASwitch v-model:checked="optionsState.textRotate" @change="onChangeOptions('textRotate')" />
          </AFormItem>
          <AFormItem name="textFlip" label="文字是否镜像">
            <ASwitch v-model:checked="optionsState.textFlip" @change="onChangeOptions('textFlip')" />
          </AFormItem>
        </ACollapsePanel>

      </ACollapse>
    </ATabPane>
  </ATabs>
</template>

<script lang="ts" setup>
import { reactive, onMounted, ref, watch } from 'vue';

import { useDataState, useOptionsState } from '@/meta';
import { usePickColorsAttrs } from '@/hooks';

import PickColors from 'vue-pick-colors';

const { pickColorsAttrs } = usePickColorsAttrs();

const { dataState, onChangeData, onChangeBkImage, onChangeGridRotate } = useDataState();
const { optionsState, onChangeOptions } = useOptionsState();

onMounted(() => {
  const d = meta2d.data();
  dataState.name = d.name || '';
  dataState.penBackground = d.penBackground || '';

  console.log(dataState);

  Object.assign(optionsState, meta2d.getOptions());
});
</script>

<style lang="scss" scoped>
@import '@scss/var.scss';
</style>
