import { FullSize, FullSizeWidth, classnames, useAsyncEffect } from '@rapid/libs-web';
import { commonStyles } from '@scss/common';
import { windowDevtool, windowShow } from '@/actions';

import Header from '@components/Header';
import styles from './index.module.scss';
import Widget from '@components/Widget';

export default function WorkbenchesToolbar() {

  const onDragStart = async () => {
    // await windowSetDragData({ dragKey: 'tool' }, {
    //   username: 'helloWorld'
    // })

    window.electron.ipcRenderer.send('IpcBroadcast', 'tool', {
      username: 'HelloWorld',
    })
  }

  useAsyncEffect(async () => {
    await windowShow({ show: true });
    // await windowDevtool(true, { mode: 'detach' });

  }, []);

  return <FullSize
    className={classnames(
      commonStyles.appRegion,
      styles.toolbar
    )}
  >

    <FullSizeWidth
      className={classnames(
        commonStyles.flexCol
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

    </FullSizeWidth>
  </FullSize>
}
