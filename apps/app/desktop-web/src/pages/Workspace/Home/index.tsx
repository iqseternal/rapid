import { Space, Card, Button, message, Input, App } from 'antd';
import { useUserStore, userUpdateInfo, userLogin, useDocStore } from '@/features';
import { useAsyncEffect, useReactive, useRefresh } from '@rapid/libs-web/hooks';
import { toPicket } from '@suey/pkg-utils';
import { Guards } from '@router/guards';
import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FullSizeWidth } from '@rapid/libs-web';
import { bus } from '@/events';

export const Home = memo(() => {
  const refresh = useRefresh();

  useEffect(() => {
    const off = bus.on('message', console.log);

    console.log('init');


    return off;
  }, []);

  return (
    <Card>
      <Button
        onClick={refresh}
      >
        刷新当前组件
      </Button>

      <FullSizeWidth>

        <Button
          onClick={() => {
            bus.send('message', 'hello', 'world');
          }}
        >
          send Message
        </Button>
      </FullSizeWidth>
    </Card>
  )
})

export default Home;

