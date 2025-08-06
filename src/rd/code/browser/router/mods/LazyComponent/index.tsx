import { Skeleton } from 'antd';
import type { ReactNode } from 'react';
import { Suspense } from 'react';

export interface LazyComponentProps {
  readonly children: ReactNode;
}

/**
 * 路由懒加载过度态
 */
export const LazyComponent = (props: LazyComponentProps) => {
  const { children } = props;

  return (
    <Suspense
      fallback={(
        <Skeleton

        />
      )}
    >
      {children}
    </Suspense>
  )
}

export default LazyComponent;
