
/**
 * 对象的基本类型
 */
export type Type = 'Array' | 'Object' | 'Null' | 'Undefined' | 'Function' | 'RegExp' | 'String' | 'Number' | 'Date' | 'Boolean';

/**
 * 返回target是否是指定数据类型
 */
export type IsType<T> = (target: unknown | T) => target is T;

/**
 * 判断对象类型的柯里化函数
 */
export function isType<T>(type: Type): IsType<T> {
  return (val: unknown): val is T => type === Object.prototype.toString.call(val).slice(8, -1);
}

/**
 * 返回目标是不是一个 Boolean 类型
 */
export const isBoolean = <T>(target: T | boolean): target is boolean => (typeof target === 'boolean');

/**
 * 返回目标是不是一个 Number 类型
 */
export const isNumber = <T>(target: T | number): target is number => (typeof target === 'number');

/**
 * 返回目标是不是一个 String 类型
 */
export const isString = <T>(target: T | string): target is string => (typeof target === 'string');

/**
 * 返回目标是不是一个 Null 类型
 */
export const isNull: IsType<null> = isType('Null');

/**
 * 返回目标是不是一个 Undefined 类型
 */
export const isUndefined = <T>(target: T | undefined): target is undefined => (typeof target === 'undefined');

/**
 * 返回目标是否有意义, 即不为 Undefined, 也不为 Null
 */
export const isDef = <T>(target: T | undefined | null): target is NonNullable<T> => !isNull(target) && !isUndefined(target);
export const isUseful = isDef;

/**
 * 返回目标是否没有意义, 即为 Undefined, 或者为 Null
 */
export const isUnDef = <T>(target: T): target is ((T & null) | (T & undefined)) => !isDef<T | null | undefined>(target);
export const isUnUseful = isUnDef;

/**
 * 返回目标是不是一个 Object 类型
 */
export const isObject = <T>(target: T): target is Exclude<T & object, Function> => typeof target === 'object' && !isNull(target);

/**
 * 返回目标是不是一个原始对象
 */
export const isRawObject = <T>(target: T): target is Exclude<T & object, Function> => isObject(target);

/**
 * 返回目标是不是一个 Function 类型
 */
export const isFunction: IsType<Function> = isType('Function');

/**
 * 返回目标是不是一个 Date 类型
 */
export const isDate: IsType<Date> = isType('Date');

/**
 * 返回目标是否是一个 Promise 对象, 是否包含 .then 和 .catch 方法
 */
export const isPromiseLike = <T extends Promise<K>, K>(target: T): target is T => !!target && isObject(target) && isFunction(target.then) && isFunction(target.catch);

/**
 * 返回目标是否是一个类, 即可以 new 的 class 对象
 */
export const isClass = <T>(target: T | any): target is (new (...args: any[]) => any) => {
  if (typeof target !== 'function') return false;
  const __str__ = target.toString();
  if (target.prototype === undefined) return false;
  if (target.prototype.constructor !== target) return false;
  if (__str__.slice(0, 5) === 'class') return true;
  if (Object.getOwnPropertyNames(target.prototype).length >= 2) return true;
  if (/^function\s+\(|^function\s+anonymous\(/.test(__str__)) return false;
  if (/^function\s+[A-Z]/.test(__str__)) return true;
  if (/\b\(this\b|\bthis[.\[]\b/.test(__str__)) {
    if (/classCallCheck\(this/.test(__str__)) return true;
    return /^function\sdefault_\d+\s*\(/.test(__str__);
  }
  return false;
}

/**
 * 返回目标是否是一个数组对象
 */
export const isArray = (arg: any | any[]): arg is any[] => {
  if (typeof Array.isArray === 'undefined') return Object.prototype.toString.call(arg) === '[object Array]';
  return Array.isArray(arg);
}
