
import { memo, useState } from 'react';
import { toNil } from '@rapid/libs';
import { useAsyncLayoutEffect, useRefresh, useWindowInnerSize } from '@rapid/libs-web';

import Widget from '@components/Widget';

export const WindowsDebugWidget = memo(() => {
  return (
    <Widget
      icon='BugOutlined'
      tipText='打开开发者工具'
      onClick={() => {
        ipcActions.windowDevtool(true, { mode: 'detach' });
      }}
    />
  )
})

export const WindowsMinWindowWidget = memo(() => {
  return (
    <Widget
      icon='LineOutlined'
      tipText='最小化'
      onClick={() => ipcActions.windowMin()}
    />
  )
})

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
      icon={isFullSize ? 'SwitcherOutlined' : 'BorderOutlined'}
      tipText='还原'
      onClick={() => ipcActions.windowReduction()}
    />
  )
})

export const WindowsCloseWindowWidget = memo(() => {

  return (
    <Widget
      icon='CloseOutlined'
      tipText='关闭'
      tipAttrs={{
        placement: 'leftBottom'
      }}
      onClick={() => ipcActions.windowClose()}
    />
  )
})
