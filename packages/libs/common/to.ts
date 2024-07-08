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
 * @returns
 */
export async function toPicket<Resp, ErrorExt extends object = {}>(
  promise: Promise<Resp>,
  errorExt?: ErrorExt
): Promise<[undefined, Resp] | [Error & ErrorExt, undefined]> {
  return promise
    .then(data => [void 0, data] as [undefined, Resp])
    .catch(err => {
      if (errorExt) {
        Object.assign(err, errorExt);
      }
      return [err as Error & ErrorExt, void 0] as [Error & ErrorExt, undefined];
    });
}
