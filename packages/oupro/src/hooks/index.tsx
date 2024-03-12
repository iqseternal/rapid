import type { FC, Ref, RefObject, DependencyList } from 'react';
import { useEffect, useRef, useState } from 'react';

export { useRefresh } from './useRefresh';
export { useEventListener } from './useEventListener';
export { useReactive } from './useReactive';
export { useCssVar } from './useCssVar';
export { useDebounceHook } from './useDebounce';
export { useOverScreenSize } from './useOverScreenSize';
export { useWindowSize, useWindowSizeHook } from './useWindowSize';

export function useCollectRef<T>(autoFlush = false) {
  const [sets, setSets] = useState<RefObject<T>[]>([]);

  let idx = 0;
  const collect = (): RefObject<T> => {
    const domRef = useRef<T>(null);
    sets[idx ++] = domRef;

    return domRef;
  }

  const flush = () => {
    setSets([...sets]);
  }

  useEffect(() => {
    if (autoFlush) flush();
  }, []);

  return { sets, collect, flush };
}


