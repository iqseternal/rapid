import { useEffect, useState, useCallback } from 'react';
import { useDebounceHook } from './useDebounce';
import { useRefresh } from './useRefresh';

type InnerSizeEffect = (innerSize: WindowInnerSize, screenSize: WindowInnerSize) => void;

type ScreenSizeEffect = (screenSize: WindowScreenSize, innerSize: WindowScreenSize) => void;

const innerSize: WindowInnerSize = { innerWidth: globalThis.window?.innerWidth ?? 0, innerHeight: globalThis.window?.innerHeight ?? 0 };
const screenSize: WindowScreenSize = { screenWidth: globalThis.window?.screen?.width ?? 0, screenHeight: globalThis.window?.screen?.height ?? 0 };

const { effects: innerSizeEffects, appendEffect: appendInnerSizeEffect, removeEffect: removeInnerSizeEffect } = createEffects<InnerSizeEffect>();
const { effects: screenSizeEffects, appendEffect: appendScreenSizeEffect, removeEffect: removeScreenSizeEffect } = createEffects<ScreenSizeEffect>();

const windowResizeCallback = useDebounceHook(() => {
  const { width: screenWidth, height: screenHeight } = window.screen;
  const { innerWidth, innerHeight } = window;

  const innerHasChanged = (innerSize.innerWidth !== innerWidth || innerSize.innerHeight !== innerHeight);
  const screenHasChanged = (screenSize.screenWidth !== screenWidth || screenSize.screenHeight !== screenHeight);

  const oldInnerSize: WindowInnerSize = { innerWidth: innerSize.innerWidth, innerHeight: innerSize.innerHeight };
  const oldScreenSize: WindowScreenSize = { screenWidth: screenSize.screenWidth, screenHeight: screenSize.screenHeight };

  if (innerHasChanged) {
    innerSize.innerWidth = innerWidth;
    innerSize.innerHeight = innerHeight;
    innerSizeEffects.forEach(effect => effect(oldInnerSize, { innerWidth, innerHeight }));
  }

  if (screenHasChanged) {
    screenSize.screenWidth = screenWidth;
    screenSize.screenHeight = screenHeight;
    screenSizeEffects.forEach(effect => effect(oldScreenSize, { screenWidth, screenHeight }));
  }
}, { wait: 20 });
if (globalThis.window) window.addEventListener('resize', windowResizeCallback);

/**
 * WindowInnerSize
 */
export interface WindowInnerSize {
  /**
   * 界面宽度
   */
  innerWidth: number;

  /*
   * 界面高度
   */
  innerHeight: number;
}

/**
 * @example
 * const windowInnerSize = useWindowInnerSizeHook();
 *
 * console.log(windowInnerSize.innerWidth); // 会打印当前最新的屏幕尺寸
 *
 */
export function useWindowInnerSizeHook(): Readonly<WindowInnerSize> {
  return innerSize;
}

/**
 * @example
 * const [windowInnerSize] = useWindowInnerSize();
 *
 * <div>{windowInnerSize.innerWidth}</div> // 组件会根据 windowSize 的变化自动更新
 *
 */
export function useWindowInnerSize() {
  const refresh = useRefresh();
  const [windowInnerSize] = useState(useWindowInnerSizeHook);
  useEffect(() => {
    appendInnerSizeEffect(refresh);
    return () => removeInnerSizeEffect(refresh);
  }, []);
  return [windowInnerSize] as const;
}

/**
 * WindowScreenSize
 */
export interface WindowScreenSize {
  /**
   * 屏幕宽度
   */
  screenWidth: number;

  /**
   * 屏幕高度
   */
  screenHeight: number;
}


/**
 * @example
 * const windowScreenSize = useWindowScreenSizeHook();
 *
 * console.log(windowScreenSize.screenWidth); // 会打印当前最新的屏幕尺寸(与分辨率有一定关系)
 */
export function useWindowScreenSizeHook(): Readonly<WindowScreenSize> {
  return screenSize;
}

/**
 * @example
 * const [windowScreenSize] = useWindowScreenSize();
 *
 * <div>{windowScreenSize.screenWidth}</div> // 组件会根据 windowSize 的变化自动更新
 *
 */
export function useWindowScreenSize() {
  const refresh = useRefresh();
  const [windowScreenSize] = useState(useWindowScreenSizeHook);
  useEffect(() => {
    appendScreenSizeEffect(refresh);
    return () => removeScreenSizeEffect(refresh);
  }, []);
  return [windowScreenSize] as const;
}

interface EffectCompose<T> {
  readonly effects: Set<T>;

  readonly appendEffect: (effect: T) => void;

  readonly removeEffect: (effect: T) => void;
}

function createEffects<T,>(): EffectCompose<T> {
  const effects = new Set<T>();

  const appendEffect = (effect: T) => effects.add(effect);
  const removeEffect = (effect: T) => effects.delete(effect);
  return { effects, appendEffect, removeEffect } as const;
}
