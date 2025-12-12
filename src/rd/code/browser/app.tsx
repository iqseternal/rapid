import { ConfigProvider, App } from 'antd';
import { memo, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { ClickToComponent } from 'click-to-react-component';

import useExtend from './extend';
import RdRouterWrapper from './router';
import REmpty from '@/components/Empty';

/**
 * 在这里做根组件的渲染处理, 这里的 memo 有必要, 会避免一些不必要的重新渲染
 */
export const RdApp = memo(() => {

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
      popupMatchSelectWidth={true}
      popupOverflow={'viewport'}
      prefixCls='ant'
      renderEmpty={() => <REmpty.NotHasAnyData />}
      theme={{
        components: {
          Message: {

          },
          Card: {

          },
          Button: {
            defaultActiveColor: cssVars.uiDefaultButtonTextColor,
            defaultActiveBg: cssVars.uiDefaultButtonBackground,
          }
        },
        cssVar: {
          prefix: 'rapid-app'
        }
      }}
      button={{
        style: {

        }
      }}
      dropdown={{
        style: {

        },
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
          maxCount: 1,
          getContainer: () => document.body
        }}
        notification={{
          maxCount: 5,
          getContainer: () => document.body,
          placement: 'bottomRight'
        }}
        style={{
          color: cssVars.colorNeutral900,
          backgroundColor: cssVars.colorNeutral50
        }}
      >
        <RdRouterWrapper />
      </App>

      <Toaster
        position='bottom-right'
      />

      {IS_DEV && (<ClickToComponent />)}
    </ConfigProvider>
  )
})

/**
 * App component, 这里做各种功能的插入：例如 插件等等
 */
export const RdAppWrapper = memo(() => {
  useExtend();

  return (<RdApp />)
})
