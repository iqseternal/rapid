
import { Outlet, useLocation } from 'react-router-dom';
import { FullSize } from '@rapid/libs-web/styled';
import { useAuthHasAuthorized } from '@/features';
import { memo } from 'react';

/**
 * 根组件的布局, 让每一个页面都受控于 ReactRouter
 * 可以利用本组件为整个 App 添加动画等.
 */
const RootLayout = memo(() => {
  return <Outlet />
})

export default RootLayout;
