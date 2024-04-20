
import type { Meta2d } from '@meta2d/core';
import { reactive } from 'vue';
import { useSelectionsHook, useSelections, SelectionMode } from './useSelections';

export type PenProps = Parameters<typeof meta2d.setValue>[0];

export function usePenProps() {
  const penPropsState = reactive<PenProps>({
    x: 0
  })

  const { select, selections } = useSelections();

  const setCurrentPenProps = (props: PenProps) => {

    if (!meta2d) return;
    if (selections.mode !== SelectionMode.Pen) return;
    if (!selections.pen) return;

    meta2d.setValue({
      id: selections.pen?.id,
      ...props
    })

    meta2d.render();
  }

  return {
    penPropsState,
    setCurrentPenProps
  }
}


