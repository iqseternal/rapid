import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toNil } from '@rapid/libs';

import Widget from '@/components/Widget';
import toast from 'react-hot-toast';

export const WindowsMinWindowWidget = memo(() => {
  const { t } = useTranslation();

  return (
    <Widget
      icon='LineOutlined'
      tipText={t('plats.widgets.control.min.minimize', '最小化窗口')}
      onClick={() => ipcActions.windowMin()}
    />
  )
})

export default WindowsMinWindowWidget;
