<template>
  <div ref="view" class="view h-full" />
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, watch, computed, watchEffect, nextTick, provide, getCurrentInstance, onDeactivated, onActivated } from 'vue';
import { useDebounce } from '@renderer/hooks';
import { AutoDropdownMenu, setupDropdownOpenModel } from '@components/DropdownMenu';
import { meta2dViewMenu } from '@renderer/menus';
import { useSelection, SelectionMode, setupMeta2dView, setupMeta2dEvts, meta2dState } from '@renderer/meta';

const props = defineProps({
  width: { type: [Number, String], default: () => '' }
});

const { selections } = useSelection();

const instance = getCurrentInstance();

const view = ref<HTMLDivElement>();

const metaSetuped = ref(false);

const setupMeta2dLife = () => {
  if (metaSetuped.value || !view.value) return;
  setupMeta2dView(view.value);
  metaSetuped.value = true;
}

const destroyMeta2dLife = () => {
  if (!metaSetuped.value) return;
  meta2d.destroy();
  metaSetuped.value = false;
}

onMounted(setupMeta2dLife);
onActivated(setupMeta2dLife);

onDeactivated(destroyMeta2dLife);
onBeforeUnmount(destroyMeta2dLife);

watch(() => props.width, useDebounce(() => {
  if (instance?.isDeactivated) return;
  if (!view.value) return;
  if (!view.value.clientWidth || !view.value.clientHeight) return;
  if (instance?.isMounted && !instance.isDeactivated) meta2d.resize();
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
