import { useEffect, useState } from 'react';

/**
 * 更新组件的 Hook, 当一个组件中的变量(引用)被 state 记录, 但是又不想 setState 这个变量的时候, 就可以使用这个
 *
 *
 */
export function useRefresh(...dep: any[]) {
  const [_, setCount] = useState(-1220);
  return () => setCount(x => x + 1);
}
