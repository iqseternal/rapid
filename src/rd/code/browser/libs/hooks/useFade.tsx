import { useAsyncEffect } from '@rapid/libs-web/hooks';
import { toNil } from '@rapid/libs';

export interface FadeOptions {
  waitTimer?: number;

  onError?: (err: any) => void;
}

/**
 * 同一个 HTML 页面，需要使用转场： 窗口消失，等待加载另一个路由，完成后又显示
 * 这是进入的转场
 *
 * @example
 * const Cpt: FC<any> = () => {
 *   useFadeIn(async () => {
 *     await windowSetSize({ width: 850, height: 550 });
 *     await windowResizeAble({ able: false });
 *   });
 *
 *   return <></>;
 * }
 *
 */
export function useFadeIn(beforeCallback?: () => (void | Promise<any>), options?: FadeOptions) {
  const {
    waitTimer = 50,
    onError = (err: any) => {
      console.error(err);
    }
  } = options ?? {};

  useAsyncEffect(async () => {
    if (beforeCallback) {
      const [err] = await toNil(Promise.resolve(beforeCallback()));

      if (err) {
        console.dir(err.reason);
        onError(err.reason);
        return window.ipcActions.windowShow({ show: true }).catch(onError);
      }
    }

    setTimeout(async () => {
      window.ipcActions.windowShow({ show: true }).catch(onError);
    }, waitTimer);
  }, []);
}

/**
 * 页面转出的转场
 */
export async function useFadeOut(callback?: () => (void | Promise<any>), options?: FadeOptions) {
  const {
    waitTimer = 50,
    onError = (err: any) => {
      console.error(err);
    }
  } = options ?? {};

  await window.ipcActions.windowShow({ show: false }).catch(onError);
  callback && Promise.resolve(callback())?.catch(onError);
}
