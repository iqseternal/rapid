import 'reflect-metadata';
import './inject';
import './discrete';

import { StrictMode } from 'react';
import { RdAppWrapper } from './app';
import { registerAndReplaceExtensions, transformerExtensionsSourceToRdExtension } from './plats';
import { toNil, toNils } from '@suey/pkg-utils';
import { useGroupExtensionsApi } from './api';
import { injectReadonlyVariable } from '@rapid/libs';
import { RdThemeExtension } from './plats/extensions';

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

// import diyExtension from 'rd/../../cli/rxc/template/src/index';

/**
 * 创建线程任务
 */
async function setupThreadTask() {
  const startHeartbeat = () => rApp.threads.rxcThread.send('rxc-thread-start-extension-heartbeat', void 0);

  const stopHeartbeat = () => rApp.threads.rxcThread.send('rxc-thread-terminate-extension-heartbeat', void 0);

  window.addEventListener('online', startHeartbeat);

  window.addEventListener('offline', stopHeartbeat);
}

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
  rApp.extension.registerExtension(RdThemeExtension);
  // rApp.extension.registerExtension(diyExtension);

  const extensionGroupId = 42;
  const extensionGroupUuid = 'fb024456-2f71-4f79-99e9-c3f5b7e2553c';

  const [err, res] = await toNil(useGroupExtensionsApi({
    extension_group_id: extensionGroupId,
    extension_group_uuid: extensionGroupUuid
  }));

  if (err) return;

  const extensions = await transformerExtensionsSourceToRdExtension(res.data.data);

  registerAndReplaceExtensions(extensions);

  rApp.threads.rxcThread.send('rxc-thread-start-extension-heartbeat', void 0);
}

((async () => {
  await toNils(
    setupThreadTask(),
    setupEnvironments(),
    setupExtensionPlats()
  );

  const rootContainer = document.getElementById('root');

  if (rootContainer) {
    ReactDOM.createRoot(rootContainer).render(
      <StrictMode>
        <RdAppWrapper />
      </StrictMode>
    );
  }
})());
