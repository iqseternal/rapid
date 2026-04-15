/**
 * ==========================================
 * 类型运算推导
 * ==========================================
 */


/**
 * 将对象的 key 值转换为数组
 * 例如：
 * interface A {
 *  a: number;
 *  b: {
 *    c: string;
 *    d: number;
 *  }
 * }
 *
 * const a: KeysToPathArray<A> = ['a']; // 当为 a 的时候, 只能由一个索引, 因为 A['a'] 不是一个对象
 * const a: KeysToPathArray<A> = ['b', 'c']; // 当为 b 的时候, 可以有第二个索引, 因为 A['b'] 是一个对象, 可以递归按层级识别
 */
export type KeysToPathArray<
  T,
  K extends keyof T = keyof T,
  S = T[K]
> = [K, ...(S extends object ? KeysToPathArray<S, keyof S> : [])];

/**
 * 提取对象类型, 如果一个类型类似于 type A = object; // 假设
 *
 * type C = A | A[];
 *
 * 类似于 C 类型的时候, 但是你又不能直接获取 A 类型, 需要进行类型推断的时候就可以使用这个
 *
 * 将会返回 A 类型。请注意: 如果 C 还包含了其他类型可能导致推断不正确
 */
export type UnwrapObject<T> = T extends (infer U)[] ? U : T;

/**
 * 获得数组的索引
 *
 * @example
 * type Arr = [1, 2]
 *
 * type Keys = ArrayKeys<Arr>; // '0' | '1' 包含两项
 *
 * // 请确保数据是一个常类型,readonly
 *
 */
export type TupleIndex<T extends readonly any[]> = Exclude<keyof T, Exclude<keyof T, `${number}`> | symbol | string>;

/**
 * 反转对象键值对
 *
 * type Obj = {
 *  a: 1;
 *  b: 2;
 *  c: 3;
 * }
 *
 * type ReverseObj = FlipKeyValue<Obj>;
 *
 * 那么得到的类型如下:
 * {
 *  1: 'a';
 *  2: 'b';
 *  3: 'c';
 * }
 *
 * 当然请确保传递时拥有正确的键值对
 */
export type FlipKeyValue<Obj extends Record<string | number | symbol, any>> = {
  [Key in keyof Obj as Obj[Key]]: Key;
}

/**
 * 自动补全类型，当你的一个类型是另一个的子类型的时候，你编写了部分属性，但是想在你的基础上补全你所缺少的其他类型
 *
 * 例如：
 *
 * // 基类
 * interface Lib {
 *  name: string;
 *  age: number;
 *  sex: boolean;
 * }
 *
 * function make<T extends Partial<Lib>>(options: T) {
 *   return options;
 * }
 *
 * const r = make({
 *  name: '1'
 * });
 * 当然建议在传递的时候使用 as const断言，让类型获取更加准确
 * const r = make({
 *  name: '1'
 * } as const); // !
 *
 * 此时r只会有一个键值类型 name，如果你需要补全，将除开你所编写的键值外的类型添加进去，就使用这个
 *
 * function make<T extends Partial<Lib>>(options: T) {
 *  return options as CompleteWithDefaults<T, Lib>;
 * }
 *
 *
 * T: 当前目标
 * R: 接口目标
 */
export type CompleteWithDefaults<T extends Record<string | number | symbol, any>, R extends Record<string | number | symbol, any>> = T & Pick<R, Exclude<keyof R, keyof T>>;

/**
 * 自动补全类型, 当你的一个类型是另一个的子类型的时候, 你编写了子类型, 但是当前子类型需要和父类型所含有当前子类型的 key 做交叉
 *
 * 例如
 *
 * interface A {
 *  name: string;
 *  age: number | undefined;
 * }
 *
 * function makeA<T extends Partial<T>>(props: T) { // 你的返回类型是 T
 *
 *  return props;
 * }
 *
 * const a = makeA({ // 你的返回类型是 { age: number } 但是你希望 age 是基类的全类型, 也就是 { age: number | undefined }
 *  age: 1
 * })
 *
 */
export type MergeWithParent<T extends Record<string | number | symbol, any>, R extends Record<string | number | symbol, any>> = {
  [Key in keyof T]: T[Key] extends R[Key] ? R[Key] : never;
}

/**
 * 切除一个数组的头部，将剩余部分返回结果
 */
export type CutHead<Tuple extends any[]> = ((...args: Tuple) => any) extends (first: any, ...rest: infer Result) => any ? Result : never;

/**
 * 获取一个 Promise then函数的类型
 */
export type PromiseThenCallback<Pr extends Promise<unknown>> = Parameters<Pr['then']>[0];

/**
 * 获取一个 Promise then函数回调参数 res 的类型
 */
export type PromiseResolvedType<Pr extends Promise<unknown>> = Parameters<Exclude<PromiseThenCallback<Pr>, null | undefined>>[0];

/**
 * 获取一个 Promise数据 then函数回调参数 res 数组的类型
 */
export type PromiseArrayResolvedType<PrArr extends readonly Promise<unknown>[]> = {
  readonly [Index in keyof PrArr]: PromiseResolvedType<PrArr[Index]>;
};

/**
 * 获取一个 Promise catch函数回调参数 res 的类型
 */
export type PromiseCatchCallback<Pr extends Promise<unknown>> = Parameters<Pr['catch']>[0];

/**
 * 获取一个 Promise catch函数回调参数 reason 的类型
 */
export type PromiseCatchReasonType<Pr extends Promise<unknown>> = Parameters<Exclude<PromiseCatchCallback<Pr>, null | undefined>>[0];

/**
 * 获取一个 Promise数据 then函数回调参数 reason 数组的类型
 */
export type PromiseArrayCatchReasonType<PrArr extends readonly Promise<unknown>[]> = {
  readonly [Index in keyof PrArr]: PromiseCatchReasonType<PrArr[Index]>;
};

/**
 * 判断这个类型是否是一个 never 类型, 如果是返回第一个泛型参数, 否则返回第二个
 * @example
 *
 * type C = never;
 *
 * type TResult = IsNever<C, true, false>; // true
 *
 */
export type IsNever<T, SuccessReturnType, FailReturnType> = FailReturnType extends (T extends never ? SuccessReturnType : FailReturnType) ? FailReturnType : SuccessReturnType;

/**
 * 判断这个类型是否是一个 any 类型, 如果是返回第一个泛型参数, 否则返回第二个
 *
 * @example
 * type c = any;
 * type TResult = IsAny<C, true, false>; // true
 *
 * type d = true;
 * type TResult2 = IsAny<d, true, false>; // false
 */
export type IsAny<T, SuccessReturnType, FailReturnType> = (T extends never ? 'yes' : 'no') extends 'no' ? FailReturnType : SuccessReturnType;

/**
 * 判断这个类型是否是一个 unknown 类型, 如果是返回第一个泛型参数, 否则返回第二个
 *
 * @example
 * type c = unknown;
 * type TResult = IsUnknown<C, true, false>; // true
 *
 * type d = true;
 * type TResult2 = IsUnknown<d, true, false>; // false
 */
export type IsUnknown<T, SuccessReturnType, FailReturnType> = unknown extends T ? (T extends unknown ? SuccessReturnType : FailReturnType) : FailReturnType;

/**
 * 从一个对象类型中剔除含有 never 意义的属性名
 *
 * @example
 * interface A {
 *   name: string;
 *   age: number;
 *
 *   cc: never;
 * }
 *
 * type B = ExtractNever<A>; // { name: string; age: number }
 *
 *
 */
export type ExtractNever<T> = {
  [K in keyof T as IsNever<T[K], never, K>]: T[K];
}

/**
 * 从一个对象类型中剔除含有 unknown 意义的属性名
 *
 * @example
 * interface A {
 *   name: string;
 *   age: number;
 *
 *   cc: unknown;
 * }
 *
 * type B = ExtractUnknown<A>; // { name: string; age: number }
 *
 *
 */
export type ExtractUnknown<T> = {
  [K in keyof T as IsUnknown<T[K], never, K>]: T[K];
}

/**
 * 从一个对象类型中剔除含有 any 意义的属性名
 *
 * @example
 * interface A {
 *   name: string;
 *   age: number;
 *
 *   cc: any;
 * }
 *
 * type B = ExtractAny<A>; // { name: string; age: number }
 *
 *
 */
export type ExtractAny<T> = {
  [K in keyof T as IsAny<T[K], never, K>]: T[K];
}
