import { Space, Card, Button, message, Input } from 'antd';
import { useUserStore, userUpdateInfo, userLogin, useDocStore } from '@/features';
import { useAsyncEffect, useReactive, useRefresh } from '@rapid/libs-web/hooks';
import { toPicket } from '@suey/pkg-utils';
import { Guards } from '@router/guards';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { FullSizeWidth } from '@rapid/libs-web';

import IMessage from '@components/IMessage';

let times = 0;

export default function Home() {
  const refresh = useRefresh();

  const [r1] = useMemo(() => [times], [times]);
  const [r2] = times % 2 === 0 ? useState('偶数') : useState('奇数');

  return <div>
    <Card>
      <Button
        onClick={() => {
          times ++;
          refresh();
        }}
      >
        刷新当前组件
      </Button>

      <FullSizeWidth>
        <span>r1: {r1}</span>
        <span>r2: {r2}</span>
      </FullSizeWidth>
    </Card>
  </div>
}




