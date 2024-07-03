import type { FC, Ref, RefObject, DependencyList } from 'react';
import { useEffect, useRef, useState } from 'react';
import { CONFIG, IS_WEB } from '@rapid/config/constants';
import { windowShow, windowReload, windowRelaunch } from '@/actions';
import { useAsyncEffect } from '@rapid/libs/hooks';

export interface FadeOptions {
  waitTimer?: number;

  onError?: (err: any) => void;
}

/**
 * 同一个 HTML 页面，需要使用转场： 窗口消失，等待加载另一个路由，完成后又显示
 * 这是进入的转场
 */
export async function useFadeIn(beforeCallback?: () => void | Promise<void>, options?: FadeOptions) {
  const { waitTimer = CONFIG.FADE.FADE_IN.TIMER, onError = () => {} } = options ?? {};

  useAsyncEffect(async () => {
    beforeCallback && await beforeCallback();
    if (IS_WEB) return;

    setTimeout(() => {
      windowShow({ show: true }).catch(onError);
    }, waitTimer);
  }, []);
}

/**
 * 页面转出的转场
 */
export async function useFadeOut(callback?: () => void | Promise<void>, options?: FadeOptions) {
  const { waitTimer = CONFIG.FADE.FADE_OUT.TIMER, onError = () => {} } = options ?? {};

  if (!IS_WEB) await windowShow({ show: false }).catch(windowRelaunch);

  setTimeout(async () => {
    callback && await callback();

    if (!IS_WEB) await windowShow({ show: true }).catch(onError);
  }, waitTimer);
}
