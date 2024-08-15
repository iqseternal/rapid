import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useState } from 'react';
import { FullSize } from '@rapid/libs-web';
import { combinationCName } from '@rapid/libs-web/common';
import ReactDOM from 'react-dom/client';

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

