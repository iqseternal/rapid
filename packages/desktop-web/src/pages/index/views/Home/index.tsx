import { Space, Card, Button, message, Input } from 'antd';
import { useUserStore, userUpdateInfo, userLogin } from '@/features/zustand';
import { useAsyncEffect } from '@rapid/libs-web/hooks';
import { toPicket } from '@rapid/libs/common';
import { Guards } from '@pages/index/router/guards';
import { forwardRef, useEffect, useRef } from 'react';

import IMessage from '@rapid/libs-web/components/IMessage';

const PersonalInfo = Guards.AuthRole(forwardRef<HTMLDivElement>(({}, ref) => {
  const bears = useUserStore(store => store.userinfo);

  useAsyncEffect(async () => {
    const [err, res] = await toPicket(userUpdateInfo());
    if (err) {
      IMessage.error(err.descriptor);
      return;
    }
  }, []);

  return <div ref={ref}>
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
}));

const Prc = Guards.AuthRole((() => <Button>1</Button>));

export default function Home() {

  const btn = useRef<HTMLDivElement>(null);

  useEffect(() => {


    console.log(btn.current);

  }, []);

  return <div>
    <Card>

    </Card>

    <Guards.AuthRole>
      <Button>有权限才能够看见</Button>

    </Guards.AuthRole>

    <Prc />

    <PersonalInfo ref={btn} />
  </div>
}




