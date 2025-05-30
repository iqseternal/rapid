import { ConfigProvider, App } from 'antd';
import { memo, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RdSKin } from './skin';
import type { RExtensionContext } from './declare';
import { StrictMode } from 'react';
import { toNil } from '@suey/pkg-utils';
import { useExtensionsApi, type UseExtensionHeartbeatVoucher } from './api/extension';
import type { Extension } from '@suey/rxp-meta';

import React from 'react';
import RdRouterWrapper from './router';
import RdThemeExtension from './plats/extensions/RdThemeExtension';
import ReactDOM from 'react-dom/client';
import REmpty from '@/components/Empty';

import '@/scss/index.scss';
import './tailwind.css';

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


/**
 * App component, 这里做各种功能的插入：例如 插件等等
 */
export const RdAppWrapper = memo(() => {
  const [extensionList] = rApp.extension.useExtensionsList();
  useLayoutEffect(() => {
    const context: RExtensionContext = {}

    extensionList.forEach(extension => {
      rApp.extension.activatedExtension(extension.name, context);
    })
  }, [extensionList]);


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

  return (<RdApp />)
})

export class Application {

  public async registerLocalExtensions() {



  }

  public async registerInnerExtensions() {

    rApp.extension.registerExtension(RdThemeExtension);

  }

  public async registerOnlineExtensions() {
    const extensionGroupId = 42;
    const extensionGroupUuid = 'fb024456-2f71-4f79-99e9-c3f5b7e2553c';

    window.React = React;

    const [err, res] = await toNil(useExtensionsApi({
      extension_group_id: extensionGroupId,
      extension_group_uuid: extensionGroupUuid
    }));

    if (err) return;

    if (res) {
      const extensions = res.data.data;

      extensions.forEach(extensionStruct => {
        const extensionId = extensionStruct.extension_id;
        const extensionName = extensionStruct.extension_name;
        const extensionUuid = extensionStruct.extension_uuid;

        const scriptContent = extensionStruct.script_content;
        const scriptHash = extensionStruct.script_hash;

        try {
          eval(scriptContent);

          if (window.__define_extension__) {
            const extension = window.__define_extension__() as Extension;

            rApp.extension.registerExtension(extension);
            rApp.extension.activatedExtension(extension.name, {});
          }
        } catch (e) {

          console.error(e);
          return;
        }
        // console.log(scriptContent, scriptHash);
      })

      const vouchers: UseExtensionHeartbeatVoucher[] = extensions.map((extension) => {

        return {
          extension_id: extension.extension_id,
          extension_uuid: extension.extension_uuid,
          script_hash: extension.script_hash
        }
      });

      rApp.threads.rxcThread.send('rxc-thread-sync-extensions-info', vouchers);
      rApp.threads.rxcThread.send('rxc-thread-start-extension-heartbeat', void 0);
    }
  }

  public renderReactApp() {
    const rootContainer = document.getElementById('root');

    if (rootContainer) {
      ReactDOM.createRoot(rootContainer).render(
        <StrictMode>
          <RdAppWrapper />
        </StrictMode>
      );
    }
  }
}
