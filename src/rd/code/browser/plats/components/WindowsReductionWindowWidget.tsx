import { memo, useState } from 'react';
import { toNil } from '@rapid/libs';
import { useAsyncLayoutEffect, useRefresh, useWindowInnerSize } from '@rapid/libs-web';
import { platControllerMaxImgUrl, platControllerReductionImgUrl } from 'rd/assets';

import Widget from '@/components/Widget';
import toast from 'react-hot-toast';

const WindowMaxSvg = <img src={platControllerMaxImgUrl} alt='' />;
const WindowReductionSvg = <img src={platControllerReductionImgUrl} alt='' />;

export const WindowsReductionWindowWidget = memo(() => {
  const refresh = useRefresh();

  const [windowInnerSize] = useWindowInnerSize();
  const [normalState] = useState(() => ({
    workAreaSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  }))

  const isFullSize = (
    windowInnerSize.innerWidth === normalState.workAreaSize.width &&
    windowInnerSize.innerHeight === normalState.workAreaSize.height
  );

  useAsyncLayoutEffect(async () => {
    const [err, res] = await toNil(window.ipcActions.windowWorkAreaSize());
    if (err) return;
    normalState.workAreaSize = {
      width: res.width,
      height: res.height,
    };
    refresh();
  }, []);

  return (
    <Widget
      tipText='还原'
      onClick={() => ipcActions.windowReduction()}
    >
      {isFullSize ? WindowReductionSvg : WindowMaxSvg}
    </Widget>
  )
})

export default WindowsReductionWindowWidget;
