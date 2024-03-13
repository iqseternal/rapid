
<template>
  <div class="propsPanel">
    <AForm v-if="pen">
      <h5>图元</h5>

      <AFormItem name="text" label="文本">
        <AInput v-model:value="pen.text" @change="changeValue('text')" />
      </AFormItem>

      <AFormItem name="color" label="颜色">

        <PickColors />

        <AInput v-model:value="pen.color" />
      </AFormItem>

    </AForm>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useSelection } from '@/meta';
import { isUndefined } from '@suey/pkg-utils';

import PickColors from 'vue-pick-colors';

const { selections } = useSelection();

const pen = ref();

const rect = ref();


const getPen = () => {
  pen.value = selections.pen;

  if (isUndefined(pen.value.globalAlpha)) pen.value.globalAlpha = 1;

  rect.value = meta2d.getPenRect(pen.value);
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
