import { combinationStyled } from './fn';
import {
  maxScreenWidthStyle, maxScreenHeightStyle, maxViewWidthStyle, maxViewHeightStyle,
  fullSizeWidthStyle, fullSizeHeightStyle,
  overflowXHiddenStyle, overflowYHiddenStyle,
  flexDirectionColReverseStyle, flexDirectionColStyle, flexDirectionRowReverseStyle, flexDirectionRowStyle,
  justifyAroundStyle, justifyBetweenStyle, justifyCenterStyle, justifyEndStyle, justifyStartStyle,
  alignItemCenterStyle, alignItemStartStyle, alignItenEndStyle
} from './css';
import styled, { css } from 'styled-components';

export const AppAdapter = combinationStyled('div', fullSizeWidthStyle, justifyCenterStyle, css`
  display: flex;
`);

export const MaxScreenWidth = combinationStyled('div', maxScreenWidthStyle);
export const MaxScreenHeight = combinationStyled('div', maxScreenHeightStyle);
export const MaxScreen = combinationStyled(MaxScreenWidth, MaxScreenHeight);

export const MaxViewWidth = combinationStyled('div', maxViewWidthStyle);
export const MaxViewHeight = combinationStyled('div', maxViewHeightStyle);
export const MaxView = combinationStyled(MaxViewWidth, MaxViewHeight);

export const FullSizeWidth = combinationStyled('div', fullSizeWidthStyle);
export const FullSizeHeight = combinationStyled('div', fullSizeHeightStyle);
export const FullSize = combinationStyled(FullSizeWidth, FullSizeHeight);

export const OverflowXHidden = combinationStyled('div', overflowXHiddenStyle);
export const OverflowYHidden = combinationStyled('div', overflowYHiddenStyle);
export const OverflowHidden = combinationStyled(OverflowXHidden, OverflowYHidden);

export const Flex = combinationStyled('div', css`
  display: flex;
  flex-wrap: wrap;
  flex-flow: wrap;
  flex: 1;
`);

export const FlexRow = combinationStyled(Flex, flexDirectionRowStyle, alignItemCenterStyle);
export const FlexColumn = combinationStyled(Flex, flexDirectionColStyle, alignItemCenterStyle);

export const FlexRowBetween = combinationStyled(FlexRow, justifyBetweenStyle);
export const FlexCloumnBetween = combinationStyled(FlexColumn, justifyBetweenStyle);

export const FlexRowAround = combinationStyled(FlexRow, justifyAroundStyle);
export const FlexCloumnAround = combinationStyled(FlexColumn, justifyAroundStyle);

export const FlexRowStart = combinationStyled(FlexRow, justifyStartStyle);
export const FlexCloumnStart = combinationStyled(FlexColumn, justifyStartStyle);

export const FlexRowEnd = combinationStyled(FlexRow, justifyEndStyle);
export const FlexCloumnEnd = combinationStyled(FlexColumn, justifyEndStyle);

export const FlexRowCenter = combinationStyled(FlexRow, justifyCenterStyle);
export const FlexColumnCenter = combinationStyled(FlexColumn, justifyCenterStyle);
