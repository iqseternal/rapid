import { Outlet } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Widget from '../../components/Widget';
import i18n from '../../i18n';

/**
 * 根组件的布局, 让每一个页面都受控于 ReactRouter
 * 可以利用本组件为整个 App 添加动画等.
 */
const RootLayout = memo(() => {

  return (
    <Outlet />
  )
})

const RootLayoutWrapper = memo(() => (
  <RootLayout />
))

export default RootLayoutWrapper;
