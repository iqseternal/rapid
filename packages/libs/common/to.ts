import type { JudgeAnyType, PromiseCatchReason, PromiseThenRes, RPromiseLike } from '../types';

/**
 * 创建一个 RPromiseLike 函数
 *
 *
 *
 *
 * @param fn
 * @returns
 */
export const asynced = <Fn extends (...args: any[]) => RPromiseLike<any>>(fn: (...args: Parameters<Fn>) => any): (...args: Parameters<Fn>) => ReturnType<Fn> => fn;

/**
 * @example
 * const p = new Promise(....);
 *
 * const [err, data] = await toPicket(p);
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
 * @returns
 */
export async function toPicket<
  Pr extends Promise<unknown>,
  SuccessResponse extends PromiseThenRes<Pr> = PromiseThenRes<Pr>,
  ErrorResponseSample extends PromiseCatchReason<Pr> = PromiseCatchReason<Pr>,
  ErrorResponse = JudgeAnyType<ErrorResponseSample, Error, ErrorResponseSample>
>(
  promise: Pr
): Promise<[undefined, SuccessResponse] | [ErrorResponse, undefined]> {

  return promise
    // 如果成功, 第一个参数 err 返回 undefined
    .then(data => [void 0, data] as [undefined, SuccessResponse])
    // 如果失败, 第二个参数将不存在, 失败结果将作为第一个参数返回
    // 如果失败结果也不存在, 那么会自动产生一个 Error 返回
    .catch(err => {
      if (!err) err = new Error('');

      return [err, void 0] as [ErrorResponse, undefined];
    });
}
