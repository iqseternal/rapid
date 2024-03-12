import type { Directive, UnwrapNestedRefs, UnwrapRef, Plugin, DirectiveBinding } from 'vue';
import { computed, getCurrentInstance, reactive, ref, watchEffect, watch, onBeforeUnmount } from 'vue';
import { setStyleProperty } from '../../common';
import { isDef, isUndefined } from '@suey/pkg-utils';
import { printError } from '@suey/printer';
import { IS_DEV } from '../../constants';
import type { SpaceHTMLElement } from '../basic';
import { registerUnmountEvt, unmountAllEvts } from '../basic';

import styles from './vResizeWidth.module.scss';

const DEFAULT_BINDINGS = {
  minWidth: 150,
  width: 300,
  maxWidth: 400,
  barSize: 4,
  barHoverClass: styles.dragAndDropBarHover,
  barClass: styles.dragAndDropBar,
  barActiveClass: styles.dragAndDropBarActive,
  canDrag: false,
  direction: 'right' as ('left' | 'right'),
  canExec: true
}

export { styles };

export type VResizeWidthBindings = UnwrapNestedRefs<Partial<typeof DEFAULT_BINDINGS> & Pick<Required<typeof DEFAULT_BINDINGS>, 'width'>>;

export const vResizeWidthName = 'resizeWidth';

const toPixel = (value: number) => value + 'px';

/**
 * 托拽列宽的指令
 */
export const vResizeWidth: Directive<HTMLElement, VResizeWidthBindings> = {
  mounted(el, bindings, vnode, node) {
    if (!el.parentElement) return;
    const position = getComputedStyle(el.parentElement).position;
    if (!['absolute', 'relative'].includes(position)) el.parentElement.style.position = 'relative';

    const { value, modifiers, oldValue, dir, arg } = bindings as DirectiveBinding<Required<typeof DEFAULT_BINDINGS>>;
    if (IS_DEV && !value) {
      printError(`vResizeWidth: 未传递参数`);
      return;
    }

    // 初始化数据
    for (const key in DEFAULT_BINDINGS) if (isUndefined(value[key])) value[key] = DEFAULT_BINDINGS[key];
    const defaultValue = { ...value };
    value.barActiveClass = '';
    value.barHoverClass = '';

    // 托拽 Dom
    const div = document.createElement('div');

    // 设置极限宽度
    watchEffect(() => setStyleProperty(el, 'minWidth', toPixel(value.minWidth)));
    watchEffect(() => setStyleProperty(el, 'maxWidth', toPixel(value.maxWidth)));

    // 设置当前宽度
    setStyleProperty(el, 'width', toPixel(value.width));
    value.width = parseInt(getComputedStyle(el).width);
    watch(() => value.width, () => setStyleProperty(el, 'width', toPixel(value.width)));

    // 设置动作类名
    const combationClassname = computed(() => [value.barHoverClass, value.barClass, value.barActiveClass].join(' '));
    watchEffect(() => { div.className = combationClassname.value; });
    watchEffect(() => setStyleProperty(div, 'width', toPixel(value.barSize)));

    // 设置 Dom 的定位
    const location = () => {
      if (!value.canExec) return;
      const v = el.offsetLeft + (value.direction === 'right' ? el.getBoundingClientRect().width - value.barSize / 2 : -1 * value.barSize);
      setStyleProperty(div, 'left', toPixel(v));
    }
    watch(() => [value.width, value.barSize], location);
    location();
    window.addEventListener('resize', location);
    registerUnmountEvt(el, () => window.removeEventListener('resize', location));

    // 设置动作类名的事件
    div.onmouseenter = () => (value.barHoverClass = defaultValue.barHoverClass);
    div.onmouseleave = () => (value.barHoverClass = '');

    // 改变鼠标样式
    const defaultCursor = document.body.style.cursor;
    watch(() => value.canDrag, nv => {
      // if (!value.canExec) return;
      if (nv) {
        value.barActiveClass = defaultValue.barActiveClass;
        document.body.style.cursor = 'ew-resize !important';
      }
      else {
        value.barActiveClass = '';
        document.body.style.cursor = defaultCursor;
      }
    });

    // 设置托拽事件,改变 Dom 的宽度
    div.onmousedown = () => (value.canDrag = true);

    const disableDrag = () => {
      (value.canDrag = false);
      if (!value.canExec) return;
    }
    const move = (e: MouseEvent) => {
      if (!value.canDrag) return;
      if (!value.canExec) return;

      let targetWidth = value.width;
      if (value.direction === 'right') targetWidth += e.movementX;
      else if (value.direction === 'left') targetWidth -= e.movementX;

      if (targetWidth <= value.minWidth) value.width = value.minWidth;
      else if (targetWidth >= value.maxWidth) value.width = value.maxWidth;
      else value.width = targetWidth;
    }

    window.addEventListener('mouseup', disableDrag);
    registerUnmountEvt(el, () => window.removeEventListener('mouseup', disableDrag));

    window.addEventListener('mousemove', move);
    registerUnmountEvt(el, () => window.removeEventListener('mousemove', move));

    el.parentElement.appendChild(div);
  },
  beforeUnmount(el) {
    unmountAllEvts(el);
  }
}

export default <Plugin> {
  install(app) {
    app.directive(vResizeWidthName, vResizeWidth);
  }
}
