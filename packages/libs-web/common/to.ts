


export interface ToWaitPromiseOptions {

  waitTime: number;
}

/**
 *
 * 创建具有等待时间的 Promise, 用于阻塞函数
 *
 */
export const toWaitPromise = (options?: ToWaitPromiseOptions) => {

  const { waitTime = 3000 } = options ?? {};

  return new Promise<void>((resolve) => {


    setTimeout(() => {
      resolve();

    }, waitTime);
  });
}
