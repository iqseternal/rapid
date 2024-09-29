import { Space, Card, Button, message, Input } from 'antd';
import { useUserStore, userUpdateInfo, userLogin, useDocStore } from '@/features';
import { useAsyncEffect, useReactive, useRefresh } from '@rapid/libs-web/hooks';
import { toPicket } from '@suey/pkg-utils';
import { Guards } from '@router/guards';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import { FullSizeWidth } from '@rapid/libs-web';
import { windowGetDragData, windowOpen } from '@/actions';
import { retrieveRoutes } from '@/router';

import IMessage from '@components/IMessage';

let times = 0;

export default function Home() {
  const refresh = useRefresh();

  // useAsyncEffect(async () => {
  //   const { workbenchesToolbarRoute } = retrieveRoutes();
  //   await windowOpen({
  //     windowKey: workbenchesToolbarRoute.name,
  //     subUrl: workbenchesToolbarRoute.meta.fullPath
  //   }, {
  //     width: 32,
  //     minWidth: 32,
  //     height: 700,
  //     minHeight: 400,
  //     maximizable: false,
  //     minimizable: false,
  //     frame: false, // 隐藏系统自带的边框
  //     movable: true,  // 窗口可以拖动
  //     skipTaskbar: true,  // 不在任务栏显示
  //     hasShadow: false
  //   });
  // }, []);

  // useEffect(() => {
  //   window.electron.ipcRenderer.on('IpcBroadcast', (evt, evtName: string, data: any) => {

  //     console.log(evtName, data);
  //   })

  //   return () => {
  //     window.electron.ipcRenderer.removeAllListeners('IpcBroadcast');

  //     const { workbenchesToolbarRoute } = retrieveRoutes();
  //     window.electron.ipcRenderer.invoke('IpcWindow/closeWindow', {
  //       windowKey: workbenchesToolbarRoute.name
  //     });
  //   }
  // }, []);

  return <div
    onDragOver={e => {
      e.preventDefault();
    }}
    onDrop={async e => {
      e.preventDefault();

      const data = await windowGetDragData({ dragKey: 'tool' });

      console.log(data);
    }}
  >
    <Card>
      <Button
        onClick={() => {
          times ++;
          refresh();
        }}
      >
        刷新当前组件
      </Button>

      <FullSizeWidth>

      </FullSizeWidth>
    </Card>
  </div>
}




