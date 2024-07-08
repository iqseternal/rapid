import { Route, BrowserRouter, HashRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { FullSize } from '@/styled';
import { makeVar, themeCssVarsSheet } from '@/themes';
import { useAsyncEffect } from '@rapid/libs/hooks';
import { app, themePlugins } from '@/plugins';
import { combinationCName } from '@rapid/libs/common';

import RouterContext from './router';
import store from '@/features';

import commonStyles from '@scss/common/index.module.scss';
import styles from './app.module.scss';

export default function App() {

  useAsyncEffect(async () => {

  }, []);

  return (
    <FullSize
      className={combinationCName(styles.app, commonStyles.overflowHidden)}
    >
      <ConfigProvider>
        <Provider store={store}>
          <HashRouter>
            <RouterContext />
          </HashRouter>
        </Provider>
      </ConfigProvider>
    </FullSize>
  )
}

