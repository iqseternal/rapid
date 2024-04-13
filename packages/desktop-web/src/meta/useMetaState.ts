import { reactive, ref, watch } from 'vue';
import { Pen, PenType, LockState } from '@meta2d/core';

const metaState = reactive({
  isSetup: false,

  locked: false,
  preview: false,

  scale: 100, // 放大倍数
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
watch(() => metaState.isSetup, (isSetup) => {
  if (isSetup) meta2d.scale(metaState.scale / 100);
})

export const scaleHasEffect = ref(true);
watch(() => metaState.scale, (nv) => {
  if (!scaleHasEffect.value) return;
  if (!metaState.isSetup) return;
  meta2d.scale(nv / 100);
})


const metaRefresh = () => meta2d.render();

const useLock = () => {
  const status = !metaState.locked;

  if (status) meta2d.lock(LockState.Disable);
  else meta2d.lock(LockState.None);

  metaState.locked = status;
}

const usePreview = () => {
  const status = !metaState.preview;

  metaState.preview = status;
}

const useMap = () => {
  if (window.meta2d.map?.isShow) {
    window.meta2d.hideMap()
  } else {
    window.meta2d.showMap()
  }

  metaState.useMap = window.meta2d.map.isShow;
}

const useMagnifier = () => {
  if (meta2d.canvas.magnifierCanvas.magnifier) { // 判断放大镜状态
    meta2d.hideMagnifier()  // 关闭放大镜
  } else {
    meta2d.showMagnifier() // 打开放大镜
  }
  metaState.useMagnifier = meta2d.canvas.magnifierCanvas.magnifier;
}


const usePen = () => {
  if (!metaState.isSetup) return;




  metaState.isPen = !metaState.isPen;

  console.log(metaState.isPen);

  if (meta2d.canvas.drawingLineName) {
    meta2d.drawLine();
    meta2d.finishPencil();
  } else {
    meta2d.drawLine('curve');
  }
}

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


export function useMetaState() {

  return {
    metaState,
    lineFn,


    usePen, usePencil,
    useMagnifier,
    useMap,

    useLock,
    usePreview,

    metaRefresh,

  }
}

export const useMetaStateHook = useMetaState;
