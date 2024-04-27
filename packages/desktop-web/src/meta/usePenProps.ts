
import type { Meta2d, Pen, ChartData } from '@meta2d/core';
import { reactive, watch } from 'vue';
import { useSelectionsHook, useSelections, SelectionMode } from './useSelections';
import { useNoEffectHook } from '@hooks/useNoEffect';
import { useMetaState, useMetaStateHook } from './useMetaState';

export type PenProps = Pen & Partial<ChartData> & Partial<Record<'tag' | 'newId', string>>;

const { metaState, onFirstSetup } = useMetaStateHook();
const { select, selections } = useSelectionsHook();

const penPropsState = reactive<PenProps>({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  ratio: false,
  borderRadius: 0,
  rotate: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0,
  progress: 0,
  verticalProgress: false,
  flipX: false,
  flipY: false,

  lineDash: [],
  lineJoin: 'miter',
  lineCap: 'butt',
  color: '',
  hoverColor: '',
  activeColor: '',
  lineWidth: 0,
  background: '',
  hoverBackground: '',
  activeBackground: '',
  globalAlpha: 0,
  anchorColor: '',
  shadowColor: '',
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
  textHasShadow: false,

  fontFamily: '',
  fontSize: 14,
  textColor: '',
  hoverTextColor: '',
  activeTextColor: '',
  textBackground: '',
  textAlign: 'center',
  textBaseline: 'middle',
  lineHeight: 0,
  whiteSpace: 'nowrap',
  textWidth: 0,
  textHeight: 0,
  ellipsis: true,
  hiddenText: false,
  text: '',

  disableInput: false,
  disableRotate: false,
  disableSize: false,
  disableAnchor: false
})

const updatePenPropState = () => {
  if (!window.meta2d) return;
  if (selections.mode === SelectionMode.Pen && selections.pen) {
    Object.assign(penPropsState, selections.pen);
  }
}

onFirstSetup(() => {
  meta2d.on('*', updatePenPropState);
})

watch(() => selections.mode, () => {
  if (selections.mode === SelectionMode.Pen) updatePenPropState();
})

/**
 * pen 的属性
 *
 * @returns
 */
export function usePenProps() {

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
    updatePenPropState,
    setCurrentPenProps
  }
}

export const usePenPropsHook = usePenProps;

