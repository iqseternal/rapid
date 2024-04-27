import { reactive } from 'vue';
import type { default as PickColors } from 'vue-pick-colors';

export type PickColorsProps = Partial<Required<typeof PickColors>['__defaults']> & {
  popupContainer: HTMLElement;
};

const pickColorsAttrs: PickColorsProps = reactive({
  // size: 30,
  showAlpha: true,

  format: 'hex',

  popupContainer: document.body
})

/**
 * 编写 pickColor 的 attrs
 */
export function usePickColorsAttrs() {
  const setPopupContainer = (dom: HTMLElement) => {
    pickColorsAttrs.popupContainer = dom;
  }

  return { pickColorsAttrs, setPopupContainer }
}

/**
 * 假如有特殊的需求, 需要为某个 pickColor 创建局部的 attrs 的时候使用
 */
export function useScopedPickColorsAttrs() {
  const pickColorsAttrs: PickColorsProps = reactive({
    // size: 30,
    showAlpha: true,

    format: 'hex',

    popupContainer: document.body
  })

  const setPopupContainer = (dom: HTMLElement) => {
    pickColorsAttrs.popupContainer = dom;
  }

  return { pickColorsAttrs, setPopupContainer }
}

export const usePickColorsAttrsHook = usePickColorsAttrs;
export const useScopedPickColorsAttrsHook = useScopedPickColorsAttrs;
