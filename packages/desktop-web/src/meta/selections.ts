import type { UnwrapNestedRefs } from 'vue';
import { Pen } from '@meta2d/core';
import { reactive } from 'vue';

export enum SelectionMode {
  File,
  Pen,
}

const selections: UnwrapNestedRefs<{
  mode: SelectionMode;
  pen: Pen | undefined;
}> = reactive({
  // 选中对象类型：0 - 画布；1 - 单个图元
  mode: SelectionMode.File,
  pen: void 0 as (Pen | undefined),
});

export const useSelection = (): { selections: UnwrapNestedRefs<{ mode: SelectionMode, pen?: Pen }>;select: (pens?: Pen[]) => void; } => {

  const select = (pens?: Pen[]): void => {
    if (!pens || pens.length !== 1) {
      selections.mode = SelectionMode.File;
      selections.pen = void 0;
      return;
    }

    selections.mode = SelectionMode.Pen;
    selections.pen = pens[0];
  };
  return {
    selections,
    select,
  };
};
