import { css } from 'styled-components';
import { setCssVars, cssRoot } from '../common';
import { useDebounceHook, useWindowScreenSizeHook } from '../hooks';

const CSS_VARS_MAP = {
  MAX_SCREEN_WIDTH: '--rapid-o-styled-max-screen-width',
  MAS_SCREEN_HEIGHT: '--rapid-o-styled-max-screen-height',
};

const windowSize = useWindowScreenSizeHook();
const valueMap = new Map<keyof typeof CSS_VARS_MAP, string | number>();

const makeCssVar = <K extends T[keyof T], T = keyof typeof CSS_VARS_MAP>(variable: K) => `var(${variable})`;

const init = () => {
  if (
    windowSize.screenWidth === valueMap[CSS_VARS_MAP.MAX_SCREEN_WIDTH] &&
    windowSize.screenHeight === valueMap[CSS_VARS_MAP.MAS_SCREEN_HEIGHT]
  ) return;

  valueMap[CSS_VARS_MAP.MAX_SCREEN_WIDTH] = windowSize.screenWidth;
  valueMap[CSS_VARS_MAP.MAS_SCREEN_HEIGHT] = windowSize.screenHeight;

  setCssVars(cssRoot, {
    [CSS_VARS_MAP.MAX_SCREEN_WIDTH]: windowSize.screenWidth + 'px',
    [CSS_VARS_MAP.MAS_SCREEN_HEIGHT]: windowSize.screenHeight + 'px'
  });
}

init();

if (globalThis?.window) globalThis?.window?.addEventListener('resize', useDebounceHook(init, 60));

export const maxScreenWidthStyle = css`max-width: ${makeCssVar(CSS_VARS_MAP.MAX_SCREEN_WIDTH)};`;
export const maxScreenHeightStyle = css`max-height: ${makeCssVar(CSS_VARS_MAP.MAS_SCREEN_HEIGHT)}px;`;

export const maxContentStyle = css`width: max-content;`;
export const fitContentStyle = css`width: fit-content;`;

export const maxViewWidthStyle = css`max-width: 100vw;`;
export const maxViewHeightStyle = css`max-height: 100vh;`;

export const fullSizeWidthStyle = css`width: 100%;`;
export const fullSizeHeightStyle = css`height: 100%;`;

export const overflowXHiddenStyle = css`overflow-x: hidden;`;
export const overflowYHiddenStyle = css`overflow-y: hidden;`;

export const flexDirectionRowStyle = css`flex-direction: row;`;
export const flexDirectionRowReverseStyle = css`flex-direction: row-reverse;`;

export const flexDirectionColStyle = css`flex-direction: column;`;
export const flexDirectionColReverseStyle = css`flex-direction: column-reverse;`;

export const justifyStartStyle = css`justify-content: flex-start;`;
export const justifyEndStyle = css`justify-content: flex-end;`;
export const justifyCenterStyle = css`justify-content: center;`;
export const justifyBetweenStyle = css`justify-content: space-between;`;
export const justifyAroundStyle = css`justify-content: space-around;`;

export const alignItemStartStyle = css`align-items: flex-start;`;
export const alignItemEndStyle = css`align-items: flex-end;`;
export const alignItemCenterStyle = css`align-items: center;`;
