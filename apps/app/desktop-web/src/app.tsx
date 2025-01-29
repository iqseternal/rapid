import { ConfigProvider, App } from 'antd';
import { memo, useEffect, useLayoutEffect } from 'react';

import { useAsyncLayoutEffect, useNormalState, useUnmount } from '@rapid/libs-web';
import { RdSKin } from './skin';

import RouterContext from './router';

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
        style={{
          color: cssVars.primaryTextColor,
          backgroundColor: cssVars.thirdBackgroundColor
        }}
      >
        <RouterContext />
      </App>
    </ConfigProvider>
  )
})


/**
 * App component, 这里做各种功能的插入：例如 插件等等
 */
const RapidApp = memo(() => {
  rApp.extension.useExtensions();

  const themePayloadTransformers = rApp.metadata.useMetadata('functional.theme.variables.transform');
  useLayoutEffect(() => {
    if (!themePayloadTransformers) {
      return () => {

      };
    }

    let declaration = RdSKin.toCssVariablesDeclaration() as unknown as RdSKin.CssVariablesPayloadSheet;
    themePayloadTransformers.forEach(transform => {
      declaration = transform(declaration);
    })

    printer.printInfo('最终加载的颜色为： ', declaration, declaration.captionBarBackgroundColor);
    RdSKin.install(declaration as unknown as RdSKin.CssVariablesDeclaration);

    return () => {
      RdSKin.uninstall();
    }
  }, [themePayloadTransformers]);


  return (<RapidAppContext />)
})

export default RapidApp;
