import { memo } from 'react';
import { platControllerCloseImgUrl } from 'rd/assets';
import { useTranslation } from 'react-i18next';

import Widget from '@/components/Widget';
import IconFont from '../../components/IconFont';

export const WindowsCloseWindowWidget = memo(() => {
  const { t } = useTranslation();

  return (
    <Widget
      tipText={t('plats.widgets.control.close.close', '关闭窗口')}
      tipAttrs={{
        placement: 'leftBottom'
      }}
      onClick={() => ipcActions.windowClose()}
    >
      <IconFont
        icon='CloseOutlined'
      />
    </Widget>
  )
})

export default WindowsCloseWindowWidget;
