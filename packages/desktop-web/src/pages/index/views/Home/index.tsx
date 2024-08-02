import type { FC } from 'react';
import { isDef } from '@suey/pkg-utils';
import { Space, Card, Button, message, Input } from 'antd';
import type { CSSObject } from 'styled-components';
import { useState, useContext, useRef, useEffect } from 'react';

import { useUserStore, userUpdateInfo, userLogin } from '@/features/zustand';
import { useAsyncEffect } from '@rapid/libs-web/hooks';
import { toPicket } from '@rapid/libs/common';

import IMessage from '@rapid/libs-web/components/IMessage';

function A() {
  const bears = useUserStore(store => store.userinfo);

  useAsyncEffect(async () => {
    const [err, res] = await toPicket(userUpdateInfo());
    if (err) {
      IMessage.error(err.descriptor);
      return;
    }
  }, []);

  return <div>
    <Card>
      <Input.TextArea
        value={JSON.stringify(bears, null, 2)}
        rows={20}
      >

      </Input.TextArea>

      <Button
        onClick={() => {

        }}
      >
        增加
      </Button>
    </Card>
  </div>
}


export default function Home() {

  return <div>
    <Card>

    </Card>

    <A />
  </div>
}




