<template>
  <div ref="view" class="view h-full" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch, getCurrentInstance, onDeactivated, onActivated } from 'vue';
import { useDebounce, useSurvivalCycle } from '@/hooks'
import { setupMeta2dView, useMetaState, destroyMeta2dView, useDataState } from '@/meta';
import { useDocStore } from '@/store/modules/doc';

const props = defineProps({
  width: { type: [Number, String], default: () => '' }
});

const { metaState } = useMetaState();
const { dataState } = useDataState();

const docStore = useDocStore();

const instance = getCurrentInstance();
const view = ref<HTMLDivElement>();

const setupMeta2dLife = async () => {
  if (!view.value) return;
  if (metaState.isSetup) return;
  await setupMeta2dView(view.value);
  await docStore.loadDoc();
}

const destroyMeta2dLife = destroyMeta2dView;


useSurvivalCycle({
  survival: setupMeta2dLife,
  extinction: destroyMeta2dLife
})

watch(() => props.width, useDebounce(() => {
  if (!instance) return;

  if (!instance.isMounted || instance.isDeactivated) return;
  if (!view.value) return;

  if (metaState.isSetup) meta2d.resize();
}, 30));
</script>

<style lang="scss" scoped>
@import '@scss/var.scss';

.view {
  width: 100%;
  min-width: 200px;
  flex: 1;
  touch-action: none;
}
</style>
