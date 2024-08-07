import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import { FullSize } from '@rapid/libs-web/styled';
import { combinationCName } from '@rapid/libs-web/common';

import RouterContext from './router';
import store from './features';

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

