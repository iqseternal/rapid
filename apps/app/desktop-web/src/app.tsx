import { ConfigProvider, App } from 'antd';
import { classnames } from '@rapid/libs-web/common';
import { commonStyles } from '@scss/common';
import { useEffect, useLayoutEffect } from 'react';
import { makeVar, themeCssVarsSheet } from './themes';

import RouterContext from './router';

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
    >
      <App
        className='w-full h-full'
        style={{
          color: makeVar(themeCssVarsSheet.primaryTextColor),
          backgroundColor: makeVar(themeCssVarsSheet.thirdBackgroundColor)
        }}
      >
        <RouterContext />
      </App>
    </ConfigProvider>
  )
}
