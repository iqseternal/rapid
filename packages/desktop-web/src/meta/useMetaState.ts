import type { WatchStopHandle, WatchCallback } from 'vue';
import { reactive, ref, watch } from 'vue';
import { Pen, PenType, LockState } from '@meta2d/core';
import { useNoEffectHook } from '@hooks/useNoEffect';

/** meta2d 的基本工作状态 */
const metaState = reactive({
  isSetup: false,

  locked: false,
  preview: false,

  /** 当前放大的倍数 */
  scale: 100,
  minScale: 30,
  maxScale: 1000,

  useMagnifier: false, // 是否使用了放大镜
  useMap: false,

  isPen: false,
  isPencil: false,

  line: {
    /** 当前是否选择绘制线条 */
    isDrawLine: false,
    lineType: 'curve', // 线型
    fromArrow: '', // 线型左箭头
    toArrow: '', // 线型右箭头
  }
});

/** 当第一次建立的时候调用这个函数 */
const onFirstSetup = (callback: WatchCallback<boolean, boolean>) => {
  const stopHandle = watch<boolean>(() => metaState.isSetup, (...args) => {

    callback(...args);
    stopHandle();
  });
}

/** 当 meta2d 被重新建立的时候, 做出一次回调 */
const onReSetup = (callback: WatchCallback<boolean, boolean>) => watch<boolean>(() => metaState.isSetup, (...args) => {
  const isSetup = args[0];

  if (isSetup) callback(...args);
});

/** 当 meta2d 被重新建立的时候, 回复放大的倍数 */
onReSetup((isSetup) => {
  if (isSetup) meta2d.scale(metaState.scale / 100);
})

/** 防止循环副作用, 使用不附带副作用的 set */
const { watch: scaleWatch, noEffectSetter: scalreNoEffectSetter } = useNoEffectHook(() => metaState.scale);
/** 当 metaState.scale 的值发生变化的时候, 自动同步 meta2d */
scaleWatch((nv) => {
  if (!metaState.isSetup) return;
  meta2d.scale(nv / 100);
})

export { scalreNoEffectSetter };

/** 刷新 meta2d 图纸 */
const metaRefresh = () => meta2d.render();

/** 为 meta2d 进行锁定 */
const useLock = () => {
  const status = !metaState.locked;

  if (status) meta2d.lock(LockState.Disable);
  else meta2d.lock(LockState.None);

  metaState.locked = status;
}

/** 为 meta2d 进行预览 */
const usePreview = () => {
  const status = !metaState.preview;

  metaState.preview = status;
}

/** 为 meta2d 使用鸟瞰图 */
const useMap = () => {
  if (window.meta2d.map?.isShow) {
    window.meta2d.hideMap()
  } else {
    window.meta2d.showMap()
  }

  metaState.useMap = window.meta2d.map.isShow;
}

/** 为 图纸使用放大镜功能 */
const useMagnifier = () => {
  if (meta2d.canvas.magnifierCanvas.magnifier) { // 判断放大镜状态
    meta2d.hideMagnifier()  // 关闭放大镜
  } else {
    meta2d.showMagnifier() // 打开放大镜
  }
  metaState.useMagnifier = meta2d.canvas.magnifierCanvas.magnifier;
}

/** 使用钢笔工具 */
const usePen = () => {
  if (!metaState.isSetup) return;
  metaState.isPen = !metaState.isPen;

  if (meta2d.canvas.drawingLineName) {
    meta2d.drawLine();
    meta2d.finishPencil();
  } else {
    meta2d.drawLine('curve');
  }
}

/** 使用铅笔工具 */
const usePencil = () => {
  if (!metaState.isSetup) return;

  metaState.isPencil = !metaState.isPencil;
  if (meta2d.canvas.pencil) {
    meta2d.stopPencil();
    meta2d.finishPencil();
  } else {
    meta2d.drawingPencil();
  }
}

const lineFn = {
  /** 绘制线条 */
  drawLine: () => {
    if (metaState.line.isDrawLine) {
      metaState.line.isDrawLine = false;
      meta2d.finishDrawLine();
      meta2d.drawLine();
      meta2d.store.options.disableAnchor = true;
    } else {
      metaState.line.isDrawLine = true;
      meta2d.drawLine(meta2d.store.options.drawingLineName);
      meta2d.store.options.disableAnchor = false;
    }
  },
  /** 更换线条 */
  changeLineType: (value: string) => {
    metaState.line.lineType = value;
    if (meta2d) {
      meta2d.store.options.drawingLineName = value;
      meta2d.canvas.drawingLineName && (meta2d.canvas.drawingLineName = value);
      meta2d.store.active?.forEach((pen) => {
        meta2d.updateLineType(pen, value);
      });
    }
  },
  /** 切换线形左箭头 */
  changeFromArrow: (value: string) => {
    metaState.line.fromArrow = value;
    // 画布默认值
    meta2d.store.data.fromArrow = value;
    // 活动层的箭头都变化
    if (meta2d.store.active) {
      meta2d.store.active.forEach((pen: Pen) => {
        if (pen.type === PenType.Line) {
          pen.fromArrow = value;
          meta2d.setValue({
            id: pen.id,
            fromArrow: pen.fromArrow,
          }, {
            render: false,
          });
        }
      });
      meta2d.render();
    }
  },
  /** 切换线型右箭头 */
  changeToArrow: (value: string) => {
    metaState.line.toArrow = value;
    // 画布默认值
    meta2d.store.data.toArrow = value;
    // 活动层的箭头都变化
    if (meta2d.store.active) {
      meta2d.store.active.forEach((pen: Pen) => {
        if (pen.type === PenType.Line) {
          pen.toArrow = value;
          meta2d.setValue({
            id: pen.id,
            fromArrow: pen.toArrow,
          }, {
            render: false,
          });
        }
      });
      meta2d.render();
    }
  }
}

/**
 * 使用当前 meta2d 的基本工作状态
 * @returns
 */
export function useMetaState() {

  return {
    metaState,
    lineFn,

    onFirstSetup,
    onReSetup,

    usePen, usePencil,
    useMagnifier,
    useMap,

    useLock,
    usePreview,

    metaRefresh,

  }
}

export const useMetaStateHook = useMetaState;
