import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { useState } from 'react';
import { FullSize } from '@rapid/libs-web';
import { classnames } from '@rapid/libs-web/common';
import { commonStyles } from '@scss/common';
import { themeCssVarsSheet, makeVar } from './themes';

import ReactDOM from 'react-dom/client';
import RouterContext from './router';
import styles from './app.module.scss';

export default function App() {

  return (
    <ConfigProvider
      componentDisabled={false}
      componentSize='middle'
      csp={{

      }}
      direction='ltr'
      getPopupContainer={(triggerNode) => {
        if (triggerNode && triggerNode.parentNode && triggerNode.parentNode instanceof HTMLElement) return triggerNode.parentNode;

        return document.body;
      }}
      getTargetContainer={() => window}
      iconPrefixCls={'anticon'}
      // locale={{}}
      popupMatchSelectWidth={true}
      popupOverflow={'viewport'}
      prefixCls='ant'
      // renderEmpty={() => <></>}
      theme={{
        components: {

        }
      }}
      variant='outlined'
      // virtual
      // warning={{
      //   strict: false
      // }}
    >
      <FullSize
        className={classnames(
          styles.app
        )}
      >

        <HashRouter>
          <RouterContext />
        </HashRouter>

      </FullSize>
    </ConfigProvider>
  )
}
