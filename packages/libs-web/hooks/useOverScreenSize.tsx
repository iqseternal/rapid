import { useDebounceHook, useDebounce } from './useDebounce';
import { useEventListener } from './useEventListener';
import { useWindowScreenSizeHook, useWindowInnerSizeHook } from './useWindowSize';
import { useReactive, useShallowReactive } from './useReactive';
import { useState } from 'react';

export interface WindowOverScreenSize {
  /**
   * 窗口尺寸是否超过了屏幕尺寸（宽度
   */
  overflowScreenWidth: boolean;

  /**
   * 窗口尺寸是否超过了屏幕尺寸（高度
   */
  overflowScreenHeight: boolean;
}

/**
 * 得到视图与显示尺寸之间的关系, 如果窗口被缩放, 超出了屏幕的大小, 那么 overflowWidth 就是 true (拥有附属显示器)
 * @example
 *
 * const [overScreen] = useOverScreenSize();
 * if (overScreen.overflowWidth) {
 *   console.log('超出了屏幕的宽度尺寸');
 * }
 *
 * @return
 */
export function useWindowOverScreenSize() {
  const [windowScreenSize] = useState(useWindowScreenSizeHook);
  const [windowInnerSize] = useState(useWindowInnerSizeHook);

  const [state] = useShallowReactive<WindowOverScreenSize>(() => ({
    overflowScreenWidth: windowInnerSize.innerWidth > windowScreenSize.screenWidth,
    overflowScreenHeight: windowInnerSize.innerHeight > windowScreenSize.screenHeight
  }));

  const judgeStatus = useDebounce(() => {
    const overflowWidth = windowInnerSize.innerWidth > windowScreenSize.screenWidth;
    const overflowHeight = windowInnerSize.innerHeight > windowScreenSize.screenHeight;

    if (overflowWidth !== state.overflowScreenWidth || overflowHeight !== state.overflowScreenHeight) {
      state.overflowScreenWidth = overflowWidth;
      state.overflowScreenHeight = overflowHeight;
    }
  }, { wait: 20 }, []);

  useEventListener(window, 'resize', judgeStatus, []);

  return [state as Readonly<WindowOverScreenSize>] as const;
}

