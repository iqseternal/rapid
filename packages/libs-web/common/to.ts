


export interface ToWaitPromiseOptions {
  /**
   * 等待的结果
   */
  waitResult?: 'resolve' | 'reject';

  /**
   * 等待的时间
   * @default 3000
   */
  waitTime: number;
}

/**
 *
 * 创建具有等待时间的 Promise, 用于阻塞异步函数
 *
 */
export const toWaitPromise = (options?: ToWaitPromiseOptions): Promise<void> => {
  const { waitTime = 3000, waitResult = 'resolve' } = options ?? {};

  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (waitResult === 'resolve') return resolve();
      if (waitResult === 'reject') return reject();

      resolve();
    }, waitTime);
  });
}
