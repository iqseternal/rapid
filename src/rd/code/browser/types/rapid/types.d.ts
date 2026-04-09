

declare global {
  export namespace Rapid.Types {
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
    export type IsNever<T, SuccessReturnType, FailReturnType> = T extends never ? SuccessReturnType : FailReturnType;
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
    export type IsAny<T, SuccessReturnType, FailReturnType> = IsNever<T, 'yes', 'no'> extends 'no' ? FailReturnType : SuccessReturnType;
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
  }
}

export { };
