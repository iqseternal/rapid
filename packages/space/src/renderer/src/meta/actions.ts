import type { Pen } from '@meta2d/core';
import { deepClone } from '@meta2d/core';

/** 撤销事件 */
export const onUndo = () => meta2d.undo();

/** 重做 */
export const onRedo = () => meta2d.redo();

/**  */
export const onCut = () => meta2d.cut();

/** 复制事件 */
export const onCopy = () => meta2d.copy();

/** 粘贴事件 */
export const onPaste = () => meta2d.paste();

/** 全选事件 */
export const onSelectAll = () => meta2d.activeAll();

/** 删除事件 */
export const onDelete = () => meta2d.delete();

/** 添加图形事件 */
export const onAddShape = (event: DragEvent | MouseEvent, name: 'text' | 'line') => {
  event.stopPropagation();
  let data: Pen | undefined = void 0;

  // 构建一个文本图元
  if (name === 'text') data = { text: 'text', width: 100, height: 20, name: 'text' };
  // 构建一个直线图元
  else if (name === 'line') {
    data = {
      anchors: [
        { id: '0', x: 1, y: 0 },
        { id: '1', x: 0, y: 1 },
      ],
      width: 100,
      height: 100,
      name: 'line',
      lineName: 'line',
      type: 1,
    };
  }
  if (!data) return;

  // 支持点击画布添加
  if (!(event as DragEvent).dataTransfer) meta2d.canvas.addCaches = deepClone([data]);
  // 支持拖拽添加
  else (event as DragEvent).dataTransfer?.setData('Meta2d', JSON.stringify(data));
};

/**
 * 缩放到默认状态
 */
export const onScaleDefault = () => {
  meta2d.scale(1);
  meta2d.centerView();
};

/**
 * 按窗口和内容进行缩放
 */
export const onScaleWindow = () => {
  meta2d.fitView();
};
