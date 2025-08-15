import { memo } from 'react';

export interface RouterErrorBoundaryProps {

}

/**
 * Router 加载错误
 */
export const RouterErrorBoundary = memo<RouterErrorBoundaryProps>(() => {


  return (
    <div>
      <div>正在加载组件 ....</div>
      <div>当然, 你可能在出错的时候才有可能看到此页面....</div>
    </div>
  )
})

export default RouterErrorBoundary;
