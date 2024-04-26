
import type { Meta2d, Pen, ChartData } from '@meta2d/core';
import { reactive } from 'vue';
import { useSelectionsHook, useSelections, SelectionMode } from './useSelections';

export type PenProps = Pen & Partial<ChartData> & Partial<Record<'tag' | 'newId', string>>;

export function usePenProps() {
  const penPropsState = reactive<PenProps>({
    x: 0,

  })

  const { select, selections } = useSelections();

  const setCurrentPenProps = (props: PenProps) => {

    if (!meta2d) return;
    if (selections.mode !== SelectionMode.Pen) return;
    if (!selections.pen) return;

    meta2d.setValue({
      id: selections.pen.id,
     ...props
    })

    // selections.pens.forEach(pen => {
    //   meta2d.setValue({
    //     id: pen.id,
    //     ...props
    //   })
    // })

    // meta2d.setValue({
    //   id: selections.pen?.id,
    //   ...props
    // })

    meta2d.render();
  }

  return {
    penPropsState,
    setCurrentPenProps
  }
}

export const usePenPropsHook = usePenProps;

