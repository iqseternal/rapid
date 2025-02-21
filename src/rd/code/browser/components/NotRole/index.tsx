import type { FC, HTMLAttributes } from 'react';
import { forwardRef, memo } from 'react';

import Header from '@/components/Header';


const NotRole = memo(forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {
  return (
    <div ref={ref} {...props}>
      <Header />

      NotRole
    </div>
  );
}))

export default NotRole;
