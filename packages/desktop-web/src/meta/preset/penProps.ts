import { ShowTypeMode, makePenProp, makePenPropGroup, makePenPropTab } from './penProps.declare';
import type { PenPropTab, InputNumberProp, InputStringProp, SelectProp, SwitchProp } from './penProps.declare';
import {
  x, y, width, height, ratio, borderRadius, rotate, paddingTop, paddingBottom, paddingLeft, paddingRight, progress, verticalProgress, flipX, flipY,

  lineDash, lineJoin, lineCap, color, hoverColor, activeColor, lineWidth, background, hoverBackground, activeBackground, globalAlpha, anchorColor, shadowColor, shadowBlur, shadowOffsetX, shadowOffsetY, textHasShadow,

  fontFamily, fontSize, textColor, hoverTextColor, activeTextColor, textBackground, textAlign, textBaseline, lineHeight, whiteSpace, textWidth, textHeight, ellipsis, hiddenText, text,

  disableInput, disableRotate, disableSize, disableAnchor
} from './penProps.term';

export const positionAndSizeGroup = makePenPropGroup({
  header: '位置与大小',
  list: [
    x, y,
    width, height, ratio, borderRadius,
    rotate,
    paddingTop, paddingBottom, paddingLeft, paddingRight,
    progress, verticalProgress,
    flipX, flipY
  ]
});

export const styleGroup = makePenPropGroup({
  header: '样式',
  list: [
    lineDash, lineJoin, lineCap,
    color, hoverColor, activeColor,
    lineWidth,
    background, hoverBackground, activeBackground,
    globalAlpha,
    anchorColor,
    shadowColor, shadowBlur,
    shadowOffsetX, shadowOffsetY,
    textHasShadow
  ]
})

export const textGroup = makePenPropGroup({
  header: '文字',
  list: [
    fontFamily, fontSize,

    textColor, hoverTextColor, activeTextColor, textBackground,
    textAlign, textBaseline,
    lineHeight,
    whiteSpace,
    textWidth, textHeight,
    ellipsis,
    hiddenText,
    text
  ]
})

export const disabledGroup = makePenPropGroup({
  header: '禁止',
  list: [
    disableInput, disableRotate, disableSize, disableAnchor
  ]
})

/** 外观 */
export const appearanceTab: PenPropTab = makePenPropTab({
  tab: '外观',
  list: [
    positionAndSizeGroup,
    styleGroup,
    textGroup,
    disabledGroup
  ]
})

/**
 * 对 Pen 的属性进行展示 Tab
 */
export const penPropsTabs = [
  appearanceTab
];
