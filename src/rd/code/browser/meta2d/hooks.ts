import { memo, useCallback, useEffect, useRef } from 'react';
import { Options, Meta2d, register, registerCanvasDraw, registerAnchors } from '@meta2d/core';
import { flowAnchors, flowPens } from '@meta2d/flow-diagram';
import { activityDiagram, activityDiagramByCtx } from '@meta2d/activity-diagram';
import { classPens } from '@meta2d/class-diagram';
import { sequencePens, sequencePensbyCtx } from '@meta2d/sequence-diagram';
import { register as registerEcharts, registerHighcharts, registerLightningChart } from '@meta2d/chart-diagram';
import { formPens } from '@meta2d/form-diagram';
import { mindBoxPlugin } from '@meta2d/plugin-mind-core';
import { collapseChildPlugin } from '@meta2d/plugin-mind-collapse';
import { chartsPens } from '@meta2d/le5le-charts';
import { ftaPens, ftaPensbyCtx, ftaAnchors } from '@meta2d/fta-diagram';
import { MouseEventButton } from 'rd/base/browser/constants';
import type { DependencyList, RefObject } from 'react';

export function setMeta2dCanvasData() {
  if (!rApp.meta2d) return;

  // console.log(rApp.meta2d);

  // const data = rApp.meta2d.data?.();

  // console.log(data);

  // localStorage.setItem('meta2d-data', JSON.stringify(data));

  // const options = rApp.meta2d.getOptions();

  // localStorage.setItem('meta2d-options', JSON.stringify(options));
}


export function useMeta2dEffect(meta2dHtmlElementRef: RefObject<HTMLElement>, deps: DependencyList) {

  useEffect(() => {
    if (!meta2dHtmlElementRef.current) return;

    rApp.meta2d = new Meta2d(meta2dHtmlElementRef.current, {
      rule: true,
      grid: true,
    });

    // 注册注册活动图元
    register(activityDiagram());
    registerCanvasDraw(activityDiagramByCtx());

    // 注册时序图
    register(sequencePens());
    registerCanvasDraw(sequencePensbyCtx());

    rApp.meta2d.installPenPlugins({ name: 'mindNode2' }, [
      { plugin: mindBoxPlugin },
      { plugin: collapseChildPlugin }
    ]);

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

    rApp.meta2d.on('scale', setMeta2dCanvasData);
    rApp.meta2d.on('add', setMeta2dCanvasData);
    rApp.meta2d.on('opened', setMeta2dCanvasData);
    rApp.meta2d.on('undo', setMeta2dCanvasData);
    rApp.meta2d.on('redo', setMeta2dCanvasData);
    rApp.meta2d.on('add', setMeta2dCanvasData);
    rApp.meta2d.on('delete', setMeta2dCanvasData);
    rApp.meta2d.on('rotatePens', setMeta2dCanvasData);
    rApp.meta2d.on('translatePens', setMeta2dCanvasData);

    rApp.meta2d.register(flowPens());
    rApp.meta2d.register(activityDiagram());
    rApp.meta2d.register(classPens());
    rApp.meta2d.register(sequencePens());
    rApp.meta2d.registerCanvasDraw(sequencePensbyCtx());
    rApp.meta2d.registerCanvasDraw(formPens());

    const data = localStorage.getItem('meta2d-data');
    const options = localStorage.getItem('meta2d-options');

    try {
      if (data) {
        rApp.meta2d.open(JSON.parse(data));
      }
      if (options) {
        rApp.meta2d.setOptions(JSON.parse(options));
      }
    } catch (e) {
      console.error(e);
    }

    return () => {
      if (!rApp.meta2d) return;

      rApp.meta2d.off('scale', setMeta2dCanvasData);
      rApp.meta2d.off('add', setMeta2dCanvasData);
      rApp.meta2d.off('opened', setMeta2dCanvasData);
      rApp.meta2d.off('undo', setMeta2dCanvasData);
      rApp.meta2d.off('redo', setMeta2dCanvasData);
      rApp.meta2d.off('add', setMeta2dCanvasData);
      rApp.meta2d.off('delete', setMeta2dCanvasData);
      rApp.meta2d.off('rotatePens', setMeta2dCanvasData);
      rApp.meta2d.off('translatePens', setMeta2dCanvasData);

      rApp.meta2d.off('*', setMeta2dCanvasData);

      rApp.meta2d.destroy();
    }
  }, deps);
}
