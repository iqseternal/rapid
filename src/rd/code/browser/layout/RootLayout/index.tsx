
import { Outlet, useLocation } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { UnlockTwoTone, UserAddOutlined } from '@ant-design/icons';

import Widget from '../../components/Widget';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

const I18nChangeLanguageWidget = memo(() => {
  const { t } = useTranslation();

  return (
    <Widget
      tipText={t('login.language', '切换语言包')}
      icon={'ApiOutlined'}
      onClick={() => {
        const lang = i18n.language;

        if (lang === 'eb') {
          i18n.changeLanguage('zh');
        }
        else {
          i18n.changeLanguage('en');
        }
      }}
    />
  )
})

/**
 * 根组件的布局, 让每一个页面都受控于 ReactRouter
 * 可以利用本组件为整个 App 添加动画等.
 */
const RootLayout = memo(() => {

  useEffect(() => {

    rApp.metadata.defineMetadataInVector('ui.layout.header.controller.widgets.others', I18nChangeLanguageWidget);

    return () => {

      rApp.metadata.delMetadataInVector('ui.layout.header.controller.widgets.others', I18nChangeLanguageWidget);
    }
  }, []);

  return (
    <Outlet />
  )
})

export default RootLayout;
