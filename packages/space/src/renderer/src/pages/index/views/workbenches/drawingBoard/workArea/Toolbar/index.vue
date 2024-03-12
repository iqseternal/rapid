<template>
  <div class="toolBar flex-start">

    <Widget title="撤销">
      <span @click="onUndo">
        <svg class="l-icon" aria-hidden="true"><use xlink:href="#l-undo" /></svg>
      </span>
    </Widget>
    <Widget title="重做">
      <span @click="onRedo">
        <svg class="l-icon" aria-hidden="true"><use xlink:href="#l-redo" /></svg>
      </span>
    </Widget>
    <Widget :autoHover="false">
      <div style="width: 64px" />
    </Widget>
    <Widget title="直线">
      <span :draggable="true" @dragstart="e => onAddShape(e, 'line')" @click="e => onAddShape(e, 'line')">
        <IconFont type="LineOutlined" />
      </span>
    </Widget>
    <Widget title="文字">
      <span :draggable="true" @dragstart="e => onAddShape(e, 'text')" @click="e => onAddShape(e, 'text')">
        <svg class="l-icon" aria-hidden="true">
          <use xlink:href="#l-text" />
        </svg>
      </span>
    </Widget>
    <Widget title="连线">
      <span @click="drawLine">
        <svg width="1em" height="1em" viewBox="0 0 1024 1024">
          <path
            d="M192 64a128 128 0 0 1 123.968 96H384a160 160 0 0 1 159.68 149.504L544 320v384a96 96 0 0 0 86.784 95.552L640 800h68.032a128 128 0 1 1 0 64.064L640 864a160 160 0 0 1-159.68-149.504L480 704V320a96 96 0 0 0-86.784-95.552L384 224l-68.032 0.064A128 128 0 1 1 192 64z m640 704a64 64 0 1 0 0 128 64 64 0 0 0 0-128zM192 128a64 64 0 1 0 0 128 64 64 0 0 0 0-128z"
            fill="currentColor"
          />
        </svg>
      </span>
    </Widget>

    <DropdownMenu>
      <Widget title="线型">
        <svg class="l-icon" aria-hidden="true">
          <use :xlink:href="lineTypes.find((item) => item.value === currentLineType)?.icon" />
        </svg>
      </Widget>

      <template #overlay>
        <template v-for="item in lineTypes" :key="item.value">
          <SingleMenu class="flex">
            <Widget :title="item.name" @click="changeLineType(item.value)">
              <svg class="l-icon" aria-hidden="true">
                <use :xlink:href="item.icon" />
              </svg>
            </Widget>
          </SingleMenu>
        </template>
      </template>
    </DropdownMenu>

    <DropdownMenu>
      <Widget>
        <svg class="l-icon" aria-hidden="true">
          <use :xlink:href="fromArrows.find((item) => item.value === fromArrow)?.icon" />
        </svg>
      </Widget>
      <template #overlay>
        <template v-for="item in fromArrows" :key="item">
          <SingleMenu>
            <Widget @click="changeFromArrow(item.value)">
              <div class="flex middle" style="height: 30px">
                <svg class="l-icon" aria-hidden="true"><use :xlink:href="item.icon" /></svg>
              </div>
            </Widget>
          </SingleMenu>
        </template>
      </template>
    </DropdownMenu>

    <DropdownMenu>
      <Widget>
        <svg class="l-icon" aria-hidden="true">
          <use :xlink:href="toArrows.find((item) => item.value === toArrow)?.icon" />
        </svg>
      </Widget>
      <template #overlay>
        <template v-for="item in toArrows" :key="item">
          <SingleMenu>
            <Widget @click="changeToArrow(item.value)">
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

    <Widget :autoHover="false">
      <div style="width: 64px" />
    </Widget>
    <Widget :autoHover="false">
      <div v-show="scale > 0" style="line-height: 40px">{{ scale }}%</div>
    </Widget>
    <Widget title="100%视图" @click="onScaleDefault">
      <IconFont type="FullscreenExitOutlined" />
    </Widget>
    <Widget title="窗口大小" @click="onScaleWindow">
      <IconFont type="FullscreenOutlined" />
    </Widget>
    <Widget title="刷新" @click="refresh">
      <IconFont type="ReloadOutlined" />
    </Widget>
    <Widget :autoHover="false">
      <div style="width: 64px" />
    </Widget>
    <!-- <Widget title="运行查看" @click="onView">
      <IconFont type="PlayCircleOutlined" />
    </Widget> -->
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Pen, PenType, deepClone } from '@meta2d/core';
import { message } from 'ant-design-vue';
import { DropdownMenu, MenuDriver, ComboBoxMenu, SingleMenu } from '@components/DropdownMenu';
import { lineTypes, fromArrows, toArrows } from '../../preset';
import { onUndo, onRedo, onAddShape, onCopy, onDelete, onPaste, onScaleDefault, onScaleWindow, meta2dState } from '@renderer/meta';

import Widget from '@components/Widget';
import IconFont from '@components/IconFont';

const currentLineType = ref('curve');

const fromArrow = ref('');
const toArrow = ref('');

const scale = ref(0);

const isDrawLine = ref(false);

/** 绘制线条 */
const drawLine = () => {
  if (isDrawLine.value) {
    isDrawLine.value = false;
    meta2d.finishDrawLine();
    meta2d.drawLine();
    meta2d.store.options.disableAnchor = true;
  } else {
    isDrawLine.value = true;
    meta2d.drawLine(meta2d.store.options.drawingLineName);
    meta2d.store.options.disableAnchor = false;
  }
};

/** 更换线条 */
const changeLineType = (value: string) => {
  currentLineType.value = value;
  if (meta2d) {
    meta2d.store.options.drawingLineName = value;
    meta2d.canvas.drawingLineName && (meta2d.canvas.drawingLineName = value);
    meta2d.store.active?.forEach((pen) => {
      meta2d.updateLineType(pen, value);
    });
  }
};

/** 切换线形左箭头 */
const changeFromArrow = (value: string) => {
  fromArrow.value = value;
  // 画布默认值
  meta2d.store.data.fromArrow = value;
  // 活动层的箭头都变化
  if (meta2d.store.active) {
    meta2d.store.active.forEach((pen: Pen) => {
      if (pen.type === PenType.Line) {
        pen.fromArrow = value;
        meta2d.setValue({
          id: pen.id,
          fromArrow: pen.fromArrow,
        }, {
          render: false,
        });
      }
    });
    meta2d.render();
  }
};

/** 切换线型右箭头 */
const changeToArrow = (value: string) => {
  toArrow.value = value;
  // 画布默认值
  meta2d.store.data.toArrow = value;
  // 活动层的箭头都变化
  if (meta2d.store.active) {
    meta2d.store.active.forEach((pen: Pen) => {
      if (pen.type === PenType.Line) {
        pen.toArrow = value;
        meta2d.setValue({
          id: pen.id,
          fromArrow: pen.toArrow,
        }, {
          render: false,
        });
      }
    });
    meta2d.render();
  }
};

const refresh = () => {
  meta2d.render();
}
</script>

<style lang="scss" scoped>
@import '@scss/var.scss';
@import '@scss/mixin.scss';

@mixin full {
  width: 100%;
  height: 100%;
}

.toolBar {
  height: var(--tool-bar-height);
  gap: var(--tool-bar-gap);
  padding: 0 10px;
  background-color: var(--s-main-frame-bg-normal-color);
  border-radius: var(--s-block-border-radius);

  &:deep(.widget) {
    width: var(--tool-bar-size);
    height: var(--tool-bar-size);
    padding: var(--tool-bar-widget-padding);

    span {
      display: inline-block;
      @include full();
    }
    svg {
      @include full();
    }
  }
}
</style>
