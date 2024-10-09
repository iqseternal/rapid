
import { Outlet } from 'react-router-dom';
import { FullSize } from '@rapid/libs-web/styled';

import { Guards, GuardsContext } from '@router/guards';
import { useAuthHasAuthorized } from '@/features';
import { memo } from 'react';

/**
 * 根组件的布局, 让每一个页面都受控于 ReactRouter
 * 可以利用本组件为整个 App 添加动画等.
 */
const RootLayout = memo(() => {
  const hasAuthorizeState = useAuthHasAuthorized();

  return <GuardsContext.Authorized.Provider value={hasAuthorizeState}>
    <Outlet />
  </GuardsContext.Authorized.Provider>
})

export default RootLayout;
