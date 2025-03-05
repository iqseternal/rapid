import { memo } from 'react';
import { uiControllerCloseSvg } from 'rd/assets';

import Widget from '@/components/Widget';

const WindowsCloseSvg = <img src={uiControllerCloseSvg} />;

export const WindowsCloseWindowWidget = memo(() => {

  return (
    <Widget
      tipText='关闭'
      tipAttrs={{
        placement: 'leftBottom'
      }}
      onClick={() => ipcActions.windowClose()}
    >
      {WindowsCloseSvg}
    </Widget>
  )
})

export default WindowsCloseWindowWidget;
