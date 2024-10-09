import { Space, Card, Button, message, Input } from 'antd';
import { useUserStore, userUpdateInfo, userLogin, useDocStore } from '@/features';
import { useAsyncEffect, useReactive, useRefresh } from '@rapid/libs-web/hooks';
import { toPicket } from '@suey/pkg-utils';
import { Guards } from '@router/guards';
import { forwardRef, memo, useEffect, useMemo, useRef, useState } from 'react';
import { FullSizeWidth } from '@rapid/libs-web';
import { windowGetDragData, windowOpen } from '@/actions';
import { retrieveRoutes } from '@/router';

import IMessage from '@components/IMessage';


export const Home = memo(() => {

  return <div>
    <Card>



      <Button

      >
        设置工作区状态
      </Button>

      <FullSizeWidth>

      </FullSizeWidth>
    </Card>
  </div>
})

export default Home;

