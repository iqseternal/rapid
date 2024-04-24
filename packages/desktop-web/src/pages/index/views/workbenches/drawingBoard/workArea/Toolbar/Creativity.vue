<template>
  <div class="flex-left">
    <Tool title="钢笔" :src="penUrl" :active="metaState.isPen" @click="usePen" />
    <Tool title="铅笔" :src="pencilUrl" :active="metaState.isPencil" @click="usePencil" />

    <Tool title="放大镜" :active="metaState.useMagnifier" @click="useMagnifier">
      <IconFont type="SearchOutlined" />
    </Tool>
    <Tool title="鸟瞰图" :active="metaState.useMap" @click="useMap">
      <IconFont type="EnvironmentOutlined" />
    </Tool>

    <DropdownMenu>
      <Tool title="起点">
        <svg class="l-icon" aria-hidden="true">
          <use :xlink:href="fromArrows.find((item) => item.value === metaState.line.fromArrow)?.icon" />
        </svg>
      </Tool>
      <template #overlay>
        <template v-for="item in fromArrows" :key="item">
          <SingleMenu>
            <Widget @click="lineFn.changeFromArrow(item.value)">
              <div class="flex middle" style="height: 30px">
                <svg class="l-icon" aria-hidden="true"><use :xlink:href="item.icon" /></svg>
              </div>
            </Widget>
          </SingleMenu>
        </template>
      </template>
    </DropdownMenu>

    <DropdownMenu>
      <Tool title="终点">
        <svg class="l-icon" aria-hidden="true">
          <use :xlink:href="toArrows.find((item) => item.value === metaState.line.toArrow)?.icon" />
        </svg>
      </Tool>
      <template #overlay>
        <template v-for="item in toArrows" :key="item">
          <SingleMenu>
            <Widget @click="lineFn.changeToArrow(item.value)">
              <div class="flex middle" style="height: 30px">
                <svg class="l-icon" aria-hidden="true">
                  <use :xlink:href="item.icon" />
                </svg>
              </div>
            </Widget>
          </SingleMenu>
        </template>
      </template>
    </DropdownMenu>





    <Tool title="连线">
      <span @click="lineFn.drawLine">
        <svg width="1em" height="1em" viewBox="0 0 1024 1024">
          <path
            d="M192 64a128 128 0 0 1 123.968 96H384a160 160 0 0 1 159.68 149.504L544 320v384a96 96 0 0 0 86.784 95.552L640 800h68.032a128 128 0 1 1 0 64.064L640 864a160 160 0 0 1-159.68-149.504L480 704V320a96 96 0 0 0-86.784-95.552L384 224l-68.032 0.064A128 128 0 1 1 192 64z m640 704a64 64 0 1 0 0 128 64 64 0 0 0 0-128zM192 128a64 64 0 1 0 0 128 64 64 0 0 0 0-128z"
            fill="currentColor"
          />
        </svg>
      </span>
    </Tool>















    <Tool>
      <span :draggable="true" @dragstart="e => onAddShape(e, 'line')" @click="e => onAddShape(e, 'line')">
        <IconFont type="LineOutlined" />
      </span>
    </Tool>
    <Tool title="文字">
      <span :draggable="true" @dragstart="e => onAddShape(e, 'text')" @click="e => onAddShape(e, 'text')">
        <svg class="l-icon" aria-hidden="true">
          <use xlink:href="#l-text" />
        </svg>
      </span>
    </Tool>

    <DropdownMenu>
      <Tool title="线型">
        <svg class="l-icon" aria-hidden="true">
          <use :xlink:href="lineTypes.find((item) => item.value === metaState.line.lineType)?.icon" />
        </svg>
      </Tool>

      <template #overlay>
        <template v-for="item in lineTypes" :key="item.value">
          <SingleMenu class="flex">
            <Widget :title="item.name" @click="lineFn.changeLineType(item.value)">
              <svg class="l-icon" aria-hidden="true">
                <use :xlink:href="item.icon" />
              </svg>
            </Widget>
          </SingleMenu>
        </template>
      </template>
    </DropdownMenu>

    <Widget :autoHover="false" />
    <ADropdown>
      <Widget :autoHover="false"><div style="line-height: 100%;">{{ NumberFilters.toFixed(metaState.scale, 0) }}%</div></Widget>

      <template #overlay>
        <div style="width: 200px;height: 10px;background-color: white;">
          <ASlider v-model:value="metaState.scale" :min="metaState.minScale" :max="metaState.maxScale" />
        </div>
      </template>
    </ADropdown>

    <Widget :autoHover="false" />
    <Widget title="100%视图" @click="onScaleDefault">
      <IconFont type="FullscreenExitOutlined" />
    </Widget>
    <Widget title="窗口大小" @click="onScaleWindow">
      <IconFont type="FullscreenOutlined" />
    </Widget>
  </div>
</template>

<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { DropdownMenu, MenuDriver, ComboBoxMenu, SingleMenu } from '@components/DropdownMenu';
import { lineTypes, fromArrows, toArrows } from '@meta/preset';
import { onUndo, onRedo, onAddShape, onCopy, onDelete, onPaste, onScaleDefault, onScaleWindow, useSelections, useMetaState } from '@/meta';
import { pencilUrl, penUrl } from '@/assets';
import { NumberFilters } from '@rapid/libs/filters';

import Widget from '@components/Widget';
import Tool from './Tool.vue';
import IconFont from '@components/IconFont';

import toolbarStyles from './toolbar.module.scss';

const { metaState, lineFn, metaRefresh, usePen, usePencil, useMagnifier, useMap } = useMetaState();
</script>
