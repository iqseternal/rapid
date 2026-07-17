import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toNil } from '@suey/pkg-utils';

import Widget from '@/components/Widget';
import toast from 'react-hot-toast';

export const WindowsDebugWidget = memo(() => {
  const { t } = useTranslation();

  return (
    <Widget
      icon='BugOutlined'
      tipText={t('plats.widgets.control.debug.openDevtool', '打开开发者工具')}
      className='!cursor-default'
      onClick={async () => {
        const [err] = await toNil(injector.ipcActions.windowDevtool(true, { mode: 'detach' }));

        if (err) {
          toast.error(err.reason);
          return;
        }

        toast.success(t('plats.widgets.control.debug.openDevtool', '成功打开开发者工具'));
      }}
    />
  )
})

export default WindowsDebugWidget;
