import { useAsyncEffect, useShallowReactive, useUnmount, useMount } from '@rapid/libs-web/hooks';
import { useUserStore, userUpdateInfo } from '@/features';
import { isNull, toPicket } from '@suey/pkg-utils';
import { Card } from 'antd';
import { useEffect, useRef, useState, memo } from 'react';
import { FullSize, FullSizeHeight, FullSizeWidth, classnames } from '@rapid/libs-web';

import { Leafer, Rect, UI } from 'leafer-ui';
import { Leaf } from 'leafer';

import { initLeaferApp, destroyLeaferApp, leaferApp } from '@/leafer';

import { Instruction, Instrument, LeaferUIAttribute } from './cpts';

import IMessage from '@components/IMessage';
import styles from './index.module.scss';

export const LeaferView = memo(() => {
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
    >

    </FullSize>
  );
})

export const Workbenches = memo(() => {
  return <FullSize
    className={styles.workbenches}
  >
    <Instrument
      className={classnames(styles.instrument)}
    />

    <FullSize
      className={classnames(styles.leaferContainer)}
    >
      <Instruction
        className={classnames(styles.instruction)}
      />

      <LeaferView />
    </FullSize>

    <LeaferUIAttribute
      className={classnames(styles.leaferUIAttribute)}
    />
  </FullSize>
})

export default Workbenches;
