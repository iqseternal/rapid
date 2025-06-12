import { classnames, useAsyncEffect } from '@rapid/libs-web';
import { commonStyles } from '@/scss/common';
import { memo } from 'react';

import Widget from '@/components/Widget';

export const WorkbenchesToolbar = memo(() => {
  const onDragStart = async () => {
    // await windowSetDragData({ dragKey: 'tool' }, {
    //   username: 'helloWorld'
    // })

    window.electron.ipcRenderer.send('IpcBroadcast', 'tool', {
      username: 'HelloWorld',
    })
  }

  useAsyncEffect(async () => {
    await window.ipcActions.windowShow({ show: true });
    // await windowDevtool(true, { mode: 'detach' });
  }, []);

  return (
    <div
      className={classnames(
        commonStyles.appRegion,
        'min-w-8 min-h-[400px] w-full h-full'
      )}
    >

      <div
        className={classnames(
          'w-full'
        )}
      >
        <Widget
          draggable
          onDragStart={onDragStart}
          icon='SelectOutlined'
        />

        <Widget
          draggable
          icon='ReconciliationOutlined'
        />

      </div>
    </div>
  )
});

export default WorkbenchesToolbar;
