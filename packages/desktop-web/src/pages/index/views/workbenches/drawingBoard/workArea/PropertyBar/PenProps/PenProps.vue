
<template>
  <ATabs>
    <ATabPane v-for="tab in penPropsTabs" :key="tab.key" :tab="tab.tab">
      <ACollapse>
        <template v-for="item in tab.list" :key="item.key">
          <ACollapsePanel :header="item.header">
            <AForm>
              <template v-for="(prop, index) in item.list" :key="index">
                <AFormItem :name="prop.prop" :label="prop.label">
                  <template v-if="prop.showType === ShowTypeMode.InputNumber">
                    <!-- <AInputNumber v-model:value="penPropsState[prop.prop]" v-bind="prop.attrs" style="width: 100%;" @change="() => prop.onChange(penPropsState[prop.prop])" /> -->

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

                  <template v-else-if="prop.showType === ShowTypeMode.Select">
                    <ASelect v-model:value="penPropsState[prop.prop]" v-bind="prop.attrs" @change="value => prop.onChange(value)">
                      <template v-for="(option, optionIndex) in prop.options" :key="optionIndex">
                        <ASelectOption v-bind="option.attrs">
                          <RenderJsx :jsx="option.content" />
                        </ASelectOption>
                      </template>
                    </ASelect>
                  </template>
                </AFormItem>
              </template>
            </AForm>
          </ACollapsePanel>
        </template>
      </ACollapse>
    </ATabPane>

    <ATabPane key="动效" tab="动效">
      <AnimateProps />
    </ATabPane>
  </ATabs>
</template>

<script lang="tsx" setup>
import { ref, onMounted, onUnmounted, watch, VNode, onBeforeMount } from 'vue';
import { useSelections, useDataState, useMetaState, useOptionsState, usePenProps } from '@/meta';
import { isUndefined } from '@suey/pkg-utils';
import { SelectionMode } from '@meta/useSelections';
import { ShowTypeMode, penPropsTabs } from '@meta/preset';
import { useSurvivalCycle } from '@/hooks';
import { NumberFilters } from '@rapid/libs/filters';

import RenderJsx from '@rapid/libs/components/RenderJsx';
import PickColors from 'vue-pick-colors';
import AnimateProps from './Animate.vue';
import EventsProps from './Events.vue';

const { dataState, onChangeData, onChangeBkImage, onChangeGridRotate } = useDataState();
const { metaState, metaRefresh } = useMetaState();
const { optionsState, onChangeOptions } = useOptionsState();
const { penPropsState, setCurrentPenProps, updatePenPropState } = usePenProps();

const { selections } = useSelections();

const pen = ref();

const rect = ref();

const getPen = () => {
  if (selections.mode !== SelectionMode.Pen) return;

  pen.value = selections.pen;
  if (isUndefined(pen.value.globalAlpha)) pen.value.globalAlpha = 1;
  rect.value = meta2d.getPenRect(pen.value);
}

onMounted(() => {
  if (!metaState.isSetup || !window.meta2d) return;
  meta2d.on('active', updatePenPropState);
})

onBeforeMount(() => {
  if (!metaState.isSetup || !window.meta2d) return;
  meta2d.off('active', updatePenPropState);
})

useSurvivalCycle({
  survival: () => {
    updatePenPropState();


  },
  extinction: () => {

  }
})


const linedashChange = (prop) => {


  console.log(penPropsState);


  return prop.onChange(penPropsState[prop.prop])
}


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
