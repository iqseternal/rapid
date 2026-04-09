import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Empty } from 'antd';

export const NotHasAnyData = memo(() => {
  const { t } = useTranslation();

  return (
    <Empty>
      {t('ui.components.nothasanydata.empty', '暂无数据')}
    </Empty>
  )
})
