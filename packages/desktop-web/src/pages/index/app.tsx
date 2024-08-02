import { Route, BrowserRouter, HashRouter, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { FullSize } from '@rapid/libs-web/styled';
import { useAsyncEffect } from '@rapid/libs-web/hooks';
import { combinationCName } from '@rapid/libs-web/common';
import { toPicket } from '@rapid/libs/common';

import RouterContext from './router';
import store from '@/features';

import commonStyles from '@scss/common/index.module.scss';
import styles from './app.module.scss';

export default function App() {

  return (
    <FullSize
      className={combinationCName(styles.app)}
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

