import { Space, Card, Button, message, Input } from 'antd';
import { useUserStore, userUpdateInfo, userLogin, useDocStore } from '@/features';
import { useAsyncEffect, useReactive } from '@rapid/libs-web/hooks';
import { toPicket } from '@suey/pkg-utils';
import { Guards } from '@router/guards';
import { forwardRef, useEffect, useRef } from 'react';

import IMessage from '@components/IMessage';

const PersonalInfo = Guards.AuthAuthorized(forwardRef<HTMLDivElement>((props, ref) => {
  const bears = useUserStore(store => store.userinfo);

  // useAsyncEffect(async () => {
  //   const [err, res] = await toPicket(userUpdateInfo());
  //   if (err) {
  //     IMessage.error(err.descriptor);
  //     return;
  //   }
  // }, []);


  return <div ref={ref}>
    <Card>
      <Guards.AuthRole>
        <Input.TextArea
          value={JSON.stringify(bears, null, 2)}
          rows={20}
        />
      </Guards.AuthRole>

      <Button
        onClick={() => {

        }}
      >
        增加
      </Button>
    </Card>
  </div>
}));


export default function Home() {
  const btn = useRef<HTMLDivElement>(null);

  return <div>
    <Card>

    </Card>

    <Guards.AuthRole>
      <Button>有权限才能够看见</Button>

    </Guards.AuthRole>

    <PersonalInfo ref={btn} />
  </div>
}




