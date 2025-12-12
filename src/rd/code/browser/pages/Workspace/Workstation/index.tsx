import { memo, useCallback, useEffect, useRef, useState } from 'react';
import type { DragEventHandler } from 'react';
import { useMeta2dEffect } from 'rd/code/browser/meta2d';
import { useLocalStorageState, useRefresh, useRoute } from '@rapid/libs-web';
import { useLocation } from 'react-router-dom';
import { watch, reactive } from '@vue/reactivity';
import { MouseEventButton } from 'rd/base/browser/constants';

import Widget from '@/components/Widget';
import IconFont from 'rd/code/browser/components/IconFont';

const Graphics = memo(() => {
  const dragStart = useCallback<DragEventHandler<HTMLDivElement>>((e) => {

    if (e instanceof DragEvent) {
      e.dataTransfer.setData('rd-workbenches-meta2d-data', JSON.stringify({}));

    }
    else {
      if (native.meta2d) {
        native.meta2d.canvas.addCaches = []
      }
    }

  }, []);

  return (

    <div
      onDragStart={dragStart}
    >


    </div>
  )
})


interface Meta2dFloatToolProps {

}

const Meta2dFloatTool = memo(() => {

  return (
    <div
      className='h-full min-w-20'
    >


    </div>
  )
})

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

          if (data) {
            if (native.meta2d) {
              native.meta2d.canvas.addCaches = [JSON.parse(data)];
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
      <Meta2dFloatTool />

      <Meta2dContainer />
    </div>
  );
})

export default Workstation;
