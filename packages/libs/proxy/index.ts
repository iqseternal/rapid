const proxyMap = new Map<object, Map<string, Set<() => void>>>();

export interface ProxyOptions {

}

/**
 * 将一个对象浅层劫持, 并在 调用 setter 时, 执行特定的回调函数
 */
export function createShallowProxy<T extends {}>(target: T, setterCallback = () => {}) {

  return new Proxy(target, {
    get: (target, p, receiver) => {
      // 收集依赖

      return Reflect.get(target, p, receiver);
    },
    set: (target, p, newValue, receiver) => {
      const oldValue = Reflect.get(target, p, receiver);
      if (oldValue === newValue) return true;

      // 触发依赖

      const setResult = Reflect.set(target, p, newValue, receiver);
      if (setResult) setterCallback();

      return setResult;
    },
    deleteProperty: (target, p) => {
      // 触发依赖

      setterCallback();
      return Reflect.deleteProperty(target, p);
    },
  })
}
