import { useEffect, useState } from 'react';

/**
 * 更新组件的 Hook, 当一个组件中的变量(引用)被 state 记录, 但是又不想 setState 这个变量的时候, 就可以使用这个
 *
 * @example
 *
 * const refresh = useRefresh();
 *
 * refresh(); // 重新渲染当前组件
 *
 */
export function useRefresh() {
  const [step, setStep] = useState(1);
  const [_, set] = useState(-10000);

  return () => set(x => {
    if (x >= 100000) setStep(-1);
    if (x <= -100000) setStep(1);

    return x + step;
  });
}
