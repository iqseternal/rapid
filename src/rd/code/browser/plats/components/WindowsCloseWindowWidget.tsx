import { memo } from 'react';
import { platControllerCloseImgUrl } from 'rd/assets';

import Widget from '@/components/Widget';
import IconFont from '../../components/IconFont';

const WindowsCloseSvg = <img src={platControllerCloseImgUrl} alt='' />;

export const WindowsCloseWindowWidget = memo(() => {

  return (
    <Widget
      tipText='关闭'
      tipAttrs={{
        placement: 'leftBottom'
      }}
      onClick={() => ipcActions.windowClose()}
    >
      <IconFont
        icon='CloseOutlined'
      />
    </Widget>
  )
})

export default WindowsCloseWindowWidget;
