import { isClass, isFunction, isObject } from '@suey/pkg-utils';
import type { ClassType, Component, FC, ForwardRefExoticComponent, LazyExoticComponent } from 'react';
/**
 * 合并多个classname类名,
 * @example
 * ``` tsx
 * <div
 *    className={
 *      combinationCName(
 *        类名1,
 *        类名2,
 *        {
 *          [类名3]: 布尔值,
 *          [类名4]: 布尔值
 *        },
 *        .....
 *       )
 *    }
 * ></div>
 *
 * @param args
 * @return
 */
export const combinationCName = (...args: (string | undefined | boolean | number | Record<string, boolean | undefined>)[]) => {
  const classNameList: string[] = [];

  args.forEach(arg => {
    if (!arg) return;
    if (typeof arg === 'string') {
      classNameList.push(arg);
      return;
    }
    if (typeof arg === 'boolean') {
      return;
    }
    if (typeof arg === 'number') {
      return;
    }

    for (const key in arg) {
      if (arg[key]) classNameList.push(key);
    }
  });

  return classNameList.join(' ');
}

/**
 * 判断一个对象是否是一个被 lazy 包裹的 FC 组件
 * @param target
 * @returns
 */
export const isReactLazyFC = <Target extends LazyExoticComponent<FC<any>>>(target: Target | any): target is Target => {
  if (!isObject(target)) return false;

  const isSymbol = typeof (target as unknown as Target).$$typeof === 'symbol';
  if (!isSymbol) return false;

  // lazy FC
  return (
    Reflect.has(target, '_init') &&
    Reflect.has(target, '_payload') &&
    typeof ((target as any)._init) === 'function' &&
    isObject((target as any)._payload)
  );
}

/**
 * 判断一个对象是否是一个 forwardRef FC
 * @param target
 * @returns
 */
export const isReactForwardFC = <Target extends ForwardRefExoticComponent<any>>(target: Target | any): target is Target => {
  if (!isObject(target)) return false;

  const isSymbol = typeof (target as unknown as Target).$$typeof === 'symbol';
  if (!isSymbol) return false;

  // 常规 FC
  return typeof (target as any).render === 'function';
}

/**
 * 判断是否是 FC
 */
export const isReactFC = <Target extends FC<any>>(target: Target | any): target is Target => isFunction(target);

/**
 * 判断是否是一个 类组件
 * @param target
 * @returns
 */
export const isReactClassComponent = <Target extends Component<any>>(target: Target | any): target is Target => {
  // 判断类组件
  return isClass(target) && isFunction(target.prototype.render);
}

/**
 * 判断一个对象是否可能是 一个可用的 React 组件
 * @param target
 * @returns
 */
export const isReactComponent = <
  Target extends FC<any> | Component<any> | ForwardRefExoticComponent<any> | LazyExoticComponent<FC<any>>
>(target: Target | any): target is Target => {

  return (
    isReactFC(target) ||
    isReactClassComponent(target) ||

    isReactForwardFC(target) ||
    isReactLazyFC(target)
  );
}
