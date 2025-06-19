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
import { useMeta2dEffect } from 'rd/code/browser/meta2d';
import { ftaPens, ftaPensbyCtx, ftaAnchors } from '@meta2d/fta-diagram';
import { MouseEventButton } from 'rd/base/browser/constants';

import Widget from '@/components/Widget';
import IconFont from 'rd/code/browser/components/IconFont';

const Meta2dContainer = () => {

  const meta2dHtmlElementRef = useRef<HTMLDivElement>(null);

  useMeta2dEffect(meta2dHtmlElementRef, []);

  return (
    <div
      className='main w-full h-full'
    >
      <div
        className='w-full h-full min-w-10 min-h-10'
        ref={meta2dHtmlElementRef}

        onDragOver={e => {


        }}

        onDragEnd={e => {
          const data = e.dataTransfer.getData('meta2d');

          console.log(data);

          console.log('放下了');

          if (data) {
            if (rApp.meta2d) {
              rApp.meta2d.canvas.addCaches = [JSON.parse(data)];
            }
          }
        }}
      />
    </div>
  );
};

export const Workstation = memo(() => {


  return (
    <div
      className='w-full h-full flex gap-x-1'
    >
      <div>
        HELLO

        <Widget
          onDragStart={(e) => {
            e.stopPropagation();

            console.log('start');

            if (e instanceof DragEvent) {
              e.dataTransfer.setData('meta2d', JSON.stringify({ type: 'activityDiagram' }));
            }
            else {
              if (rApp.meta2d) {
                rApp.meta2d.canvas.addCaches = [{}];
              }
            }
          }}
        >
          <IconFont
            icon='ApiTwoTone'
          />
        </Widget>
      </div>

      <Meta2dContainer />
    </div>
  );
})

export default Workstation;
