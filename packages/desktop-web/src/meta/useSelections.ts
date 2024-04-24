import type { UnwrapNestedRefs } from 'vue';
import { Pen } from '@meta2d/core';
import { reactive } from 'vue';

export enum SelectionMode {
  File,
  Pen,
  Rect
}

const selections: UnwrapNestedRefs<{
  mode: SelectionMode;
  pen: Pen | undefined;
  pens: Pen[];
}> = reactive({
  // 选中对象类型：0 - 画布；1 - 单个图元
  mode: SelectionMode.File,
  pen: void 0 as (Pen | undefined),
  pens: []
});

export const useSelections = (): { selections: UnwrapNestedRefs<{ mode: SelectionMode, pen?: Pen, pens: Pen[] }>;select: (pens?: Pen[]) => void; } => {
  const select = (pens?: Pen[]): void => {
    if (!pens || pens.length === 0) {
      selections.mode = SelectionMode.File;
      selections.pen = void 0;
      selections.pens = [];
      return;
    }

    if (pens.length === 1) {
      selections.mode = SelectionMode.Pen;
      selections.pen = pens[0];
      selections.pens = pens;
      return;
    }

    selections.mode = SelectionMode.Rect;
    selections.pen = void 0;
    selections.pens = pens;
  };


  return {
    selections,
    select,
  };
};

export const useSelectionsHook = useSelections;
