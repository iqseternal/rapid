
type TPromise = globalThis.Promise;

/**
     * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
     */
declare type Awaited<T> = T extends null | undefined ? T : // special case for `null | undefined` when not in `--strictNullChecks` mode
  T extends object & { then(onfulfilled: infer F, ...args: infer _): any; } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
  F extends ((value: infer V, ...args: infer _) => any) ? // if the argument to `then` is callable, extracts the first argument
  Awaited<V> : // recursively unwrap the value
  never : // the argument to `then` was not callable
  T; // non-object or non-thenable

declare type AwaitedCatch<T> = T extends null | undefined ? T : // special case for `null | undefined` when not in `--strictNullChecks` mode
  T extends object & { onrejected(reason: infer F, ...args: infer _): any; } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
  F extends ((value: infer V, ...args: infer _) => any) ? // if the argument to `then` is callable, extracts the first argument
  AwaitedCatch<V> : // recursively unwrap the value
  never : // the argument to `then` was not callable
  T; // non-object or non-thenable


// 扩展全局 Promise 的类型声明
declare global {
  declare type PromiseConstructorLike = new <TRes, TErr = any>(
    executor: (
      resolve: (value: TRes | PromiseLike<TRes>) => void,
      reject: (reason?: TErr) => void
    ) => void
  ) => PromiseLike<TRes, TErr>;
  declare interface PromiseLike<TRes, TErr = any> {
    then<TResult1 = TRes, TResult2 = TErr>(
      onfulfilled?: ((value: TRes) => TResult1 | PromiseLike<TResult1, TResult2>) | undefined | null,

      onrejected?: ((reason: TErr) => TResult2 | PromiseLike<TResult1, TResult2>) | undefined | null
    ): Promise<TResult1, TResult2>;
  }

  declare interface RapidPromise<TRes, TErr = any> extends Omit<globalThis.Promise<TRes>, 'catch'> {
    then<TResult1 = TRes, TResult2 = TErr>(
      onfulfilled?:
        ((value: Exclude<TRes, void>) =>
          TResult1 |
          PromiseLike<TResult1, TResult2> |
          RapidPromise<void, TResult2>
        ) |
        undefined |
        null
      ,
      onrejected?:
        ((reason: TErr) =>
          TResult2 |
          PromiseLike<void, TResult2> |
          RapidPromise<void, TResult2>
        ) |
        undefined |
        null
    ): RapidPromise<TResult1, TResult2>;

    catch<TResult = TErr>(
      onrejected?: (
        (reason: TErr) =>
          TResult |
          PromiseLike<void, TResult>
      ) |
        undefined |
        null
    ): RapidPromise<void, TResult>;
  }


  declare interface Promise<T> extends RapidPromise<T, any> { }

  // 扩展 PromiseConstructor，使其支持新的 Promise 类型
  interface PromiseConstructor {

    readonly prototype: RapidPromise<any, any>;

    new <TRes, TErr = any>(executor: (resolve: (value: TRes | PromiseLike<TRes, TErr>) => void, reject: (reason?: TErr) => void) => void): RapidPromise<TRes, TErr>;

    all<T extends readonly unknown[] | []>(values: T): Promise<{ -readonly [P in keyof T]: Awaited<T[P]>; }, { -readonly [P in keyof T]: AwaitedCatch<T[P]>; }>;

    race<T extends readonly unknown[] | []>(values: T): Promise<Awaited<T[number], AwaitedCatch<T[number]>>>;

    reject<TErr = never>(reason?: TErr): RapidPromise<void, AwaitedCatch<TErr>>;

    resolve(): RapidPromise<void, void>;

    resolve<TRes>(value: TRes): RapidPromise<Awaited<TRes>, void>;

    resolve<TRes, TErr = void>(value: TRes | PromiseLike<TRes, TErr>): RapidPromise<Awaited<TRes>, AwaitedCatch<TErr>>;
  }

  declare var Promise: PromiseConstructor;
}


export { };
