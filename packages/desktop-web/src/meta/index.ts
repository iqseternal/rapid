import { ref, reactive, watch } from 'vue';
import { Meta2d, Pen, register, registerAnchors, registerCanvasDraw, deepClone } from '@meta2d/core';
import { flowPens, flowAnchors } from '@meta2d/flow-diagram';
import { activityDiagram, activityDiagramByCtx } from '@meta2d/activity-diagram';
import { classPens } from '@meta2d/class-diagram';
import { sequencePens, sequencePensbyCtx } from '@meta2d/sequence-diagram';
import {
  register as registerEcharts,
  registerHighcharts,
  registerLightningChart
} from '@meta2d/chart-diagram';
import { mindBoxPlugin } from '@meta2d/plugin-mind-core';
import { collapseChildPlugin } from '@meta2d/plugin-mind-collapse';
import { formPens } from '@meta2d/form-diagram';
import { chartsPens } from '@meta2d/le5le-charts';
import { ftaPens, ftaPensbyCtx, ftaAnchors } from '@meta2d/fta-diagram';
import { setupIndexedDB } from '@/indexedDB';
import { TABLES, TABLE_DOCUMENT, DATABASES_META2D } from '@indexedDB/type';
import { useSelection } from './selections';
import { myTriangle, myTriangleAnchors } from './don';
import { canvasTriangle, canvasTriangleAnchors } from './canvas';

export * from './actions';
export * from './selections';

export const meta2dState = reactive({
  isSetup: false
});

export async function saveMeta2dData() {
  const data = meta2d.data();
  // const buffer = pako.deflate(JSON.stringify(data));
  // console.log(buffer);
  localStorage.setItem('meta2d', JSON.stringify(data));
}

export async function setupMeta2dEvts() {
  meta2d.on('scale', saveMeta2dData);
  meta2d.on('add', saveMeta2dData);
  meta2d.on('opened', saveMeta2dData);
  meta2d.on('undo', saveMeta2dData);
  meta2d.on('redo', saveMeta2dData);
  meta2d.on('add', saveMeta2dData);
  meta2d.on('delete', saveMeta2dData);
  meta2d.on('rotatePens', saveMeta2dData);
  meta2d.on('translatePens', saveMeta2dData);
}

export async function setupMeta2dView(target: HTMLElement) {
  const meta2dOptions = {
    rule: true,
  };

  new Meta2d(target, meta2dOptions);

  // 按需注册图形库
  // 以下为自带基础图形库

  // 注册注册活动图元
  register(activityDiagram());
  // 原生canvas绘画的图库，支持逻辑复杂的需求
  registerCanvasDraw(activityDiagramByCtx());
  // 注册时序图
  register(sequencePens());
  registerCanvasDraw(sequencePensbyCtx());
  meta2d.installPenPlugins({ name: 'mindNode2' }, [
    { plugin: mindBoxPlugin },
    { plugin: collapseChildPlugin }
  ])

  // 注册类图
  register(classPens());

  // 注册表单图元
  registerCanvasDraw(formPens());

  // 直接调用Echarts的注册函数
  registerEcharts();
  // 直接调用HighCharts的注册函数
  registerHighcharts();
  // 直接调用LightningChart的注册函数
  registerLightningChart();



  register(flowPens());
  registerAnchors(flowAnchors());
  registerCanvasDraw(chartsPens());
  register(ftaPens());
  registerCanvasDraw(ftaPensbyCtx());
  registerAnchors(ftaAnchors());


  //注册自定义path2d图元
  meta2d.register({ myTriangle })
  // 注册自定义图元的m锚点信息
  meta2d.registerAnchors({ myTriangle: myTriangleAnchors });

  // 注册自定义canvasDraw函数
  meta2d.registerCanvasDraw({ canvasTriangle })
  // 注册锚点
  meta2d.registerAnchors({ canvasTriangle: canvasTriangleAnchors })

  await setupMeta2dEvts();
  // 注册其他自定义图形库
  // ...

  // const indexedDB = await setupIndexDB();
  // const objectStore = indexedDB.transition(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT).objectStore(DATABASES_META2D.TABLES_NAMES.TABLE_DOCUMENT);


  // 读取本地存储
  let data: any = localStorage.getItem('meta2d');
  if (data) {
    data = JSON.parse(data);

    // 判断是否为运行查看，是-设置为预览模式
    if (location.pathname === '/preview') {
      data.locked = 1;
    } else {
      data.locked = 0;
    }
    meta2d.open(data);
  }

  meta2d.on('active', active);
  meta2d.on('inactive', inactive);
}


const { select } = useSelection();
const active = (pens?: Pen[]) => {
  select(pens);
};

const inactive = () => {
  select();
};

