import { useEffect, useState } from 'react';

/**
 * 更新组件的 Hook, 当一个组件中的变量(引用)被 state 记录, 但是又不想 setState 这个变量的时候, 就可以使用这个
 *
 *
 * 返回值其实有点抽象, 当我使用:
 *  return () => {
 *    setCount(count + 1);
 *  }
 * 这样的时候, count 的值就一直是 -1220, 但是我在函数体中打印 count的值又是正确的, 有点抽象
 * @return {() => void}
 */
export function useRefresh(...dep: any[]) {
  const [_, setCount] = useState(-1220);

  useEffect(() => {
    setCount(x => x + 1);
  }, dep);


  return () => setCount(x => x + 1);
}
