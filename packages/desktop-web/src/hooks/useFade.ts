import type { Ref } from 'vue';
import { onBeforeMount, onMounted, ref } from 'vue';
import { windowResizeAble, windowResetCustomSize, windowShow, windowRelaunch, WindowPopup } from '@/actions';
import { CONFIG, IS_WEB } from '@rapid/config/constants';

export type FadeCallback = () => void | Promise<void>;

export interface FadeOptions {
  timer?: number;
}

const FADE_IN_OPTIONS: FadeOptions = {
  timer: CONFIG.FADE.FADE_IN.TIMER
};

const FADE_OUT_OPTIONS: FadeOptions = {
  timer: CONFIG.FADE.FADE_OUT.TIMER
};

const isFaded = ref(false);

/**
 * 同一个 HTML 页面，需要使用转场： 窗口消失，等待加载另一个路由，完成后又显示
 * 这是进入的转场
 * @param callback
 * @param options
 */
export async function useFadeIn(callback: FadeCallback = () => {}, options?: FadeOptions) {
  options = { ...FADE_IN_OPTIONS, ...options  };

  onBeforeMount(async () => {
    await callback()?.catch(err => {
      console.log(err);
    });
  });
  onMounted(async () => {
    if (IS_WEB) return;

    setTimeout(async () => {
      await windowShow({ show: true }).catch(windowRelaunch);
      isFaded.value = true;
    });
  });
}

/**
 * 页面转出的转场
 * @param callback
 * @param options
 */
export async function useFadeOut(callback: FadeCallback, options?: FadeOptions) {
  options = { ...FADE_OUT_OPTIONS, ...options  };

  isFaded.value = false;

  await windowShow({ show: false }).catch(windowRelaunch);
  setTimeout(async () => {
    await callback();
    setTimeout(() => {
      if (isFaded.value === false) {
        windowShow({ show: true }).then(() => {
          WindowPopup.warn('跳转出现错误');
        }).catch(windowRelaunch);
      }
    }, 2000);
  }, options.timer);
}
