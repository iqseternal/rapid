
import type { FC, Ref, RefObject, DependencyList } from 'react';


import { useEffect, useRef, useState } from 'react';


export function useAsyncEffect(asyncEffect: () => void | Promise<void>, deps?: DependencyList) {
  useEffect(() => {
    ;(async () => {
      asyncEffect();
    })();
  }, deps);
}
