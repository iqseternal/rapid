import {useEffect, useState, useCallback} from 'react';
import {useDebounceHook} from './useDebounce';
import {useRefresh} from './useRefresh';

export interface WindowInnerSize {
  innerWidth: number;
  innerHeight: number;
}
export interface WindowScreenSize {
  screenWidth: number;
  screenHeight: number;
}

let innerSizeCallbacks: ((windowInnerSize: WindowInnerSize, windowScreenSize: WindowScreenSize) => void)[] = [];
let innerSize: WindowInnerSize = {
  innerWidth: window.innerWidth,
  innerHeight: window.innerHeight
};

let screenSizeCallbacks: ((windowScreenSize: WindowScreenSize, windowInnerSize: WindowInnerSize) => void)[] = [];
let screenSize: WindowScreenSize = {
  screenWidth: window.screen.width,
  screenHeight: window.screen.height
};

/**
 * 初始化一次当前的 size 值
 */
const initSize = () => {
  const { innerWidth, innerHeight } = window;
  const { width: screenWidth, height: screenHeight } = window.screen;
  innerSize = { innerHeight, innerWidth };
  screenSize = { screenWidth, screenHeight };
}
const windowResizeCallback = useDebounceHook(() => {
  const { width: screenWidth, height: screenHeight } = window.screen;
  const { innerWidth, innerHeight } = window;

  if (!screenSize) screenSize = { screenWidth, screenHeight };
  else {
    const hasChanged = (
      screenSize.screenWidth !== screenWidth ||
      screenSize.screenHeight !== screenHeight
    );

    screenSize.screenWidth = screenWidth;
    screenSize.screenHeight = screenHeight;
    if (hasChanged && screenSizeCallbacks) screenSizeCallbacks.forEach(callback => callback(screenSize, innerSize));
  }

  if (!innerSize) innerSize = { innerHeight, innerWidth };
  else {
    const hasChanged = (
      innerSize.innerWidth !== innerWidth ||
      innerSize.innerHeight !== innerHeight
    );

    innerSize.innerWidth = innerWidth;
    innerSize.innerHeight = innerHeight;
    if (hasChanged && innerSizeCallbacks) innerSizeCallbacks.forEach(callback => callback(innerSize, screenSize));
  }
}, 20);

/**
 * @example
 * const windowInnerSize = useWindowInnerSizeHook();
 *
 * console.log(windowInnerSize.innerWidth); // 会打印当前最新的屏幕尺寸
 *
 */
export function useWindowInnerSizeHook(): Readonly<WindowInnerSize> {
  if (!innerSize) {
    initSize();

    window.addEventListener('resize', windowResizeCallback);
  }

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

  const handleRefresh = useCallback(() => {
    refresh();
  }, []);

  const [windowInnerSize] = useState(() => {
    return useWindowInnerSizeHook();
  });

  // 依赖回调
  useEffect(() => {
    innerSizeCallbacks.push(...effects);

    return () => {
      innerSizeCallbacks = innerSizeCallbacks.filter(fn => {
        return effects.some(effect => effect === fn);
      });
    }
  }, [effects.length]);
  useEffect(() => {
    innerSizeCallbacks.push(handleRefresh);

    return () => {
      innerSizeCallbacks = innerSizeCallbacks.filter(fn => fn === handleRefresh);
    }
  }, []);

  return [windowInnerSize];
}
/**
 * @example
 * const windowScreenSize = useWindowScreenSizeHook();
 *
 * console.log(windowScreenSize.screenWidth); // 会打印当前最新的屏幕尺寸(与分辨率有一定关系)
 */
export function useWindowScreenSizeHook(): Readonly<WindowScreenSize> {
  if (!screenSize) {
    initSize();
    window.addEventListener('resize', windowResizeCallback);
  }
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

  const handleRefresh = useCallback(() => {
    refresh();
  }, []);

  const [windowScreenSize] = useState(() => {
    return useWindowScreenSizeHook();
  });

  // 依赖回调
  useEffect(() => {
    screenSizeCallbacks.push(...effects);

    return () => {
      screenSizeCallbacks = screenSizeCallbacks.filter(fn => {
        return effects.some(effect => effect === fn);
      });
    }
  }, [effects.length]);
  useEffect(() => {
    screenSizeCallbacks.push(handleRefresh);

    return () => {
      screenSizeCallbacks = screenSizeCallbacks.filter(fn => fn === handleRefresh);
    }
  }, []);

  return [windowScreenSize];
}

