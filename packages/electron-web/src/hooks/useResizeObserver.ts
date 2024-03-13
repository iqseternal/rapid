
import type { Ref } from 'vue';

import { onMounted, onBeforeUnmount } from 'vue';

/**
 * 当监听的元素的尺寸发生变化时,执行回调函数
 * @param dom
 * @param callback
 * @returns
 */
export function useResizeObserver<T extends HTMLElement>(dom: Ref<T | undefined>, callback: ResizeObserverCallback) {
  const resizeObserver = new ResizeObserver(callback);

  onMounted(() => {
    if (!dom.value) return;

    resizeObserver.observe(dom.value);
  })

  onBeforeUnmount(() => {
    resizeObserver.disconnect();
  })

  return resizeObserver;
}
