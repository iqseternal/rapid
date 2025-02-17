import { ConfigProvider, App } from 'antd';
import { memo, useLayoutEffect } from 'react';
import { RdSKin } from './skin';
import { Toaster } from 'react-hot-toast';

import RouterContext from './router';
import REmpty from '@components/Empty';

/**
 * 在这里做根组件的渲染处理, 这里的 memo 有必要, 会避免一些不必要的重新渲染
 */
const RapidAppContext = memo(() => {

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
        <RouterContext />
      </App>

      <Toaster
        position='bottom-right'
      />
    </ConfigProvider>
  )
})


/**
 * App component, 这里做各种功能的插入：例如 插件等等
 */
const RapidApp = memo(() => {
  rApp.extension.useExtensions();

  const themePayloadTransformers = rApp.metadata.useMetadata('functional.theme.variables.transformer');

  useLayoutEffect(() => {
    if (!themePayloadTransformers) return;

    let declaration = RdSKin.toCssVariablesDeclaration();
    themePayloadTransformers.forEach(transform => {
      declaration = transform(declaration);
    })

    RdSKin.install(declaration);

    return () => {
      RdSKin.uninstall();
    }
  }, [themePayloadTransformers]);


  return (<RapidAppContext />)
})

export default RapidApp;
