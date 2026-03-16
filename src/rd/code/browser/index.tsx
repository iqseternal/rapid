import 'reflect-metadata';
import './inject';
import './discrete';

import { StrictMode } from 'react';
import { RdAppWrapper } from './app';
import { registerAndReplaceExtensions, transformerExtensionsSourceToRdExtension } from './plats';
import { toNil, toNils, toWaitPromise } from '@suey/pkg-utils';
import { useGroupExtensionsApi } from './api';
import { injectReadonlyVariable } from '@rapid/libs';
import { setupInnerExtensions } from './plats/extensions';

import ReactDOM from 'react-dom/client';
import React from 'react';
import moment from 'moment';

import * as Antd from 'antd';
import * as spring from '@react-spring/web';
import * as transitionGroup from 'react-transition-group';
import * as ReactRouterDOM from 'react-router-dom';

import './i18n';
import '@/scss/index.scss';
import './tailwind.css';

/**
 * 创建子项目需要的环境变量值
 */
async function setupEnvironments() {
  injectReadonlyVariable(window, 'React', React);
  injectReadonlyVariable(window, 'ReactDOM', ReactDOM);
  injectReadonlyVariable(window, 'ReactRouterDOM', ReactRouterDOM);
  injectReadonlyVariable(window, 'moment', moment);
  injectReadonlyVariable(window, 'Antd', Antd);
  injectReadonlyVariable(window, 'spring', spring);
  injectReadonlyVariable(window, 'transitionGroup', transitionGroup);
}

/**
 * 加载插件
 */
async function setupExtensionPlats() {
  await setupInnerExtensions();

  // setTimeout(async () => {
  //
  //   // await setupInnerExtensions();
  //   type Transformer = Parameters<typeof native.metadata.defineMetadataInVector<'functional.theme.variables.transformer'>>[1];
  //   const transformer: Transformer = (cssVariablesPayloadSheet) => {
  //     cssVariablesPayloadSheet.uiCaptionBarBackground.value = '#00F';
  //     return cssVariablesPayloadSheet;
  //   }
  //   native.metadata.defineMetadataInVector('functional.theme.variables.transformer', transformer);
  // }, 1500);


  // return;
  // native.extension.registerExtension(diyExtension);

  const extensionGroupId = 42;
  const extensionGroupUuid = 'fb024456-2f71-4f79-99e9-c3f5b7e2553c';

  const [err, res] = await toNil(useGroupExtensionsApi({
    extension_group_id: extensionGroupId,
    extension_group_uuid: extensionGroupUuid
  }));

  if (err) return;
  await toWaitPromise({ waitTime: 1500 });

  const extensions = await transformerExtensionsSourceToRdExtension(res.data.data);


  await registerAndReplaceExtensions(extensions);
}


; ((async () => {
  const [environmentsErr] = await toNil(setupEnvironments());

  if (environmentsErr) {
    printer.printError(environmentsErr.reason);
    return;
  }

  await setupExtensionPlats();

  const rootContainer = document.getElementById('root');

  if (rootContainer) {
    ReactDOM.createRoot(rootContainer).render(
      <StrictMode>
        <RdAppWrapper />
      </StrictMode>
    );

    // ReactDOM.createRoot(rootContainer).render(
    //   <RdAppWrapper />
    // );
  }
})());
