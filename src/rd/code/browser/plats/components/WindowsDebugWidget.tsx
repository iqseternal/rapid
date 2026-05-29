import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Widget from '@/components/Widget';
import toast from 'react-hot-toast';

export const WindowsDebugWidget = memo(() => {
  const { t } = useTranslation();

  return (
    <Widget
      icon='BugOutlined'
      tipText={t('plats.widgets.control.debug.openDevtool', '打开开发者工具')}
      className='!cursor-default'
      onClick={() => {
        toast.success(t('plats.widgets.control.debug.openDevtool', '打开开发者工具'));

        const response = injector.ipcActions.windowDevtool(true, { mode: 'detach' });

        console.log(response);
      }}
    />
  )
})

export default WindowsDebugWidget;
