
import type { FC, HTMLAttributes } from 'react';
import { forwardRef, memo } from 'react';

import Header from '@/components/Header';

export const NotFound = memo(forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {



  return <div ref={ref} {...props}>
    <Header />

    NotFound
  </div>;
}))

export default NotFound;
