import { ConfigProvider, App } from 'antd';
import { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { ClickToComponent } from 'click-to-react-component';

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
          borderRadius: cssVars.uiDefaultButtonRadius,
          backgroundColor: cssVars.uiDefaultButtonBackground,
          color: cssVars.uiDefaultButtonTextColor
        }
      }}
      dropdown={{
        style: {
          background: cssVars.uiAutoMenuBackground,
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
          maxCount: 5,
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
    </ConfigProvider>
  )
})


/**
 * App component, 这里做各种功能的插入：例如 插件等等
 */
export const RdAppWrapper = memo(() => {
  const [extensionList] = rApp.extension.useExtensionsList();
  useLayoutEffect(() => {
    const context: Rapid.Extend.ExtensionContext = {}

    extensionList.forEach(extension => {
      rApp.extension.activatedExtension(extension.name);
    })
  }, [extensionList]);


  const themePayloadTransformers = rApp.metadata.useMetadata('functional.theme.variables.transformer');
  useLayoutEffect(() => {
    if (!themePayloadTransformers) return;

    let declaration = rApp.skin.skin.toCssVariablesDeclaration();
    themePayloadTransformers.forEach(transform => {
      declaration = transform(declaration);
    })

    rApp.skin.skin.install();

    return () => {

      rApp.skin.skin.uninstall();
    }
  }, [themePayloadTransformers]);

  return (
    <>
      {IS_DEV && (
        <ClickToComponent />
      )}
      <RdApp />
    </>
  )
})
