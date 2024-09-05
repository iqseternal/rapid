import { useAsyncEffect, useUnmount } from '@rapid/libs-web/hooks';
import { userUpdateInfo } from '@/features';
import { toPicket } from '@suey/pkg-utils';
import { Card } from 'antd';
import { useEffect, useRef } from 'react';
import { FullSize, FullSizeHeight } from '@rapid/libs-web';

import IMessage from '@rapid/libs-web/components/IMessage';

import styles from './index.module.scss';

function Graphics() {


  return <FullSizeHeight
    className={styles.graphics}
  >


  </FullSizeHeight>
}

function Meta2dViewContainer() {
  const meta2dContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!meta2dContainerRef.current) return;

  }, [meta2dContainerRef.current]);


  return <FullSize id='gpr' ref={meta2dContainerRef}>

  </FullSize>
}


function PropertyBar() {


  return <>


  </>
}

export default function Workbenches() {

  return <FullSize
    className={styles.workbenches}
  >

    <Graphics />

    <Meta2dViewContainer />

    <PropertyBar />
  </FullSize>
}
