import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { FullSize } from '@rapid/libs-web/styled';
import { combinationCName } from '@rapid/libs-web/common';

import RouterContext from './router';

import styles from './app.module.scss';

export default function App() {

  return (
    <FullSize
      className={combinationCName(styles.app)}
    >
      <ConfigProvider>
        <HashRouter>
          <RouterContext />
        </HashRouter>
      </ConfigProvider>
    </FullSize>
  )
}

