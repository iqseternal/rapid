
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export const NotHasAnyData = memo(() => {
  const { t } = useTranslation();

  return (
    <>
      {t('ui.components.nothasanydata.empty', '暂无数据')}
    </>
  )
})
