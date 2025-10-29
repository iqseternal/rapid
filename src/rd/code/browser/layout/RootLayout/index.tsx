import { Outlet } from 'react-router-dom';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import Widget from '../../components/Widget';
import i18n from '../../i18n';

const I18nChangeLanguageWidget = memo(() => {
  const { t } = useTranslation();

  return (
    <Widget
      tipText={t('test.widgets.i18n.changelanguage', '切换语言包')}
      icon={'ApiOutlined'}
      onClick={async () => {
        const lang = i18n.language;

        if (lang === 'en') {
          await i18n.changeLanguage('zh');
        }
        else {
          await i18n.changeLanguage('en');
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

  rApp.metadata.useFollowMetadataInVector('ui.layout.header.controller.widgets.others', I18nChangeLanguageWidget);

  return (
    <Outlet />
  )
})

export default RootLayout;
