
import type { FC, Ref, RefObject, DependencyList } from 'react';


import { useEffect, useRef, useState } from 'react';


export function useAsyncEffect(asyncEffect: () => void | Promise<void>, deps?: DependencyList) {
  useEffect(() => {
    ;(async () => {
      asyncEffect();
    })().catch(err => {
      console.error('含有未捕捉的错误', err);
    });
  }, deps);
}
