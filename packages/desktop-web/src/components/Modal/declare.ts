import { defineProps } from 'vue';
import type { ModalProps as AntdModalProps } from 'ant-design-vue';

export const getProps = () => defineProps({
  width: { type: [Number, String], default: 700 },
  minWidth: { type: [Number, String], default: 700 },
  height: { type: [Number, String], default: 0 },
  title: { type: String, default: '' },
  visible: { type: Boolean, default: false },
  confimLoading: { type: Boolean, default: false },
  centered: { type: Boolean, default: true },
  cancelText: { type: String, default: '取消' },
  okText: { type: String, default: '确定' }
});

export type ModalProps = ReturnType<typeof getProps>;

export function getTop<T extends HTMLElement>(e: T) {
  let offset = e.offsetTop;
  if (e.offsetParent !== null) offset += getTop(e.offsetParent as HTMLElement);
  return offset;
}

const minHeight = 100;
const maxHeight = 700;

export const fndLast = (arr: HTMLCollectionOf<Element>, isNumChange: boolean = false): HTMLElement => {
  let item: HTMLElement | null = null;

  const newArr = Array.from(arr) as HTMLElement[];
  if (isNumChange) newArr.pop();

  newArr.forEach(value => {
    if (value.classList.contains('ant-modal-content')) item = value;
  });
  return item as unknown as HTMLElement;
}

export async function dragStretch(widthR: string | number, heightR: string | number, isNUmChange?: boolean) {
  const width = parseInt(widthR + '');
  const height = parseInt(heightR + '');

  const body = document.getElementsByTagName('body')[0] as HTMLBodyElement;

  const modal = fndLast(document.getElementsByClassName('ant-modal-content'), isNUmChange); // 获取主要元素
  if (!modal) return;

  const dragHeader = modal.querySelector('.ant-modal-header') as HTMLDivElement; // 获取头部
  const content = (modal.querySelector('.ant-modal-body') as HTMLDivElement).children[0] as HTMLDivElement; // 控制内部元素
  const parent = modal.parentNode as HTMLDivElement; // 获取外层定位元素

  // 设置内容初始高度和最小高度
  if (!isNUmChange && body.clientHeight <= 720 && height > 350) content.style.height = '350px';
  else if (!isNUmChange && 720 < body.clientHeight && body.clientHeight <= 864 && height > 500) content.style.height = '500px';
  else content.style.height = `${isNUmChange ? content.offsetHeight : height}px`;

  content.style.minHeight = `${minHeight}px`;

  modal.style.minHeight = `${width}px`;
  modal.style.top = `${getTop(modal)}px`;
  modal.style.left = window.innerWidth / 2 - modal.getBoundingClientRect().width / 2 - parent.getBoundingClientRect().left + 'px';
  modal.style.height = modal.offsetHeight + 'px';

  parent.style.verticalAlign = 'top';

  const spanArr = ['n', 'e', 's', 'w', 'se', 'sw', 'ne', 'nw']; // 拉伸外层 div

  spanArr.forEach(item => {
    const span = document.createElement('span');
    span.classList.add(item, 'pubSpan');
    modal.appendChild(span);
  });

  dragHeader.style.cursor = 'move';
  dragHeader.onmousedown = event => {
    // 获取头高度
    const headeHeight = dragHeader.offsetHeight;
    // 弹窗显示宽度
    const { offsetWidth: headWidth } = modal;

    // 确定初始偏移
    const leftWidth = parent.offsetLeft;
    // 获取当前鼠标的位置
    const { clientX: cursorLeft, clientY: cursorTop } = event;
    // 已经偏移的距离，初始左偏移 0， 通过父级获取相对窗口的偏移距离

    const headLeft = +modal.style.left.replace(/px/g, '');
    const headTop = +modal.style.top.replace(/px/g, '');

    document.onmousemove = e => {

      // 移动距离

      const moveWidth = e.clientX - cursorLeft;
      const moveHeight = e.clientY - cursorTop;

      // 左右数据更改
      if (headLeft + moveWidth + headWidth + leftWidth > body.clientWidth) {
        modal.style.left = `${body.clientWidth - headWidth - leftWidth}px`;
      }
      else if (headLeft + moveWidth + leftWidth <= 0) {
        modal.style.left = `${-leftWidth}px`;
      }
      else if (headLeft + moveWidth + leftWidth > 0) {
        modal.style.left = `${moveWidth + headLeft}`;
      }

      // 上下数据更改
      if (headTop + moveHeight + headeHeight > body.clientHeight) {
        modal.style.top = `${body.clientHeight - headeHeight}px`;
      }
      else if (moveHeight + headTop > 0) {
        modal.style.top = `${moveHeight + headTop}px`;
      }
      else if (moveHeight + headTop <= 0) {
        modal.style.top = 0 + 'px';
      }

      e.preventDefault();
    }

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
    }
  }
}
