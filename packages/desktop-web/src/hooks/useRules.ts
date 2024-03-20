import { isDef, isFunction, isString, isUndefined } from '@suey/pkg-utils';
import type { FormProps } from 'ant-design-vue';
import type { ExtractObj } from '@rapid/libs/types';
import { findArrIndex } from '@rapid/libs/common';

export type AntdRules = Required<FormProps>['rules'];

export type AntdRuleObject = ExtractObj<AntdRules[string]>;

export type AntdValidator<V, RulesForm = any> = (rules: RulesForm, value: V, callback: (errMsg?: string) => void) => Promise<string | void>;

// 验证函数的类型
export type ValidatorFn<T> = (value: T) => boolean | Promise<boolean>;

// 可以传递给 useRules 的 validator 的类型
export type RuleArr<T> = (string | ValidatorFn<T> | RuleArr<T>)[];

export type RuleObject<V> = Omit<AntdRuleObject, 'validator'> & {
  validator?: RuleArr<V>;
};

export type Rules<R> = {
  [Key in keyof R]: RuleObject<R[Key]>;
};

// 逻辑函数，和 useRules 传递的函数一起用, 可对传递函数进行逻辑变换
export const is = <T>(validatorFn: ValidatorFn<T>): ValidatorFn<T> => validatorFn;

export const and = <T>(...validatorFns: ValidatorFn<T>[]): ValidatorFn<T> => (value) => validatorFns.every(fn => fn(value));

export const or = <T>(...validatorFns: ValidatorFn<T>[]): ValidatorFn<T> => (value) => validatorFns.some(fn => fn(value));

export const not = <T>(validatorFn: ValidatorFn<T>): ValidatorFn<T> => (value) => !validatorFn(value);

/**
 * 使用校验Hook
 *
 * 使用 Antd 组件的时候，通常的写法可能像这样
 *
 * const rules: FormProps['rules'] = {
 *   name: {
 *     required: true,
 *     validator: (_, value) => new Promise((resolve, reject) => {
 *      if (!value || (value as string).trim() === '') return reject('请输入名称');
 *       return resolve();
 *     })
 *   }
 * }
 *
 * 这样写会使得 if else new Promise 频出，逻辑判断块庞大
 *
 * 可以采用 useRules
 *
 * 编写就会像这样
 *
 * const rules = useRules<Response>({
 *   name: {
 *      required: true,
 *      validator: [
 *        校验规则函数1, '校验错误信息1',
 *        校验规则函数2, '校验错误信息2'
 *        校验规则函数3, '校验错误信息3'
 *      ]
 *   }
 * })
 *
 * 编写工作就会变成组合函数校验规则
 *
 * @param rules
 * @returns
 */
export function useRules<R>(rules: Partial<Rules<R>>): AntdRules {
  /**
   * 校验一个子块是否符合逻辑
   * @param value
   */
  function judgeSubChunk<V>(arr: RuleArr<V>, value: V): true | string {
    function isRangeIndex(index: number) { return index >= 0 && index < arr.length; }

    for (let i = 0;i < arr.length;i ++) {
      if (isString(arr[i])) throw new Error(`useRules: 不能将字符串作为条件数组的开始`);
      if (Array.isArray(arr[i])) throw new Error(`useRules: 不能将条件数组作为条件判断的开始`);

      if (isFunction(arr[i])) {
        const j = findArrIndex(arr, e => !isFunction(e), i + 1);
        // 函数作为了条件数组的结尾，错误！
        if (!isRangeIndex(j)) throw new Error(`useRules: 不能将函数作为条件数组的结尾`);
        // 集合条件
        const fn = and(...(arr.slice(i, j) as ValidatorFn<V>[]));
        // 做出判断
        const result = fn(value);

        if (result) {
          // 后续是个数组, 那么走子块逻辑
          if (Array.isArray(arr[j])) {
            const subStatus = judgeSubChunk(arr[j] as RuleArr<V>, value);
            if (isString(subStatus)) return subStatus;
          }

          // 不是逻辑块, 那么就应该走下一个逻辑
          i = findArrIndex(arr, e => isFunction(e), j) - 1;
          if (i < 0) return true;
        }
        else {
          // 出现错误条件了, 要么走子块逻辑, 要么就结束了
          // 错误
          if (isString(arr[j])) return arr[j] as string;
          // 错误块子逻辑
          if (Array.isArray(arr[j]) && j + 1 < arr.length) {
            if (Array.isArray(arr[j + 1])) {
              if (arr[j + 1].length < 2) throw new Error(`useRules: 子逻辑表述错误`);
              const subStatus = judgeSubChunk(arr[j + 1] as RuleArr<V>, value);
              if (isString(subStatus)) return subStatus;
            }
            else if (isString(arr[j + 1])) return arr[j + 1] as string;
            else throw new Error(`useRules: 子逻辑表述错误`);
          }
          // 下一次
          i = findArrIndex(arr, e => isFunction(e), j) - 1;
          if (i < 0) return true;
          // throw new Error(`useRules: 不能将函数作为条件数组的结尾`);
        }
      }
    }
    return true;
  }

  /**
   * 转换校验规则，将自定义的规则传入转换为antd的格式
   * @param ruleObject
   * @returns
   */
  function convert<V>(ruleObject: RuleObject<V>): AntdRuleObject {
    if (!ruleObject.validator) return ruleObject as AntdRuleObject;

    const validators = ruleObject.validator;

    (ruleObject as AntdRuleObject).validator = (rules, value, callback) => new Promise((resolve, reject) => {
      const res = judgeSubChunk(validators, value);

      if (isString(res)) reject(res);
      else resolve();
    });

    return ruleObject as AntdRuleObject;
  }

  const antRules: AntdRules = {};
  for (const key in rules) {
    const ruleObject = rules[key];
    if (!ruleObject) continue;
    antRules[key] = convert(ruleObject);
  }
  return antRules;
}
