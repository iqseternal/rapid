import { memo, useState } from 'react';
import { toNil } from '@rapid/libs';
import { useTranslation } from 'react-i18next';

import Widget from '@/components/Widget';
import toast from 'react-hot-toast';

export const WindowsDebugWidget = memo(() => {
  const { t } = useTranslation();

  return (
    <Widget
      icon='BugOutlined'
      tipText={t('plats.widgets.control.debug.openDevtool', '打开开发者工具')}
      onClick={() => {
        toast.success(t('plats.widgets.control.debug.openDevtool', '打开开发者工具'));

        ipcActions.windowDevtool(true, { mode: 'detach' });
      }}
    />
  )
})

export default WindowsDebugWidget;
