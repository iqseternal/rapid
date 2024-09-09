import { useAsyncEffect, useUnmount } from '@rapid/libs-web/hooks';
import { userUpdateInfo } from '@/features';
import { toPicket } from '@suey/pkg-utils';
import { Card } from 'antd';
import { useEffect, useRef } from 'react';
import { FullSize, FullSizeHeight } from '@rapid/libs-web';

import IMessage from '@components/IMessage';
import styles from './index.module.scss';

function Graphics() {


  return <FullSizeHeight
    className={styles.graphics}
  >


  </FullSizeHeight>
}


export default function Workbenches() {

  useAsyncEffect(async () => {

    const [err, res] = await toPicket(userUpdateInfo());

    if (err) {
      IMessage.error(err.descriptor);
      return;
    }
  }, []);



  return <FullSize
    className={styles.workbenches}
  >

    <Graphics />

  </FullSize>
}
