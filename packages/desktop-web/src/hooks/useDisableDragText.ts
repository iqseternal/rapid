import { Ref, onBeforeMount, onBeforeUnmount, onMounted, ref } from 'vue';

/**
 * 禁用托拽元素，原因为托拽可能会引起让本应该不能选中的文字被托拽到屏幕上浮动
 */
export function useDisableDragText(dom: Ref<HTMLElement | undefined> = ref(document.body)) {
  // const dragStartFn = document.body.ondragstart;

  let dragStartFn: Required<HTMLElement>['ondragstart'];

  onMounted(() => {
    if (!dom.value) return;
    dragStartFn = dom.value.ondragstart;
    dom.value.ondragstart = () => false;
  })

  onBeforeUnmount(() => {
    if (!dom.value) return;

    dom.value.ondragstart = dragStartFn;
  })
}

/**
 * 此函数还没有完善，作用为开启禁用托拽后子级的托拽功能
 */
export function useEnableDragText(dom: Ref<HTMLElement | undefined> = ref(document.body)) {
  // const dragStartFn = document.body.ondragstart;

  let dragStartFn: Required<HTMLElement>['ondragstart'];

  onMounted(() => {
    if (!dom.value) return;
    dragStartFn = dom.value.ondragstart;
    dom.value.ondragstart = null;
  })

  onBeforeUnmount(() => {
    if (!dom.value) return;

    dom.value.ondragstart = dragStartFn;
  })
}
