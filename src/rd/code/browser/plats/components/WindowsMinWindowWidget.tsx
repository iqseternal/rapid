import { memo, useState } from 'react';
import { toNil } from '@rapid/libs';

import Widget from '@/components/Widget';
import toast from 'react-hot-toast';

export const WindowsMinWindowWidget = memo(() => {

  return (
    <Widget
      icon='LineOutlined'
      tipText='最小化'
      onClick={() => ipcActions.windowMin()}
    />
  )
})

export default WindowsMinWindowWidget;
