import { ConfigProvider, App } from 'antd';
import { memo, useEffect, useLayoutEffect } from 'react';
import { RdSKin } from './skin';
import { Toaster } from 'react-hot-toast';
import { useAsyncEffect } from '@rapid/libs-web';

import RdRouterWrapper from './router';
import REmpty from '@/components/Empty';

/**
 * 在这里做根组件的渲染处理, 这里的 memo 有必要, 会避免一些不必要的重新渲染
 */
const RdApp = memo(() => {

  return (
    <ConfigProvider
      componentDisabled={false}
      componentSize='middle'
      csp={{

      }}
      direction='ltr'
      getPopupContainer={() => document.body}
      getTargetContainer={() => window}
      iconPrefixCls={'anticon'}
      // locale={{}}
      popupMatchSelectWidth={true}
      popupOverflow={'viewport'}
      prefixCls='ant'
      renderEmpty={() => <REmpty />}
      theme={{
        components: {
          Message: {

          },
          Card: {

          },
          Button: {

          }
        },
        cssVar: {
          prefix: 'rapid-app'
        }
      }}
      button={{
        style: {
          borderRadius: cssVars.buttonBorderRadius,
          backgroundColor: cssVars.buttonBackgroundColor,
          color: cssVars.buttonTextColor
        }
      }}
      card={{
        style: {

        }
      }}
      message={{

      }}
      variant='outlined'
    >
      <App
        className='w-full h-full'
        message={{
          maxCount: 5,
          getContainer: () => document.body
        }}
        notification={{
          maxCount: 5,
          getContainer: () => document.body,
          placement: 'bottomRight'
        }}
        style={{
          color: cssVars.primaryTextColor,
          backgroundColor: cssVars.thirdBackgroundColor
        }}
      >
        <RdRouterWrapper />
      </App>

      <Toaster
        position='bottom-right'
      />
    </ConfigProvider>
  )
})

export default RdApp;
