import { useAsyncEffect } from '@rapid/libs-web/hooks';
import { userUpdateInfo } from '@/features/zustand';
import { toPicket } from '@rapid/libs/common';
import IMessage from '@rapid/libs-web/components/IMessage';


export default function Workbenches() {

  useAsyncEffect(async () => {

    const [err, res] = await toPicket(userUpdateInfo());

    if (err) {
      IMessage.error(err.descriptor);
      return;
    }

  }, []);

  return <></>;
}
