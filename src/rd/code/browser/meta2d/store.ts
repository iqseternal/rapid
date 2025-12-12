
import type { Pen } from '@meta2d/core';
import type { Draft } from 'immer';
import { create, createStore } from 'zustand';
import type { StoreApi, UseBoundStore } from 'zustand';
import { createJSONStorage, persist, type PersistOptions } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { WithImmer, Write, StorePersist } from './type';

export const enum Meta2dSelectionMode {
  File,

  Pen,

  Rect,

  Graphics,
  Shape,
  Text,
  Image,
}

export interface Meta2dSelectionsStore {
  mode: Meta2dSelectionMode;

  pen?: Pen | undefined;

  pens: Pen[];
}

export const UseMeta2dSelectionsStoreName = 'useMeta2dSelectionsStore';

export const useMeta2dSelectionsStore: UseBoundStore<WithImmer<Write<StoreApi<Meta2dSelectionsStore>, StorePersist<Meta2dSelectionsStore, unknown>>>> = create<Meta2dSelectionsStore>()(
  persist(
    immer(
      (set, get, store) => ({

        mode: Meta2dSelectionMode.File,

        pen: void 0,

        pens: []
      })
    ),
    {
      name: UseMeta2dSelectionsStoreName,
      storage: createJSONStorage(() => window.sessionStorage)
    }
  )
);
