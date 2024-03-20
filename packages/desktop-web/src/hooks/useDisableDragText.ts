import { onBeforeMount, onBeforeUnmount } from 'vue';

/**
 * 禁用托拽元素，原因为托拽可能会引起让本应该不能选中的文字被托拽到屏幕上浮动
 */
export function useDisableDragText() {
  const dragStartFn = document.body.ondragstart;

  onBeforeMount(() => {
    document.body.ondragstart = () => false;
  })

  onBeforeUnmount(() => {
    document.body.ondragstart = dragStartFn;
  })
}
