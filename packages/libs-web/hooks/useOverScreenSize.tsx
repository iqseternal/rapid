import { useDebounceHook, useDebounce } from './useDebounce';
import { useEventListener } from './useEventListener';
import { useWindowScreenSizeHook, useWindowInnerSizeHook } from './useWindowSize';
import { useReactive } from './useReactive';
import { useState } from 'react';

export interface WindowOverScreenSize {
  overflowWidth: boolean;
  overflowHeight: boolean;
}

/**
 * 得到视图与显示尺寸之间的关系, 如果窗口被缩放, 超出了屏幕的大小, 那么 overflowWidth 就是 ture (拥有附属显示器)
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

  const [state] = useReactive({
    overflowWidth: windowInnerSize.innerWidth > windowScreenSize.screenWidth,
    overflowHeight: windowInnerSize.innerHeight > windowScreenSize.screenHeight
  });

  const judgeStatus = useDebounce(() => {
    const overflowWidth = windowInnerSize.innerWidth > windowScreenSize.screenWidth;
    const overflowHeight = windowInnerSize.innerHeight > windowScreenSize.screenHeight;

    if (overflowWidth !== state.overflowWidth || overflowHeight !== state.overflowHeight) {
      state.overflowWidth = overflowWidth;
      state.overflowHeight = overflowHeight;
    }
  }, 20, []);

  useEventListener(window, 'resize', judgeStatus, []);
  return [state as Readonly<WindowOverScreenSize>];
}

