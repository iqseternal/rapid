import { HashRouter } from 'react-router-dom';
import { ConfigProvider, App, message } from 'antd';
import type { ProfilerOnRenderCallback } from 'react';
import { useState, Profiler, useCallback, useEffect } from 'react';
import { FullSize } from '@rapid/libs-web';
import { classnames } from '@rapid/libs-web/common';
import { commonStyles } from '@scss/common';
import { themeCssVarsSheet, makeVar } from './themes';

import ReactDOM from 'react-dom/client';
import RouterContext from './router';
import styles from './app.module.scss';

/**
 * App component
 */
export default function RapidApp() {

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
          Message: {

          }
        },
        cssVar: {
          prefix: 'rapid-app'
        }
      }}
      message={{

      }}
      variant='outlined'
      // virtual
      // warning={{
      //   strict: false
      // }}
    >
      <App
        className={classnames(
          styles.app,
          commonStyles.fullSize
        )}
      >
        <HashRouter>

          <RouterContext />
        </HashRouter>
      </App>
    </ConfigProvider>
  )
}
