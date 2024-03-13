import { useEffect, useLayoutEffect, useState } from 'react';
import { useDebounceHook } from './useDebounce';

interface WindowScreenSize {
  screenWidth: number;
  screenHeight: number;
}

let size: WindowScreenSize | undefined = void 0;

export function useWindowSizeHook(): WindowScreenSize {
  const { width: screenWidth, height: screenHeight } = window.screen;
  if (!size) {
    size = { screenWidth, screenHeight };
    window.addEventListener('resize', useDebounceHook(() => {
      if (!size) return;
      const { width, height } = window.screen;
      size.screenWidth = width;
      size.screenHeight = height;
    }));
  }
  return size;
}

export function useWindowSize() {
  return useState(useWindowSizeHook);
}
