import type { Ref } from 'vue';
import { ref } from 'vue';
import { usePenProps, usePenPropsHook, useSelections, useSelectionsHook } from '@/meta';
import type { PenProps } from '@/meta';

import { ShowTypeMode, makePenProp, makePenPropGroup, makePenPropTab } from './penProps.declare';
import type { PenPropTab, InputNumberProp, InputStringProp, SelectProp, SwitchProp } from './penProps.declare';
import {
  x, y, width, height, ratio, borderRadius, rotate, paddingTop, paddingBottom, paddingLeft, paddingRight, process, verticalProgress, flipX, flipY
} from './penProps.term';

const { selections } = useSelectionsHook();
const { penPropsState, setCurrentPenProps } = usePenPropsHook();

export const positionAndSizeGroup = makePenPropGroup({
  header: '位置与大小',
  list: [
    x, y,
    width, height,
    ratio, borderRadius, rotate,
    paddingTop, paddingBottom, paddingLeft, paddingRight,
    process, verticalProgress,
    flipX, flipY
  ]
});

export const styleGroup = makePenPropGroup({
  header: '样式',
  list: [

  ]
})

export const textGroup = makePenPropGroup({
  header: '文字',
  list: [

  ]
})

export const diabledGroup = makePenPropGroup({
  header: '禁止',
  list: [

  ]
})

export const appearanceTab: PenPropTab = makePenPropTab({
  tab: '外观',
  list: [
    positionAndSizeGroup,
    styleGroup,
    textGroup,
    diabledGroup
  ]
})

