import { Space, Card, Button, message, Input, App } from 'antd';
import { useUserStore, userUpdateInfo, userLogin, useDocStore } from '@/features';
import { useAsyncEffect, useReactive, useRefresh } from '@rapid/libs-web/hooks';
import { toPicket } from '@rapid/libs';
import { Guards } from '@router/guards';
import type { FC } from 'react';
import { forwardRef, memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FullSizeWidth } from '@rapid/libs-web';
import { bus } from '@/events';
import { rApp } from '@rapid/extensions';
import { RegisterPoints } from '@/extensions';

export const Home = memo(() => {

  return (
    <Card>
      <Button>
        注册一个新的组件
      </Button>
    </Card>
  )
})

export default Home;

