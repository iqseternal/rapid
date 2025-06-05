import { memo, useCallback, useEffect } from 'react';
import { Options, Meta2d } from '@meta2d/core';
import { flowPens } from '@meta2d/flow-diagram';
import { activityDiagram } from '@meta2d/activity-diagram';
import { classPens } from '@meta2d/class-diagram';
import { sequencePens, sequencePensbyCtx } from '@meta2d/sequence-diagram';
import { formPens } from '@meta2d/form-diagram';

const Meta2dContainer = () => {
  useEffect(() => {

    rApp.meta2d = new Meta2d('meta2d');

    rApp.meta2d.register(flowPens());
    rApp.meta2d.register(activityDiagram());
    rApp.meta2d.register(classPens());
    rApp.meta2d.register(sequencePens());
    rApp.meta2d.registerCanvasDraw(sequencePensbyCtx());
    rApp.meta2d.registerCanvasDraw(formPens());
  }, []);


  return (
    <div className="main">
      <div className="meta2d w-full h-full" id="meta2d"></div>
    </div>
  );
};

export const Workbenches = memo(() => {


  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Meta2dContainer />
    </div>
  );
})

export default Workbenches;
