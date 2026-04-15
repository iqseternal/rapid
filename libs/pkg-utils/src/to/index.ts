import { RPromiseLike, PromiseResolvedType, PromiseCatchReasonType, PromiseArrayResolvedType, PromiseArrayCatchReasonType } from '../types';
import { isNumber, isRawObject } from '../fnUtils';

/**
 * 创建一个 RPromiseLike 函数
 *
 * const req = asynced<() => RPromiseLike<number, string>>(async () => {
 *   // TODO
 *   if (xxx) return Promise.reject('1');
 *
 *   return Promise.resolve(1);
 * })
 * @param fn
 * @returns
 */
export const asynced = <Fn extends (...args: any[]) => RPromiseLike<any>>(fn: (...args: Parameters<Fn>) => any): (...args: Parameters<Fn>) => ReturnType<Fn> => fn;

export namespace Nil {
  export const NilRefusedReasonSymbol = Symbol('nil');

  /**
   * toNil 解析错误返回的对象类型
   */
  export type NilRefusedReasonType<Reason extends any = any> = {
    readonly reason: Reason;
  };

  /**
   * 提取目标的 Nil Reason Target
   */
  export type ExtractNilRefusedReasonTargetType<T extends any> = T extends NilRefusedReasonType ? T['reason'] : T;

  export type NilAnalysisPassedResponseType<Pass> = readonly [undefined, Pass];
  export type NilAnalysisRefusedResponseType<Reason> = readonly [NilRefusedReasonType<Reason>, undefined];

  /**
   * toNil 解析响应类型
   */
  export type NilAnalysisResponseType<Pass, Reason> = NilAnalysisRefusedResponseType<Reason> | NilAnalysisPassedResponseType<Pass>;

  /**
   * 判断目标是否是 nil 返回的拒绝对象
   */
  export const isNilRefusedReason = <T>(target: T | NilRefusedReasonType): target is NilRefusedReasonType => {
    return (
      isRawObject(target) &&
      Reflect.has(target, '__symbol__') &&
      Reflect.has(target, 'reason') &&
      Reflect.getOwnPropertyDescriptor(target, '__symbol__')?.value === NilRefusedReasonSymbol
    )
  }

  /**
   * 解析, 从 NilRefusedReason 中解析 reason 对象
   * @param target
   */
  export const parseNilRefusedReasonTarget = <T>(target: T | NilRefusedReasonType): any | undefined => {
    if (isNilRefusedReason(target)) {
      return parseNilRefusedReasonTarget(target.reason);
    }
    return target;
  }

  /**
   * 创建 nil 返回的拒绝对象
   */
  export const makeNilRefusedReason = <T>(error: T): NilRefusedReasonType<T> => {
    const reason = parseNilRefusedReasonTarget(error);

    const target = {
      reason: reason
    };

    if (Reflect.defineProperty(target, '__symbol__', {
      enumerable: false,
      configurable: false,
      value: NilRefusedReasonSymbol,
      writable: false
    })) {
      return target as NilRefusedReasonType<T>;
    }

    return {
      __symbol__: NilRefusedReasonSymbol,
      reason: reason
    } as unknown as NilRefusedReasonType<T>;
  }
}

/**
 * @example
 * const p = new Promise(....);
 *
 * const [err, data] = await toNil(p);
 * if (err) return; // 处理错误
 *
 * const { list } = data; // 正常执行
 * @description
 * 为了解决串行异步任务中有异常处理问题
 *
 * 1. Promise
 * p1.then(res => p2).catch(err => {})
 *
 * // 不太美观，希望试用 async await 语法糖
 *
 * 例如:
 * const res = await p1;
 * const res2 = await p2;
 *
 * 但这样缺少异常处理
 *
 * 2. try catch
 *
 * try {
 *
 *  const r1 = await p1;
 *
 *  const r2 = await p2;
 *
 * } catch(e) {
 *
 * }
 *
 * 很难为单独 promise 处理错误, 如果每一个 promise 都去写个 try catch 那么会很冗长
 *
 * 于是采用了 Go 的哨兵处理机制
 */
export function toNil<
  Pr extends Promise<unknown>,
  NilPassedData extends PromiseResolvedType<Pr> = PromiseResolvedType<Pr>,
  NilRefusedReason extends Nil.ExtractNilRefusedReasonTargetType<PromiseCatchReasonType<Pr>> = Nil.ExtractNilRefusedReasonTargetType<PromiseCatchReasonType<Pr>>,
>(
  promise: Pr
): RPromiseLike<Nil.NilAnalysisResponseType<NilPassedData, NilRefusedReason>, undefined> {

  const pr = promise
    // 如果成功, 第一个参数 err 返回 undefined
    .then(data => [void 0, data] as Nil.NilAnalysisPassedResponseType<NilPassedData>)
    // 如果失败, 第二个参数将不存在, 失败结果将作为第一个参数返回
    // 如果失败结果也不存在, 那么会自动产生一个 Error 返回
    .catch(err => ([Nil.makeNilRefusedReason(err), void 0]));

  return pr as RPromiseLike<Nil.NilAnalysisResponseType<NilPassedData, NilRefusedReason>, undefined>;
}

/**
 * 同步解决多个 Promise，参照 toNil 功能
 * @example
 *
 * const [p1, p2] = await toNils(Promise.resolve(1), Promise.resolve('a'));
 * const [p1Err, p1Res] = p1, [p2Err, p2Res] = p2;
 *
 * if (p1Err || p2Err) {
 *   console.error('error');
 *   return;
 * }
 *
 * const res = '' + p1Res + p2Res;
 *
 * console.log(res);
 */
export async function toNils<
  Prs extends readonly Promise<unknown>[],
  NilPassedDataArray extends PromiseArrayResolvedType<Prs> = PromiseArrayResolvedType<Prs>,
  NilRefusedReasonArray extends PromiseArrayCatchReasonType<Prs> = PromiseArrayCatchReasonType<Prs>,
>(
  ...promises: Prs
): Promise<Array<readonly [unknown, unknown]> & {
  readonly [K in keyof Prs]: Nil.NilAnalysisResponseType<NilPassedDataArray[K], Nil.ExtractNilRefusedReasonTargetType<NilRefusedReasonArray[K]>>;
}> {
  const results = await Promise.allSettled(promises);

  return results.map(result => {
    if (result.status === 'fulfilled') return [void 0, result.value];

    return [Nil.makeNilRefusedReason(result.reason), void 0];
  }) as Array<readonly [unknown, unknown]> & {
    readonly [K in keyof Prs]: Nil.NilAnalysisResponseType<NilPassedDataArray[K], Nil.ExtractNilRefusedReasonTargetType<NilRefusedReasonArray[K]>>;
  }
}


export interface ToWaitPromiseOptions {
  /**
   * 等待的结果
   */
  waitResult?: 'resolve' | 'reject';

  /**
   * 等待的时间
   * @default 2000
   */
  waitTime: number;
}


/**
 *
 * 创建具有等待时间的 Promise, 用于阻塞异步函数
 *
 */
export function toWaitPromise(waitTime: number): RPromiseLike<void, void>;

/**
 *
 * 创建具有等待时间的 Promise, 用于阻塞异步函数
 *
 */
export function toWaitPromise(options?: ToWaitPromiseOptions): RPromiseLike<void, void>;

export function toWaitPromise(op?: number | ToWaitPromiseOptions): RPromiseLike<void, void> {
  const options: ToWaitPromiseOptions = {
    waitTime: 2000
  }

  if (isNumber(op)) options.waitTime = op;
  else {
    if (op) {
      options.waitResult = op.waitResult;
      options.waitTime = op.waitTime;
    }
  }

  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (options.waitResult ==='resolve') return resolve();
      if (options.waitResult ==='reject') return reject();
      resolve();
    }, options.waitTime);
  }) as RPromiseLike<void, void>;
}
