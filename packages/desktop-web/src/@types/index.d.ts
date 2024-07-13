import type { PropType as VuePropType, DefineComponent } from 'vue';
import type { IconRealKey as VueIconRealKey, IconLikeKey as VueIconLikeKey } from './router';
import type { TableColumnType as AntdTableColumnType } from 'ant-design-vue';
import type { EvtCallback } from '@components/Modal/index.d';
import type { Meta2d } from '@meta2d/core';
import type { ExposeApi } from 'node_modules/@rapid/desktop-node/preload';
import type { ObjKeyToArr, CustomColumn } from '@rapid/libs/types';

/** meta2d 声明  */
declare global {
  declare var meta2d: Meta2d & {
    store: {
      patchFlagsBackground: boolean;
    }
  };
  declare const C2S: any;
}

/** electron 扩展 Api 声明  */
declare global {
  interface Window extends ExposeApi {

  }
}

declare global {

}

export {};
