import { ConfigProvider, App } from 'antd';
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Toaster } from 'react-hot-toast';
import { ClickToComponent } from 'click-to-react-component';

import { debounce } from 'lodash';

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
            defaultActiveColor: '#616161',
            defaultActiveBg: '#fafafa',
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
          color: '#212121',
          backgroundColor: '#fafafa'
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
  const isFirstRendered = useRef(true);
  const noticeReactAppFirstRendered = useMemo(
    () => debounce(
      () => {
        if (!isFirstRendered.current) return;

        native.emitter.emit('react-app-first-rendered');
        isFirstRendered.current = false;
      },
      20,
      {
        maxWait: 1000
      }
    ),
    []
  );

  useEffect(noticeReactAppFirstRendered, []);

  useExtend();

  return (<RdApp />)
})
