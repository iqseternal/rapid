<template>
  <ACollapse v-model:activeKey="activeKey">
    <ACollapsePanel
      v-for="item in SYSYTEM_GRAPHIC_GROUPS"
      :key="item.name"
      :header="item.name"
    >
      <template v-for="elem in item.list" :key="elem.name">
        <div
          class="graphic"
          :draggable="true"
          @dragstart="dragStart($event, elem)"
          @click.prevent="dragStart($event, elem)"
        >
          <svg class="l-icon" aria-hidden="true">
            <use :xlink:href="'#' + elem.icon"/>
          </svg>
          <p :title="elem.name">{{ elem.name }}</p>
        </div>
      </template>
    </ACollapsePanel>
  </ACollapse>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { SYSYTEM_GRAPHIC_GROUPS } from '../../preset';
import { dragStart } from '@/meta';
import Ellipsis from '@components/Ellipsis';

const activeKey = ref(SYSYTEM_GRAPHIC_GROUPS[0].name);
</script>
