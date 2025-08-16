
import type { FC, HTMLAttributes } from 'react';
import { forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header';


export const NotFound = memo(forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {

  const { t } = useTranslation();

  return (
    <div ref={ref} {...props}>
      <Header />

      {t('ui.components.notfound.notfound', '页面未找到')}
    </div>
  );
}))

export default NotFound;
