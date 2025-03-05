import { memo, useState } from 'react';
import { toNil } from '@rapid/libs';
import { useAsyncLayoutEffect, useRefresh, useWindowInnerSize } from '@rapid/libs-web';
import { uiControllerMaxSvg, uiControllerReductionSvg } from 'rd/assets';

import Widget from '@/components/Widget';
import toast from 'react-hot-toast';

const WindowMaxSvg = <img src={uiControllerMaxSvg} />;
const WindowReductionSvg = <img src={uiControllerReductionSvg} />;

export const WindowsReductionWindowWidget = memo(() => {
  const refresh = useRefresh();

  const [windowInnerSize] = useWindowInnerSize();
  const [normalState] = useState({
    workAreaSize: {
      width: window.innerWidth,
      height: window.innerHeight,
    }
  })

  const isFullSize = windowInnerSize.innerWidth === normalState.workAreaSize.width && windowInnerSize.innerHeight === normalState.workAreaSize.height;

  useAsyncLayoutEffect(async () => {
    const [err, res] = await toNil(window.ipcActions.windowWorkAreaSize());
    if (err) return;
    normalState.workAreaSize = res;
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
