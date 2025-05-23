import { memo, useState } from 'react';
import { toNil } from '@rapid/libs';

import Widget from '@/components/Widget';
import toast from 'react-hot-toast';

export const WindowsDebugWidget = memo(() => {
  return (
    <Widget
      icon='BugOutlined'
      tipText='打开开发者工具'
      onClick={() => {
        toast.success('打开开发者工具');

        ipcActions.windowDevtool(true, { mode: 'detach' });
      }}
    />
  )
})

export default WindowsDebugWidget;
