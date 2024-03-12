
import { useState, useEffect } from 'react';
import { useDebounceHook } from './useDebounce';
import { useWindowSize } from './useWindowSize';

/**
 * 得到视图与显示尺寸之间的关系, 如果窗口被缩放, 超出了屏幕的大小, 那么 overWidth 就是 ture (拥有附属显示器)
 * @return
 */
export function useOverScreenSize() {
  const [overWidth, setOverWidth] = useState(false);
  const [overHeight, setOverHeight] = useState(false);
  const [windowSize] = useWindowSize();

  useEffect(() => {
    const judgeStatus = useDebounceHook(() => {
      if (window.innerWidth > windowSize.screenWidth) setOverWidth(true);
      else setOverWidth(false);

      if (window.innerHeight > windowSize.screenHeight) setOverHeight(true);
      else setOverHeight(false);
    }, 20);

    window.addEventListener('resize', judgeStatus);

    return () => {
      window.removeEventListener('resize', judgeStatus);
    }
  }, []);

  return { overWidth, overHeight };
}

