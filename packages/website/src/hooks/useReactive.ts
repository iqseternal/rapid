import { useState } from 'react';
import { useRefresh } from './useRefresh';


export interface ReactiveOptions {
  autoRefresh: boolean;

};

const DEFAULT_OPTIONS: ReactiveOptions = {
  autoRefresh: true
};

/**
 * 示例：
 *  const [count, setCount] = useState(count);
 *
 *  如下会操作 count 数据
 *
 *  <span>{count}</span>
 *  <div onClick={() => setCount(x => x + 1)}>加1</div>
 *
 *  并且, 你需要在某个按钮中使用他, 并提交网络请求
 *
 *  const sendReq = () => {
 *    console.log(count);
 *  }
 *
 *  <button onClick={sendReq}>发送</button>
 *
 * 此时 React 会做一些事情, 当 setCount 更改数据发生重新加载函数组件的时候, sendReq 函数为了能访问到最新的值
 * 会被重新创建, 并且重新绑定到 button 上. 如果发生的次数过多, 我认为这是不必要的.
 *
 * 正常解决办法呢就类似于:
 *  const [count] = useState({ value: 0 });
 *  const [_, set] = useState(false);
 *
 *  const refresh = () => (set(v => !v));
 *
 *  const setCount = () => {
 *    count.value ++;
 *    refresh();
 *  }
 *
 *  const sendReq = () => {
 *    console.log(count.value);
 *  }
 *
 * 但是我觉得这样太麻烦了, 影响了我对组件的编写.
 * 所以为了解决这个多次创建函数绑定的情况, 写了一个较为方便的 hook. 然后和 useCallback 进行配合就可以做到.
 * 当然, 类似于 useEffect 或者是其他需要根据依赖数组进行重新创建的 Hook 也可以用这个跳跃一些重新创建的步骤.
 * 虽然 React 说的是多创建几个函数对于用户来说并没有太多的影响.
 *
 * const state = useReactive({
 *   count: 0
 * });
 *
 * const setCount = () => (state.count ++);
 *
 * const sendReq = useCallback(() => {
 *   console.log(state.count);
 * }, []);
 *
 * <button onClick={sendReq}>发送</button>
 *
 * 当然, 函数中利用了 Proxy 进行数据自动刷新, 这看起来有点 Vue 的味道
 *
 * @param {T} initValue 初始化的值
 * @return {T} 返回值, 更改子属性的值会自动刷新组件导致重新渲染
 */
export function useReactive<T extends Record<string | symbol | number, unknown>>(initValue: T, options = DEFAULT_OPTIONS): T {
  const refresh = useRefresh();

  const [value] = useState(() => new Proxy(initValue, {
    set(target: Record<string | symbol | number, unknown>, p, newValue) {
      if (target[p] !== newValue) {
        if (options.autoRefresh) refresh();
      }
      target[p] = newValue;

      return true;
    }
  }) as T);

  return value;
}
