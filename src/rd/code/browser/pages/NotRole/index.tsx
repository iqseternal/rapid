import type { FC, HTMLAttributes } from 'react';
import { forwardRef, memo } from 'react';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header';

const NotRole = memo(forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  const { t } = useTranslation();

  return (
    <div ref={ref} {...props}>
      <Header />

      {t('ui.components.notrole.notrole', '没有权限')}
    </div>
  );
}))

export default NotRole;
