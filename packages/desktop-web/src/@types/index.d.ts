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
  /**  */
  declare type ModalEvtCallBack = EvtCallback;

  declare type PropType<T> = VuePropType<T>;

  declare type IconRealKey = VueIconRealKey;
  declare type IconLikeKey = VueIconLikeKey;
  declare type IconKey = IconRealKey | IconLikeKey;

  declare namespace TableType {

    export type Column<T> = CustomColumn<AntdTableColumnType<T>, T>;

    export type Columns<T> = Column<T>[];

    export type BodyCell<T> = {
      column: TableType.Column<T>;

      record: T;

      text: any;

      index: number;

      value: any;
    };
  };
}

export {};
