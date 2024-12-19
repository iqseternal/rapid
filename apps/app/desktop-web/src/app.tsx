import { ConfigProvider, App } from 'antd';
import { classnames } from '@rapid/libs-web/common';
import { commonStyles } from '@scss/common';
import { useEffect, useLayoutEffect } from 'react';

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

          },
          Card: {


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
          'w-full h-full max-w-9'
        )}
      >
        <RouterContext />
      </App>
    </ConfigProvider>
  )
}
