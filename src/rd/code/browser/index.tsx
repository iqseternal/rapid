import './inject';
import './discrete';

import { StrictMode } from 'react';
import { RdAppWrapper } from './app';
import { registerAndReplaceExtensions, transformerExtensionsSourceToRdExtension } from './plats';
import { toNil, toNils } from '@suey/pkg-utils';
import { useGroupExtensionsApi } from './api';
import { RdThemeExtension } from './plats/extensions';

import ReactDOM from 'react-dom/client';
import React from 'react';

import '@/scss/index.scss';
import './tailwind.css';

async function setupThreadTask() {
  const startHeartbeat = () => rApp.threads.rxcThread.send('rxc-thread-start-extension-heartbeat', void 0);

  const stopHeartbeat = () => rApp.threads.rxcThread.send('rxc-thread-terminate-extension-heartbeat', void 0);

  window.addEventListener('online', startHeartbeat);

  window.addEventListener('offline', stopHeartbeat);
}

async function setupEnvironments() {
  window.React = React;
}

async function setupExtensionPlats() {
  rApp.extension.registerExtension(RdThemeExtension);

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
  await setupThreadTask();
  await setupEnvironments();
  await setupExtensionPlats();

  const rootContainer = document.getElementById('root');

  if (rootContainer) {
    ReactDOM.createRoot(rootContainer).render(
      <StrictMode>
        <RdAppWrapper />
      </StrictMode>
    );
  }
})());


