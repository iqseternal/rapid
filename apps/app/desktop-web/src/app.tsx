import { ConfigProvider, App } from 'antd';
import { classnames } from '@rapid/libs-web/common';
import { commonStyles } from '@scss/common';
import { useEffect, useLayoutEffect } from 'react';
import { makeCssVar } from './themes';
import { useAsyncEffect } from '@rapid/libs-web';
import { toNil } from '@rapid/libs';

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
      getPopupContainer={(triggerNode) => document.body}
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
          color: makeCssVar(vars => vars.primaryTextColor),
          backgroundColor: makeCssVar(vars => vars.thirdBackgroundColor)
        }}
      >
        <RouterContext />
      </App>
    </ConfigProvider>
  )
}
