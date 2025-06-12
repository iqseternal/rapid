import { useAsyncEffect } from '@rapid/libs-web/hooks';
import { toNil } from '@rapid/libs';
import type { DependencyList } from 'react';

export interface FadeOptions {
  waitTimer?: number;

  onError?: (err: unknown) => void;
}

/**
 * 同一个 HTML 页面，需要使用转场： 窗口消失，等待加载另一个路由，完成后又显示
 * 这是进入的转场
 *
 * @example
 * const Cpt: FC<any> = () => {
 *   useFadeInEffect(async () => {
 *     await windowSetSize({ width: 850, height: 550 });
 *     await windowResizeAble({ able: false });
 *   }, []);
 *
 *   return <></>;
 * }
 *
 */
export function useFadeInEffect(beforeCallback: () => (void | Promise<any>), deps: DependencyList) {
  useAsyncEffect(async () => {
    const waitTimer = 50;

    const onError = (err: unknown) => {
      console.error(err);
    }

    if (beforeCallback) {
      const [callbackErr] = await toNil(Promise.resolve(beforeCallback()));
      if (callbackErr) onError(callbackErr.reason);
    }

    setTimeout(async () => {
      const [err] = await toNil(ipcActions.windowShow({ show: true }));
      if (err) {
        console.dir(err.reason);
        onError(err.reason);
        return;
      }
    }, waitTimer);
  }, deps);
}

/**
 * 页面转出的转场
 */
export async function fadeOut(callback?: () => (void | Promise<unknown>), options?: FadeOptions) {
  const {
    waitTimer = 50,
    onError = (err: unknown) => {
      console.error(err);
    }
  } = options ?? {};

  const [err] = await toNil(window.ipcActions.windowShow({ show: false }));
  if (err) {
    console.dir(err.reason);
    onError(err.reason);
    return;
  }

  setTimeout(async () => {
    const [callbackErr] = await toNil(Promise.resolve(callback?.()));
    if (callbackErr) {
      console.dir(callbackErr.reason);
      onError(callbackErr.reason);
      return;
    }
  }, waitTimer);
}
