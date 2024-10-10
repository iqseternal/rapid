import { useAsyncEffect, useShallowReactive, useUnmount, useMount } from '@rapid/libs-web/hooks';
import { useUserStore, userUpdateInfo } from '@/features';
import { isNull, isRawObject, isUnDef, toPicket } from '@suey/pkg-utils';
import { Card } from 'antd';
import { useEffect, useRef, useState, memo } from 'react';
import { FullSize, FullSizeHeight, FullSizeWidth, classnames } from '@rapid/libs-web';
import type { IUIInputData } from 'leafer-ui';
import { Leafer, Rect, UI } from 'leafer-ui';
import { Leaf } from 'leafer';

import { windowGetDragData } from '@/actions';
import { initLeaferApp, destroyLeaferApp, leaferApp, addGraph } from '@/leafer';
import { Instruction, Instrument, LeaferUIAttribute } from './cpts';

import IMessage from '@components/IMessage';
import styles from './index.module.scss';


export const LeaferView = memo((props: BaseProps) => {
  const { className } = props;

  const viewContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewContainerRef.current) {
      initLeaferApp(viewContainerRef.current);
    }

    return destroyLeaferApp;
  }, [viewContainerRef.current]);

  return (
    <FullSize
      ref={viewContainerRef}
      className={className}
      onDragOver={e => {
        e.preventDefault();
      }}
      onDrop={async (e) => {
        e.preventDefault();

        if (!viewContainerRef.current) return;

        const uiData = await windowGetDragData({ dragKey: 'graphic' });

        if (uiData) {
          if (isRawObject(uiData)) {
            const uiJson = uiData as IUIInputData;

            if (isUnDef(uiJson.x) && isUnDef(uiJson.y)) {


              const offsetX = viewContainerRef.current.offsetLeft, offsetY = viewContainerRef.current.offsetTop;

              const clientX = e.clientX, clientY = e.clientY;
              const screenX = e.screenX, screenY = e.screenY;

              const x = clientX - offsetX, y = clientY - offsetY;

              uiJson.x = x;
              uiJson.y = y;
            }
          }

          addGraph(uiData);
        }
      }}
    >

    </FullSize>
  );
})

export const Workbenches = memo(() => {
  return <FullSize
    className={styles.workbenches}
  >
    <Instrument
      className={styles.instrument}
    />

    <FullSize
      className={styles.leaferViewContainer}
    >
      <Instruction
        className={styles.instruction}
      />

      <LeaferView
        className={styles.leaferView}
      />
    </FullSize>

    <LeaferUIAttribute
      className={styles.leaferUIAttribute}
    />
  </FullSize>
})

export default Workbenches;
