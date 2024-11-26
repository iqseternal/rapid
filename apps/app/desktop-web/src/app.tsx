import { ConfigProvider, App } from 'antd';
import { classnames } from '@rapid/libs-web/common';
import { commonStyles } from '@scss/common';
import { useEffect } from 'react';

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
        <RouterContext />
      </App>
    </ConfigProvider>
  )
}
