import { useEffect, useState, useCallback } from 'react';
import { useDebounceHook } from './useDebounce';
import { useRefresh } from './useRefresh';
import { useDependenciesListHook } from './useDependencies';

export interface WindowInnerSize {
  innerWidth: number;
  innerHeight: number;
}
export interface WindowScreenSize {
  screenWidth: number;
  screenHeight: number;
}

const innerSize: WindowInnerSize = { innerWidth: globalThis.window?.innerWidth ?? 0, innerHeight: globalThis.window?.innerHeight ?? 0 };
const {
  dependenciesList: innerSizeCallbacks,
  appendDep: appendInnerSizeCallback,
  removeDep: removeInnerSizeCallback
} = useDependenciesListHook<(innerSize: WindowInnerSize, screenSize: WindowScreenSize) => void>();

const screenSize: WindowScreenSize = { screenWidth: globalThis.window?.screen?.width ?? 0, screenHeight: globalThis.window?.screen?.height ?? 0 };
const {
  dependenciesList: screenSizeCallbacks,
  appendDep: appendScreenSizeCallback,
  removeDep: removeScreenSizeCallback
} = useDependenciesListHook<(screenSize: WindowScreenSize, innerSize: WindowInnerSize) => void>();

const windowResizeCallback = useDebounceHook(() => {
  const { width: screenWidth, height: screenHeight } = window.screen;
  const { innerWidth, innerHeight } = window;
  const screenHasChanged = (
    screenSize.screenWidth !== screenWidth ||
    screenSize.screenHeight !== screenHeight
  );
  if (screenHasChanged) screenSizeCallbacks.forEach(callback => callback(screenSize, innerSize));
  const innerHasChanged = (
    innerSize.innerWidth !== innerWidth ||
    innerSize.innerHeight !== innerHeight
  );
  if (innerHasChanged) innerSizeCallbacks.forEach(callback => callback(innerSize, screenSize));
}, 20);
if (globalThis.window) window.addEventListener('resize', windowResizeCallback);

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

export interface UseWindowInnerSizeOptions {
  /**
   * 副作用, 当屏幕 screen 尺寸发生变化时, 可触发的回调
   */
  effects: (typeof innerSizeCallbacks)[number][];
}

/**
 * @example
 * const [windowInnerSize] = useWindowInnerSize();
 *
 * <div>{windowInnerSize.innerWidth}</div> // 组件会根据 windowSize 的变化自动更新
 *
 */
export function useWindowInnerSize(options?: UseWindowInnerSizeOptions) {
  const {
    effects = []
  } = options ?? ({} as UseWindowInnerSizeOptions);

  const refresh = useRefresh();

  const [windowInnerSize] = useState(useWindowInnerSizeHook);

  // 依赖回调
  useEffect(() => {
    appendInnerSizeCallback(refresh, ...effects);

    return () => removeInnerSizeCallback(refresh, ...effects);
  }, [effects.length]);

  return [windowInnerSize];
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

export interface UseWindowScreenSizeOptions {
  /**
   * 副作用, 当屏幕 screen 尺寸发生变化时, 可触发的回调
   */
  effects: (() => void)[];
}

/**
 * @example
 * const [windowScreenSize] = useWindowScreenSize();
 *
 * <div>{windowScreenSize.screenWidth}</div> // 组件会根据 windowSize 的变化自动更新
 *
 */
export function useWindowScreenSize(options?: UseWindowScreenSizeOptions) {
  const {
    effects = []
  } = options ?? ({} as UseWindowScreenSizeOptions);

  const refresh = useRefresh();

  const [windowScreenSize] = useState(useWindowScreenSizeHook);

  // 依赖回调
  useEffect(() => {
    appendScreenSizeCallback(refresh, ...effects);

    return () => removeScreenSizeCallback(refresh, ...effects);
  }, [effects.length]);

  return [windowScreenSize];
}

