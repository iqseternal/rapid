
import type { FC, HTMLAttributes } from 'react';
import { forwardRef } from 'react';

import Header from '@components/Header';

const NotFound = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>((props, ref) => {



  return <div ref={ref} {...props}>
    <Header />

    NotFound
  </div>;
})

export default NotFound;
